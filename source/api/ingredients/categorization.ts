/**
 * Ingredient categorization module
 * Categorizes ingredients based on name patterns
 */

import type { IngredientCategory } from "./types";

/**
 * Icon mapping for ingredients
 */
const ICON_MAP: Record<string, string> = {
  salt: "🧂",
  pepper: "🌶️",
  oil: "🫒",
  garlic: "🧄",
  onion: "🧅",
  tomato: "🍅",
  potato: "🥔",
  carrot: "🥕",
  chicken: "🍗",
  beef: "🥩",
  fish: "🐟",
  egg: "🥚",
  milk: "🥛",
  cheese: "🧀",
  butter: "🧈",
  cream: "🥛",
  rice: "🍚",
  pasta: "🍝",
  bread: "🍞",
  flour: "🌾",
  sugar: "🍬",
  honey: "🍯",
  lemon: "🍋",
  lime: "🍋",
  orange: "🍊",
  apple: "🍎",
  banana: "🍌",
  strawberry: "🍓",
  mushroom: "🍄",
  lettuce: "🥬",
  cucumber: "🥒",
  avocado: "🥑",
  corn: "🌽",
  broccoli: "🥦",
  spinach: "🥬",
  herb: "🌿",
  basil: "🌿",
  parsley: "🌿",
  spice: "🧂",
  meat: "🥩",
  pork: "🥓",
  bacon: "🥓",
  shrimp: "🦐",
  lobster: "🦞",
  crab: "🦀",
  wine: "🍷",
  beer: "🍺",
  water: "💧",
};

/**
 * Get emoji icon for ingredient based on name
 */
export function getIngredientIcon(ingredientName: string): string {
  const name = ingredientName.toLowerCase();

  // Find matching icon
  for (const [keyword, emoji] of Object.entries(ICON_MAP)) {
    if (name.includes(keyword)) {
      return emoji;
    }
  }

  // Default icon
  return "🥘";
}

/**
 * Categorize ingredient based on name patterns
 */
export function categorizeIngredient(
  ingredientName: string
): IngredientCategory {
  const name = ingredientName.toLowerCase();

  // Protein sources
  if (
    /(chicken|beef|pork|lamb|fish|salmon|tuna|shrimp|egg|tofu|meat)/i.test(
      name
    )
  ) {
    return "protein";
  }

  // Dairy products
  if (/(milk|cheese|butter|cream|yogurt|dairy)/i.test(name)) {
    return "dairy";
  }

  // Vegetables
  if (
    /(tomato|potato|carrot|onion|garlic|lettuce|cucumber|broccoli|spinach|mushroom|pepper|vegetable)/i.test(
      name
    )
  ) {
    return "vegetable";
  }

  // Fruits
  if (
    /(apple|banana|orange|lemon|lime|strawberry|berry|fruit|avocado)/i.test(
      name
    )
  ) {
    return "fruit";
  }

  // Grains
  if (/(rice|pasta|bread|flour|wheat|grain|oat|barley)/i.test(name)) {
    return "grain";
  }

  // Spices and herbs
  if (
    /(spice|herb|basil|parsley|thyme|rosemary|cinnamon|ginger|paprika|cumin|oregano|sage)/i.test(
      name
    )
  ) {
    return "spice";
  }

  // Default to basic
  return "basic";
}
