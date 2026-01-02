/**
 * Ingredients API - Main entry point
 * Modular architecture with clear separation of concerns
 */

import { fetchFromTheMealDB } from "./api-client";
import { getLocalIngredients } from "./local-ingredients";
import { saveToCache, loadFromCache } from "./cache";
import { mergeIngredients } from "./search";
import type { Ingredient } from "./types";

// Re-export all public types
export type {
  Ingredient,
  IngredientCategory,
  AllergenId,
  PaginationResult,
  PaginationOptions,
} from "./types";

// Re-export utility functions
export {
  searchIngredients,
  filterIngredientsByCategory,
  getIngredientCategories,
} from "./search";

export { paginateIngredients, getPaginatedIngredients } from "./pagination";

export { clearCache as clearIngredientsCache } from "./cache";

/**
 * Main function to fetch all ingredients
 *
 * Strategy:
 * 1. Check cache (24h validity)
 * 2. Fetch from TheMealDB API
 * 3. Merge API data with local ingredients for enriched list
 * 4. Fallback to local ingredients if API fails
 * 5. Save to cache
 *
 * @param forceRefresh - Bypass cache and force API call
 * @returns Promise<Ingredient[]>
 */
export async function fetchIngredients(
  forceRefresh = false
): Promise<Ingredient[]> {
  try {
    // 1. Try cache first unless force refresh
    if (!forceRefresh) {
      const cached = await loadFromCache();
      if (cached) {
        console.log("Loaded ingredients from cache");
        return cached;
      }
    }

    console.log("Fetching ingredients from API...");

    // 2. Fetch from TheMealDB API
    const apiIngredients = await fetchFromTheMealDB();

    // 3. Strategy: Merge API + Local for enriched list
    let allIngredients: Ingredient[];

    if (apiIngredients.length > 0) {
      // API succeeded - Merge with local ingredients
      const localIngredients = getLocalIngredients();
      allIngredients = mergeIngredients(apiIngredients, localIngredients);

      console.log(
        `Merged ${apiIngredients.length} API + ${localIngredients.length} local = ${allIngredients.length} total`
      );
    } else {
      // API failed - Use local fallback only
      console.warn("API failed, using local ingredients as fallback");
      allIngredients = getLocalIngredients();
    }

    // 4. Migrate old allergen IDs (lactose → milk for EU INCO compliance)
    allIngredients = allIngredients.map((ingredient) => ({
      ...ingredient,
      allergens: ingredient.allergens.map((allergen) => {
        // Migration: old "lactose" ID → new "milk" ID
        if ((allergen as string) === "lactose") return "milk";
        return allergen;
      }),
    }));

    // 5. Sort alphabetically by French name
    allIngredients.sort((a, b) => a.name.localeCompare(b.name, "fr"));

    // 6. Save to cache
    await saveToCache(allIngredients);

    console.log(`Fetched ${allIngredients.length} ingredients`);
    return allIngredients;

  } catch (error) {
    console.error("Error fetching ingredients:", error);

    // Critical fallback: Use local ingredients
    console.warn("Using local ingredients as critical fallback");
    return getLocalIngredients();
  }
}
