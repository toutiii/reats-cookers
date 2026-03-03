/**
 * Local nutrition database
 * Values per 100g based on CIQUAL/USDA reference data
 * Same architecture as allergen-detector.ts: const database, pure functions, synchronous
 */

import type { NutritionPer100g } from "./types";

/** Default fallback nutrition for unknown ingredients */
export const DEFAULT_NUTRITION: NutritionPer100g = {
  calories: 50,
  proteins: 2,
  carbs: 5,
  fats: 2,
  fiber: 1,
  saturatedFats: 0.5,
  sugars: 1,
  sodium: 10,
};

/**
 * Nutrition values per 100g for local ingredients
 * Sources: CIQUAL (French food composition table) / USDA FoodData Central
 */
export const NUTRITION_DATABASE: Record<string, NutritionPer100g> = {
  // Basic seasonings
  salt: {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    saturatedFats: 0,
    sugars: 0,
    sodium: 38758,
  },
  pepper: {
    calories: 251,
    proteins: 10.4,
    carbs: 44.0,
    fats: 3.3,
    fiber: 25.3,
    saturatedFats: 1.4,
    sugars: 0.6,
    sodium: 20,
  },
  oil: {
    calories: 884,
    proteins: 0,
    carbs: 0,
    fats: 100,
    fiber: 0,
    saturatedFats: 14,
    sugars: 0,
    sodium: 0,
  },
  garlic: {
    calories: 149,
    proteins: 6.4,
    carbs: 33.1,
    fats: 0.5,
    fiber: 2.1,
    saturatedFats: 0.1,
    sugars: 1.0,
    sodium: 17,
  },
  onion: {
    calories: 40,
    proteins: 1.1,
    carbs: 9.3,
    fats: 0.1,
    fiber: 1.7,
    saturatedFats: 0,
    sugars: 4.2,
    sodium: 4,
  },
  herbs: {
    calories: 35,
    proteins: 2.5,
    carbs: 4.5,
    fats: 0.7,
    fiber: 2.0,
    saturatedFats: 0.1,
    sugars: 0.5,
    sodium: 5,
  },

  // Proteins
  chicken: {
    calories: 165,
    proteins: 31.0,
    carbs: 0,
    fats: 3.6,
    fiber: 0,
    saturatedFats: 1.0,
    sugars: 0,
    sodium: 74,
  },
  beef: {
    calories: 250,
    proteins: 26.0,
    carbs: 0,
    fats: 15.0,
    fiber: 0,
    saturatedFats: 5.9,
    sugars: 0,
    sodium: 72,
  },
  fish: {
    calories: 206,
    proteins: 22.0,
    carbs: 0,
    fats: 12.0,
    fiber: 0,
    saturatedFats: 2.5,
    sugars: 0,
    sodium: 59,
  },
  egg: {
    calories: 155,
    proteins: 13.0,
    carbs: 1.1,
    fats: 11.0,
    fiber: 0,
    saturatedFats: 3.3,
    sugars: 1.1,
    sodium: 124,
  },
  shrimp: {
    calories: 99,
    proteins: 24.0,
    carbs: 0.2,
    fats: 0.3,
    fiber: 0,
    saturatedFats: 0.1,
    sugars: 0,
    sodium: 111,
  },
  tofu: {
    calories: 76,
    proteins: 8.0,
    carbs: 1.9,
    fats: 4.8,
    fiber: 0.3,
    saturatedFats: 0.7,
    sugars: 0.6,
    sodium: 7,
  },

  // Dairy
  milk: {
    calories: 42,
    proteins: 3.4,
    carbs: 5.0,
    fats: 1.0,
    fiber: 0,
    saturatedFats: 0.6,
    sugars: 5.0,
    sodium: 44,
  },
  cheese: {
    calories: 402,
    proteins: 25.0,
    carbs: 1.3,
    fats: 33.0,
    fiber: 0,
    saturatedFats: 21.1,
    sugars: 0.5,
    sodium: 621,
  },
  butter: {
    calories: 717,
    proteins: 0.9,
    carbs: 0.1,
    fats: 81.0,
    fiber: 0,
    saturatedFats: 51.4,
    sugars: 0.1,
    sodium: 11,
  },
  cream: {
    calories: 292,
    proteins: 2.1,
    carbs: 2.8,
    fats: 30.0,
    fiber: 0,
    saturatedFats: 18.9,
    sugars: 2.8,
    sodium: 34,
  },

  // Vegetables
  tomato: {
    calories: 18,
    proteins: 0.9,
    carbs: 3.9,
    fats: 0.2,
    fiber: 1.2,
    saturatedFats: 0,
    sugars: 2.6,
    sodium: 5,
  },
  lettuce: {
    calories: 15,
    proteins: 1.4,
    carbs: 2.9,
    fats: 0.2,
    fiber: 1.3,
    saturatedFats: 0,
    sugars: 0.8,
    sodium: 28,
  },
  carrot: {
    calories: 41,
    proteins: 0.9,
    carbs: 9.6,
    fats: 0.2,
    fiber: 2.8,
    saturatedFats: 0,
    sugars: 4.7,
    sodium: 69,
  },
  mushroom: {
    calories: 22,
    proteins: 3.1,
    carbs: 3.3,
    fats: 0.3,
    fiber: 1.0,
    saturatedFats: 0,
    sugars: 2.0,
    sodium: 5,
  },
  corn: {
    calories: 86,
    proteins: 3.3,
    carbs: 19.0,
    fats: 1.4,
    fiber: 2.7,
    saturatedFats: 0.2,
    sugars: 6.3,
    sodium: 15,
  },
  potato: {
    calories: 77,
    proteins: 2.0,
    carbs: 17.5,
    fats: 0.1,
    fiber: 2.2,
    saturatedFats: 0,
    sugars: 0.8,
    sodium: 6,
  },
  broccoli: {
    calories: 34,
    proteins: 2.8,
    carbs: 7.0,
    fats: 0.4,
    fiber: 2.6,
    saturatedFats: 0.1,
    sugars: 1.7,
    sodium: 33,
  },
  cucumber: {
    calories: 15,
    proteins: 0.7,
    carbs: 3.6,
    fats: 0.1,
    fiber: 0.5,
    saturatedFats: 0,
    sugars: 1.7,
    sodium: 2,
  },
  eggplant: {
    calories: 25,
    proteins: 1.0,
    carbs: 5.9,
    fats: 0.2,
    fiber: 3.0,
    saturatedFats: 0,
    sugars: 3.5,
    sodium: 2,
  },

  // Fruits
  avocado: {
    calories: 160,
    proteins: 2.0,
    carbs: 8.5,
    fats: 14.7,
    fiber: 6.7,
    saturatedFats: 2.1,
    sugars: 0.7,
    sodium: 7,
  },

  // Grains
  rice: {
    calories: 130,
    proteins: 2.7,
    carbs: 28.2,
    fats: 0.3,
    fiber: 0.4,
    saturatedFats: 0.1,
    sugars: 0,
    sodium: 1,
  },
  pasta: {
    calories: 131,
    proteins: 5.0,
    carbs: 25.0,
    fats: 1.1,
    fiber: 1.8,
    saturatedFats: 0.2,
    sugars: 0.6,
    sodium: 1,
  },
  bread: {
    calories: 265,
    proteins: 9.4,
    carbs: 49.0,
    fats: 3.2,
    fiber: 2.7,
    saturatedFats: 0.7,
    sugars: 5.0,
    sodium: 491,
  },
  flour: {
    calories: 364,
    proteins: 10.3,
    carbs: 76.3,
    fats: 1.0,
    fiber: 2.7,
    saturatedFats: 0.2,
    sugars: 0.3,
    sodium: 2,
  },
};

/**
 * Get nutrition data for an ingredient by ID
 * Returns the CIQUAL/USDA values if available, otherwise DEFAULT_NUTRITION
 */
export function getNutritionForIngredient(id: string): NutritionPer100g {
  return NUTRITION_DATABASE[id] ?? DEFAULT_NUTRITION;
}

/**
 * Check if an ingredient has specific nutrition data in the database
 */
export function hasNutritionData(id: string): boolean {
  return id in NUTRITION_DATABASE;
}
