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
