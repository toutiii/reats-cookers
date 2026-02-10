/**
 * Cache management module
 * Handles persistent storage of ingredients with expiration
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Ingredient, CacheData } from "./types";

// Cache configuration
const CACHE_KEY = "@ingredients_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Save ingredients to cache
 */
export async function saveToCache(ingredients: Ingredient[]): Promise<void> {
  try {
    const cacheData: CacheData = {
      timestamp: Date.now(),
      data: ingredients,
    };
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch (error) {
    console.error("Error saving to cache:", error);
  }
}

/**
 * Load ingredients from cache
 * Returns null if cache is expired or invalid
 */
export async function loadFromCache(): Promise<Ingredient[] | null> {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { timestamp, data }: CacheData = JSON.parse(cached);

    // Check if cache is still valid
    if (Date.now() - timestamp > CACHE_DURATION) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error loading from cache:", error);
    return null;
  }
}

/**
 * Clear ingredients cache
 * Useful for testing or forcing refresh
 */
export async function clearCache(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    console.log("Ingredients cache cleared");
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}
