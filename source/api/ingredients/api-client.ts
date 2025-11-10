/**
 * API client for TheMealDB
 * Handles fetching ingredients from external API
 */

import { ingredientApiBaseUrl, ingredientImageBaseUrl } from "@/env";
import { translateIngredient } from "@/utils/translation-ingredients";
import { getIngredientIcon, categorizeIngredient } from "./categorization";
import type { Ingredient, MealDBResponse, AllergenId } from "./types";

/**
 * Simple allergen detection for API ingredients
 * Uses pattern matching on ingredient names
 */
function detectAllergens(ingredientName: string): AllergenId[] {
  const name = ingredientName.toLowerCase();
  const allergens: AllergenId[] = [];

  // Quick pattern matching for common allergens
  if (/(wheat|flour|bread|pasta|gluten|cereal|rye|barley|oat)/i.test(name)) {
    allergens.push("gluten");
  }
  if (/(crab|lobster|shrimp|prawn|crayfish|crustacean)/i.test(name)) {
    allergens.push("crustaceans");
  }
  if (/(egg|mayonnaise)/i.test(name)) {
    allergens.push("eggs");
  }
  if (/(fish|salmon|tuna|cod)/i.test(name)) {
    allergens.push("fish");
  }
  if (/(peanut|groundnut)/i.test(name)) {
    allergens.push("peanuts");
  }
  if (/(soy|tofu|tempeh)/i.test(name)) {
    allergens.push("soy");
  }
  if (/(milk|cheese|butter|cream|yogurt|dairy|lactose)/i.test(name)) {
    allergens.push("milk");
  }
  if (/(almond|hazelnut|walnut|cashew|pecan|pistachio)/i.test(name)) {
    allergens.push("nuts");
  }
  if (/(celery)/i.test(name)) {
    allergens.push("celery");
  }
  if (/(mustard)/i.test(name)) {
    allergens.push("mustard");
  }
  if (/(sesame|tahini)/i.test(name)) {
    allergens.push("sesame");
  }
  if (/(sulfite|wine|vinegar)/i.test(name)) {
    allergens.push("sulfites");
  }
  if (/(lupin)/i.test(name)) {
    allergens.push("lupin");
  }
  if (/(mussel|oyster|clam|scallop|squid|octopus|mollusc)/i.test(name)) {
    allergens.push("molluscs");
  }

  return allergens;
}

/**
 * Fetch ingredients from TheMealDB API
 * Free tier: unlimited requests
 */
export async function fetchFromTheMealDB(): Promise<Ingredient[]> {
  try {
    const response = await fetch(ingredientApiBaseUrl);
    const data: MealDBResponse = await response.json();

    if (!data.meals) {
      throw new Error("Invalid response from TheMealDB");
    }

    // Transform TheMealDB data to our normalized structure
    return data.meals.map((meal, index) => {
      // Encode ingredient name for URL (handle spaces and special characters)
      const encodedName = meal.strIngredient
        ? encodeURIComponent(meal.strIngredient.trim())
        : null;

      return {
        id: `mealdb_${meal.idIngredient || index}`,
        name: translateIngredient(meal.strIngredient),
        nameEn: meal.strIngredient,
        icon: getIngredientIcon(meal.strIngredient),
        category: categorizeIngredient(meal.strIngredient),
        description: meal.strDescription || "",
        thumbnail: encodedName
          ? `${ingredientImageBaseUrl}/${encodedName}.png`
          : null,
        allergens: detectAllergens(meal.strIngredient),
      };
    });
  } catch (error) {
    console.error("Error fetching from TheMealDB:", error);
    return [];
  }
}
