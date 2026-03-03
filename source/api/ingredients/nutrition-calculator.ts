/**
 * Recipe nutrition calculator
 * Computes total nutrition, per-portion values, and Nutri-Score
 * Pure functions, synchronous — designed for useMemo
 */

import type {
  IngredientQuantities,
  NutritionPer100g,
  NutriScoreGrade,
  RecipeNutrition,
  IngredientNutritionBreakdown,
} from "./types";

/** Minimal ingredient shape needed for nutrition calculation */
interface IngredientLike {
  id: string;
  name: string;
}
import { getNutritionForIngredient } from "./nutrition-database";

/**
 * Calculate full recipe nutrition from selected ingredients and quantities
 *
 * @param ingredientIds - Array of selected ingredient IDs
 * @param quantities - Map of ingredient ID to quantity in grams
 * @param portions - Number of portions the recipe makes
 * @param allIngredients - Full ingredient list (for name lookup)
 * @returns RecipeNutrition or null if no quantified ingredients
 */
export function calculateRecipeNutrition(
  ingredientIds: string[],
  quantities: IngredientQuantities,
  portions: number,
  allIngredients: IngredientLike[]
): RecipeNutrition | null {
  // Only calculate for ingredients that have a quantity > 0
  const quantifiedIds = ingredientIds.filter(
    (id) => (quantities[id] ?? 0) > 0
  );

  if (quantifiedIds.length === 0) return null;

  const safePortion = Math.max(1, portions);

  // Accumulate totals
  const total: NutritionPer100g = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    saturatedFats: 0,
    sugars: 0,
    sodium: 0,
  };

  const breakdown: IngredientNutritionBreakdown[] = [];
  let totalWeight = 0;

  const ingredientMap = new Map(allIngredients.map((i) => [i.id, i]));

  for (const id of quantifiedIds) {
    const grams = quantities[id]!;
    const nutrition = getNutritionForIngredient(id);
    const factor = grams / 100;

    const cal = nutrition.calories * factor;
    const pro = nutrition.proteins * factor;
    const carb = nutrition.carbs * factor;
    const fat = nutrition.fats * factor;

    total.calories += cal;
    total.proteins += pro;
    total.carbs += carb;
    total.fats += fat;
    total.fiber += nutrition.fiber * factor;
    total.saturatedFats += nutrition.saturatedFats * factor;
    total.sugars += nutrition.sugars * factor;
    total.sodium += nutrition.sodium * factor;
    totalWeight += grams;

    const ingredient = ingredientMap.get(id);
    breakdown.push({
      ingredientId: id,
      ingredientName: ingredient?.name ?? id,
      quantityGrams: grams,
      calories: round(cal),
      proteins: round(pro),
      carbs: round(carb),
      fats: round(fat),
    });
  }

  // Round totals
  const roundedTotal = roundNutrition(total);

  // Per portion
  const perPortion = roundNutrition({
    calories: total.calories / safePortion,
    proteins: total.proteins / safePortion,
    carbs: total.carbs / safePortion,
    fats: total.fats / safePortion,
    fiber: total.fiber / safePortion,
    saturatedFats: total.saturatedFats / safePortion,
    sugars: total.sugars / safePortion,
    sodium: total.sodium / safePortion,
  });

  const { grade, points } = calculateNutriScore(roundedTotal, totalWeight);

  return {
    total: roundedTotal,
    perPortion,
    totalWeight: round(totalWeight),
    portionWeight: round(totalWeight / safePortion),
    portions: safePortion,
    nutriScore: grade,
    nutriScorePoints: points,
    ingredientBreakdown: breakdown,
  };
}

/**
 * Simplified Nutri-Score calculation (EU 2023 algorithm)
 *
 * Negative points (0-10 each): energy, sugars, saturated fats, sodium
 * Positive points (0-5 each): fiber, proteins
 * Final score = negative - positive
 *
 * Grades: A (<=0), B (1-2), C (3-10), D (11-18), E (>=19)
 */
