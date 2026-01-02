/**
 * Pagination utilities for ingredients
 */

import { searchIngredients, filterIngredientsByCategory } from "./search";
import type { Ingredient, PaginationResult, PaginationOptions } from "./types";

/**
 * Paginate ingredients array
 */
export function paginateIngredients(
  ingredients: Ingredient[],
  page = 1,
  pageSize = 20
): PaginationResult {
  const totalItems = ingredients.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    items: ingredients.slice(startIndex, endIndex),
    totalPages,
    currentPage,
    totalItems,
    hasMore: currentPage < totalPages,
    hasPrevious: currentPage > 1,
  };
}

/**
 * Get paginated ingredients with filtering and search
 */
export function getPaginatedIngredients({
  ingredients,
  category = null,
  searchQuery = "",
  page = 1,
  pageSize = 20,
}: PaginationOptions): PaginationResult {
  // Apply filters
  let filtered = ingredients;

  // Filter by category
  if (category && category !== "all") {
    filtered = filterIngredientsByCategory(category, filtered);
  }

  // Apply search
  if (searchQuery && searchQuery.trim()) {
    filtered = searchIngredients(searchQuery, filtered);
  }

  // Paginate
  return paginateIngredients(filtered, page, pageSize);
}
