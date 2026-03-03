/**
 * Centralized type definitions for ingredients module
 */

/**
 * Ingredient category types
 */
export type IngredientCategory =
  | "basic"
  | "protein"
  | "dairy"
  | "fruit"
  | "vegetable"
  | "grain"
  | "spice";

/**
 * Allergen IDs aligned with EU INCO regulation (14 major allergens)
 */
export type AllergenId =
  | "gluten"
  | "crustaceans"
  | "eggs"
  | "fish"
  | "peanuts"
  | "soy"
  | "milk"
  | "nuts"
  | "celery"
  | "mustard"
  | "sesame"
  | "sulfites"
  | "lupin"
  | "molluscs";

/**
 * Normalized ingredient structure
 */
export interface Ingredient {
  id: string;
  name: string; // Display name (French)
  nameEn: string; // English name
  icon: string; // Emoji or icon identifier
  category: IngredientCategory;
  description?: string;
  thumbnail?: string | null;
  allergens: AllergenId[];
}

/**
 * TheMealDB API response types
 */
export interface MealDBIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
}

export interface MealDBResponse {
  meals: MealDBIngredient[];
}

/**
 * Cache data structure
 */
export interface CacheData {
  timestamp: number;
  data: Ingredient[];
}

/**
 * Pagination result
 */
export interface PaginationResult {
  items: Ingredient[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  hasMore: boolean;
  hasPrevious: boolean;
}

/**
 * Pagination options
 */
export interface PaginationOptions {
  ingredients: Ingredient[];
  category?: string | null;
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Nutrition types for recipe calculation
 */

/** Nutritional values per 100g of an ingredient (CIQUAL/USDA reference) */
export interface NutritionPer100g {
  calories: number; // kcal
  proteins: number; // g
  carbs: number; // g
  fats: number; // g
  fiber: number; // g
  saturatedFats: number; // g
  sugars: number; // g
  sodium: number; // mg
}

export type NutriScoreGrade = "A" | "B" | "C" | "D" | "E";

/** Nutrition breakdown for a single ingredient in the recipe */
export interface IngredientNutritionBreakdown {
  ingredientId: string;
  ingredientName: string;
  quantityGrams: number;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

/** Full recipe nutrition result */
export interface RecipeNutrition {
  total: NutritionPer100g;
  perPortion: NutritionPer100g;
  totalWeight: number; // g
  portionWeight: number; // g
  portions: number;
  nutriScore: NutriScoreGrade;
  nutriScorePoints: number;
  ingredientBreakdown: IngredientNutritionBreakdown[];
}

/** Mapping of ingredient IDs to their quantity in grams */
export type IngredientQuantities = Record<string, number>;