export function calculateNutriScore(
  nutrition: NutritionPer100g,
  totalWeightGrams: number
): { grade: NutriScoreGrade; points: number } {
  if (totalWeightGrams <= 0) return { grade: "C", points: 5 };

  // Normalize to per-100g values for scoring
  const per100g: NutritionPer100g = {
    calories: (nutrition.calories / totalWeightGrams) * 100,
    proteins: (nutrition.proteins / totalWeightGrams) * 100,
    carbs: (nutrition.carbs / totalWeightGrams) * 100,
    fats: (nutrition.fats / totalWeightGrams) * 100,
    fiber: (nutrition.fiber / totalWeightGrams) * 100,
    saturatedFats: (nutrition.saturatedFats / totalWeightGrams) * 100,
    sugars: (nutrition.sugars / totalWeightGrams) * 100,
    sodium: (nutrition.sodium / totalWeightGrams) * 100,
  };

  // Negative points
  const energyPoints = scoreEnergy(per100g.calories);
  const sugarsPoints = scoreSugars(per100g.sugars);
  const saturatedFatsPoints = scoreSaturatedFats(per100g.saturatedFats);
  const sodiumPoints = scoreSodium(per100g.sodium);
  const negativePoints =
    energyPoints + sugarsPoints + saturatedFatsPoints + sodiumPoints;

  // Positive points
  const fiberPoints = scoreFiber(per100g.fiber);
  const proteinsPoints = scoreProteins(per100g.proteins);
  const positivePoints = fiberPoints + proteinsPoints;

  const finalScore = negativePoints - positivePoints;

  return { grade: scoreToGrade(finalScore), points: finalScore };
}

// --- Scoring thresholds (simplified EU 2023) ---

function scoreEnergy(kcal: number): number {
  if (kcal <= 80) return 0;
  if (kcal <= 160) return 1;
  if (kcal <= 240) return 2;
  if (kcal <= 320) return 3;
  if (kcal <= 400) return 4;
  if (kcal <= 480) return 5;
  if (kcal <= 560) return 6;
  if (kcal <= 640) return 7;
  if (kcal <= 720) return 8;
  if (kcal <= 800) return 9;
  return 10;
}

function scoreSugars(g: number): number {
  if (g <= 4.5) return 0;
  if (g <= 9) return 1;
  if (g <= 13.5) return 2;
  if (g <= 18) return 3;
  if (g <= 22.5) return 4;
  if (g <= 27) return 5;
  if (g <= 31) return 6;
  if (g <= 36) return 7;
  if (g <= 40) return 8;
  if (g <= 45) return 9;
  return 10;
}

function scoreSaturatedFats(g: number): number {
  if (g <= 1) return 0;
  if (g <= 2) return 1;
  if (g <= 3) return 2;
  if (g <= 4) return 3;
  if (g <= 5) return 4;
  if (g <= 6) return 5;
  if (g <= 7) return 6;
  if (g <= 8) return 7;
  if (g <= 9) return 8;
  if (g <= 10) return 9;
  return 10;
}

function scoreSodium(mg: number): number {
  if (mg <= 90) return 0;
  if (mg <= 180) return 1;
  if (mg <= 270) return 2;
  if (mg <= 360) return 3;
  if (mg <= 450) return 4;
  if (mg <= 540) return 5;
  if (mg <= 630) return 6;
  if (mg <= 720) return 7;
  if (mg <= 810) return 8;
  if (mg <= 900) return 9;
  return 10;
}

function scoreFiber(g: number): number {
  if (g <= 0.9) return 0;
  if (g <= 1.9) return 1;
  if (g <= 2.8) return 2;
  if (g <= 3.7) return 3;
  if (g <= 4.7) return 4;
  return 5;
}

function scoreProteins(g: number): number {
  if (g <= 1.6) return 0;
  if (g <= 3.2) return 1;
  if (g <= 4.8) return 2;
  if (g <= 6.4) return 3;
  if (g <= 8.0) return 4;
  return 5;
}

function scoreToGrade(score: number): NutriScoreGrade {
  if (score <= 0) return "A";
  if (score <= 2) return "B";
  if (score <= 10) return "C";
  if (score <= 18) return "D";
  return "E";
}

// --- Helpers ---

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

function roundNutrition(n: NutritionPer100g): NutritionPer100g {
  return {
    calories: round(n.calories),
    proteins: round(n.proteins),
    carbs: round(n.carbs),
    fats: round(n.fats),
    fiber: round(n.fiber),
    saturatedFats: round(n.saturatedFats),
    sugars: round(n.sugars),
    sodium: round(n.sodium),
  };
}
