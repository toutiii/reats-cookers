// Dish domain types aligned with API documentation (/api/v1/dishes/)

export type DishCategory = "dish" | "starter" | "dessert";

export interface DishIngredient {
  readonly id: number;
  readonly name: string;
  readonly quantity: string;
}

export interface DishImage {
  readonly id: number;
  readonly url: string;
  readonly is_primary: boolean;
  readonly position: number;
}

export interface NutritionalInfo {
  readonly calories: number;
  readonly proteins: number;
  readonly carbohydrates: number;
  readonly fats: number;
}

// GET /dishes/ list item & GET /dishes/{id}/ detail response
export interface Dish {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly cost: number | null;
  readonly margin: number | null;
  readonly category: DishCategory;
  readonly available: boolean;
  readonly is_enabled: boolean;
  readonly preparation_time: number | null;
  readonly max_concurrent_orders: number;
  readonly current_orders: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly nutritional_info: NutritionalInfo | null;
  readonly allergens: readonly string[];
  readonly ingredients: readonly string[];
  // List endpoint returns a single image URL
  readonly image?: string;
  // Detail endpoint returns full image objects
  readonly images?: readonly DishImage[];
}

// POST /dishes/ request fields (sent as multipart/form-data)
export interface DishCreatePayload {
  readonly cooker: number;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly cost: number;
  readonly category: DishCategory;
  readonly preparation_time: number;
  readonly max_concurrent_orders: number;
  readonly country: string;
  readonly photos: readonly string[]; // URI strings from image picker
  readonly ingredients: readonly DishIngredientInput[];
  readonly nutritional_info?: NutritionalInfo;
}

export interface DishIngredientInput {
  readonly code: string;
  readonly name: string;
  readonly category: string;
  readonly is_allergen: boolean;
}

// PATCH /dishes/{id}/ request (all fields optional)
export interface DishUpdatePayload {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly cost?: number;
  readonly category?: DishCategory;
  readonly preparation_time?: number;
  readonly max_concurrent_orders?: number;
  readonly photos?: readonly string[];
  readonly ingredients?: readonly DishIngredientInput[];
  readonly nutritional_info?: NutritionalInfo;
}

// GET /dishes/ query params
export interface DishListParams {
  readonly page?: number;
  readonly page_size?: number;
  readonly search?: string;
  readonly is_enabled?: boolean;
}

// GET /dishes/ paginated response
export interface DishListResponse {
  readonly results: readonly Dish[];
  readonly pagination: {
    readonly current_page: number;
    readonly total_pages: number;
    readonly total_items: number;
    readonly items_per_page: number;
  };
}

// GET /dishes/ingredients/ response
export interface DishIngredientOption {
  readonly id: number;
  readonly name: string;
  readonly category: string;
}

export interface DishIngredientsListResponse {
  readonly results: readonly DishIngredientOption[];
  readonly categories: readonly {
    readonly id: string;
    readonly name: string;
    readonly count: number;
  }[];
}
