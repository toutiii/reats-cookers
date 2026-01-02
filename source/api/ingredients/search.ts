/**
 * Search and filtering utilities for ingredients
 */

import type { Ingredient } from "./types";

/**
 * Search ingredients by name with fuzzy matching
 */
export function searchIngredients(
  query: string,
  ingredients: Ingredient[]
): Ingredient[] {
  if (!query || query.trim() === "") {
    return ingredients;
  }

  const lowerQuery = query.toLowerCase().trim();

  // Exact and partial matches
  return ingredients.filter((ingredient) => {
    const nameLower = ingredient.name.toLowerCase();
    const nameEnLower = ingredient.nameEn.toLowerCase();

    // Prioritize exact matches and starts-with matches
    return (
      nameLower.includes(lowerQuery) ||
      nameEnLower.includes(lowerQuery) ||
      nameLower.startsWith(lowerQuery) ||
      nameEnLower.startsWith(lowerQuery)
    );
  });
}

/**
 * Filter ingredients by category
 */
export function filterIngredientsByCategory(
  category: string,
  ingredients: Ingredient[]
): Ingredient[] {
  if (!category || category === "all") {
    return ingredients;
  }

  return ingredients.filter(
    (ingredient) => ingredient.category === category
  );
}

/**
 * Get unique categories from ingredients
 */
export function getIngredientCategories(ingredients: Ingredient[]): string[] {
  const categories = new Set(ingredients.map((i) => i.category));
  return Array.from(categories).sort();
}

/**
 * Merge and deduplicate ingredients from multiple sources
 * Priority: First source takes precedence for duplicates
 */
export function mergeIngredients(
  ...ingredientArrays: Ingredient[][]
): Ingredient[] {
  const merged = new Map<string, Ingredient>();
  const seenNames = new Set<string>();

  for (const ingredients of ingredientArrays) {
    for (const ingredient of ingredients) {
      // Normalize name for comparison (remove spaces, lowercase, accents)
      const normalizedName = ingredient.nameEn
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      // Skip if we've already seen this ingredient
      if (seenNames.has(normalizedName)) {
        continue;
      }

      // Mark as seen and add to merged collection
      seenNames.add(normalizedName);
      merged.set(ingredient.id, ingredient);
    }
  }

  return Array.from(merged.values());
}
