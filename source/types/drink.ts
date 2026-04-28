// Drink domain types aligned with API documentation (/api/v1/drinks/)

import type { DishIngredientInput, DishIngredientsListResponse } from "./dish";

export interface DrinkImage {
  readonly id: number;
  readonly url: string;
  readonly is_primary: boolean;
  readonly position: number;
}

export interface DrinkNutritionalInfo {
  readonly calories?: number;
  readonly proteins?: number;
  readonly carbohydrates?: number;
  readonly sugars?: number;
  readonly fats?: number;
  readonly fiber?: number;
}

// Swagger UnitEnum
export type DrinkUnit = "liter" | "centiliters";

export interface DrinkIngredient {
  readonly id: number;
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly is_allergen: boolean;
}

// GET /drinks/ list item & GET /drinks/{id}/ detail response
export interface Drink {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly capacity: number;
  readonly unit?: DrinkUnit;
  readonly country?: string;
  readonly is_suitable_for_quick_delivery: boolean;
  readonly is_suitable_for_scheduled_delivery: boolean;
  readonly is_enabled?: boolean;
  readonly created_at?: string;
  readonly updated_at?: string;
  readonly nutritional_info?: DrinkNutritionalInfo | null;
  readonly ingredients?: readonly DrinkIngredient[];
  // List endpoint returns a single image URL
  readonly image?: string;
  // Detail endpoint returns full image objects
  readonly images?: readonly DrinkImage[];
}

// Drink ingredient input shape mirrors dish ingredient input
export type DrinkIngredientInput = DishIngredientInput;

// POST /drinks/ request (multipart/form-data) — aligned with Swagger DrinkPOSTRequest
// Required by API: cooker, name, price, capacity, unit, country, ingredients
export interface DrinkCreatePayload {
  readonly cooker: number;
  readonly name: string;
  readonly description?: string;
  readonly price: number;
  readonly capacity: number;
  readonly unit: DrinkUnit;
  readonly country: string;
  readonly is_suitable_for_quick_delivery?: boolean;
  readonly is_suitable_for_scheduled_delivery?: boolean;
  readonly photos: readonly string[]; // URI strings from image picker
  readonly ingredients: readonly DrinkIngredientInput[];
  readonly nutritional_info?: DrinkNutritionalInfo;
}

// PATCH /drinks/{id}/ — aligned with Swagger PatchedDrinkPATCHRequest
// Notable: unit, country and cooker are NOT mutable; is_enabled IS mutable.
export interface DrinkUpdatePayload {
  readonly is_enabled?: boolean;
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly capacity?: number;
  readonly is_suitable_for_quick_delivery?: boolean;
  readonly is_suitable_for_scheduled_delivery?: boolean;
  readonly photos?: readonly string[];
  readonly ingredients?: readonly DrinkIngredientInput[];
  readonly nutritional_info?: DrinkNutritionalInfo;
}

// GET /drinks/ query params
export interface DrinkListParams {
  readonly page?: number;
  readonly page_size?: number;
  readonly search?: string;
  readonly is_enabled?: boolean;
}

// GET /drinks/ paginated response
export interface DrinkListResponse {
  readonly results: readonly Drink[];
  readonly pagination: {
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_items: number;
    readonly items_per_page: number;
  };
}

// GET /drinks/ingredients/ response — same shape as dish ingredients list
export type DrinkIngredientsListResponse = DishIngredientsListResponse;
