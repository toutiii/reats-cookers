/**
 * Local fallback ingredients
 * Used as safety net when API is unavailable
 * Provides essential ingredients for offline functionality
 */

import type { Ingredient } from "./types";

/**
 * Get local fallback ingredients
 * This is a safety net for when the API is unavailable
 */
export function getLocalIngredients(): Ingredient[] {
  return [
    // Basic seasonings
    {
      id: "salt",
      name: "Sel",
      nameEn: "Salt",
      icon: "🧂",
      category: "basic",
      allergens: [],
    },
    {
      id: "pepper",
      name: "Poivre",
      nameEn: "Pepper",
      icon: "🌶️",
      category: "basic",
      allergens: [],
    },
    {
      id: "oil",
      name: "Huile",
      nameEn: "Oil",
      icon: "🫒",
      category: "basic",
      allergens: [],
    },
    {
      id: "garlic",
      name: "Ail",
      nameEn: "Garlic",
      icon: "🧄",
      category: "basic",
      allergens: [],
    },
    {
      id: "onion",
      name: "Oignon",
      nameEn: "Onion",
      icon: "🧅",
      category: "basic",
      allergens: [],
    },
    {
      id: "herbs",
      name: "Herbes",
      nameEn: "Herbs",
      icon: "🌿",
      category: "basic",
      allergens: [],
    },

    // Proteins
    {
      id: "chicken",
      name: "Poulet",
      nameEn: "Chicken",
      icon: "🍗",
      category: "protein",
      allergens: [],
    },
    {
      id: "beef",
      name: "Bœuf",
      nameEn: "Beef",
      icon: "🥩",
      category: "protein",
      allergens: [],
    },
    {
      id: "fish",
      name: "Poisson",
      nameEn: "Fish",
      icon: "🐟",
      category: "protein",
      allergens: ["fish"],
    },
    {
      id: "egg",
      name: "Œuf",
      nameEn: "Egg",
      icon: "🥚",
      category: "protein",
      allergens: ["eggs"],
    },
    {
      id: "shrimp",
      name: "Crevette",
      nameEn: "Shrimp",
      icon: "🦐",
      category: "protein",
      allergens: ["crustaceans"],
    },
    {
      id: "tofu",
      name: "Tofu",
      nameEn: "Tofu",
      icon: "🧈",
      category: "protein",
      allergens: ["soy"],
    },

    // Dairy
    {
      id: "milk",
      name: "Lait",
      nameEn: "Milk",
      icon: "🥛",
      category: "dairy",
      allergens: ["milk"],
    },
    {
      id: "cheese",
      name: "Fromage",
      nameEn: "Cheese",
      icon: "🧀",
      category: "dairy",
      allergens: ["milk"],
    },
    {
      id: "butter",
      name: "Beurre",
      nameEn: "Butter",
      icon: "🧈",
      category: "dairy",
      allergens: ["milk"],
    },
    {
      id: "cream",
      name: "Crème",
      nameEn: "Cream",
      icon: "🥛",
      category: "dairy",
      allergens: ["milk"],
    },

    // Fruits & Vegetables
    {
      id: "tomato",
      name: "Tomate",
      nameEn: "Tomato",
      icon: "🍅",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "avocado",
      name: "Avocat",
      nameEn: "Avocado",
      icon: "🥑",
      category: "fruit",
      allergens: [],
    },
    {
      id: "lettuce",
      name: "Laitue",
      nameEn: "Lettuce",
      icon: "🥬",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "carrot",
      name: "Carotte",
      nameEn: "Carrot",
      icon: "🥕",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "mushroom",
      name: "Champignon",
      nameEn: "Mushroom",
      icon: "🍄",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "corn",
      name: "Maïs",
      nameEn: "Corn",
      icon: "🌽",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "potato",
      name: "Pomme de terre",
      nameEn: "Potato",
      icon: "🥔",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "broccoli",
      name: "Brocoli",
      nameEn: "Broccoli",
      icon: "🥦",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "cucumber",
      name: "Concombre",
      nameEn: "Cucumber",
      icon: "🥒",
      category: "vegetable",
      allergens: [],
    },
    {
      id: "eggplant",
      name: "Aubergine",
      nameEn: "Eggplant",
      icon: "🍆",
      category: "vegetable",
      allergens: [],
    },

    // Grains & Pasta
    {
      id: "rice",
      name: "Riz",
      nameEn: "Rice",
      icon: "🍚",
      category: "grain",
      allergens: [],
    },
    {
      id: "pasta",
      name: "Pâtes",
      nameEn: "Pasta",
      icon: "🍝",
      category: "grain",
      allergens: ["gluten"],
    },
    {
      id: "bread",
      name: "Pain",
      nameEn: "Bread",
      icon: "🍞",
      category: "grain",
      allergens: ["gluten"],
    },
    {
      id: "flour",
      name: "Farine",
      nameEn: "Flour",
      icon: "🌾",
      category: "grain",
      allergens: ["gluten"],
    },
  ];
}
