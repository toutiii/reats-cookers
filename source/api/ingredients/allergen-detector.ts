/**
 * Advanced allergen detection service
 * Automatically detects allergens based on ingredients with comprehensive mapping
 * Compliant with EU INCO regulation (14 major allergens)
 */

import type { Ingredient } from "@/api/ingredients";

export interface AllergenDetectionResult {
  allergenId: string;
  confidence: "high" | "medium" | "low";
  detectedFrom: string[]; // List of ingredient IDs that triggered this allergen
  reason: string;
}

/**
 * Comprehensive allergen mapping database
 * Maps ingredient patterns to allergen IDs with confidence levels
 */
const ALLERGEN_PATTERNS = {
  gluten: {
    keywords: [
      "wheat", "flour", "bread", "pasta", "noodle", "couscous", "bulgur",
      "semolina", "spelt", "rye", "barley", "oat", "malt", "seitan",
      "farro", "kamut", "triticale", "bran", "gluten", "cereal"
    ],
    confidence: "high",
  },
  crustaceans: {
    keywords: [
      "crab", "lobster", "shrimp", "prawn", "crayfish", "langoustine",
      "scampi", "krill", "crustacean"
    ],
    confidence: "high",
  },
  eggs: {
    keywords: [
      "egg", "mayonnaise", "meringue", "albumin", "ovalbumin",
      "lysozyme", "lecithin"
    ],
    confidence: "high",
  },
  fish: {
    keywords: [
      "fish", "salmon", "tuna", "cod", "haddock", "trout", "mackerel",
      "sardine", "anchovy", "herring", "bass", "tilapia", "halibut",
      "sole", "swordfish", "caviar", "roe"
    ],
    confidence: "high",
  },
  peanuts: {
    keywords: [
      "peanut", "groundnut", "arachis", "cacahuete", "monkey nut"
    ],
    confidence: "high",
  },
  soy: {
    keywords: [
      "soy", "soya", "tofu", "tempeh", "edamame", "miso", "natto",
      "soy sauce", "tamari", "shoyu", "textured vegetable protein",
      "tvp", "soybean"
    ],
    confidence: "high",
  },
  milk: {
    keywords: [
      "milk", "dairy", "cheese", "butter", "cream", "yogurt", "yoghurt",
      "whey", "casein", "lactose", "curd", "ghee", "paneer", "ricotta",
      "mozzarella", "parmesan", "cheddar", "brie", "camembert", "feta",
      "goat cheese", "buttermilk", "condensed milk", "evaporated milk"
    ],
    confidence: "high",
  },
  nuts: {
    keywords: [
      "almond", "hazelnut", "walnut", "cashew", "pecan", "pistachio",
      "macadamia", "brazil nut", "pine nut", "chestnut", "nut",
      "praline", "marzipan", "nougat"
    ],
    confidence: "high",
  },
  celery: {
    keywords: [
      "celery", "celeriac", "celery root", "celery seed", "celery salt"
    ],
    confidence: "high",
  },
  mustard: {
    keywords: [
      "mustard", "mustard seed", "dijon", "wholegrain mustard",
      "mustard powder", "mustard oil"
    ],
    confidence: "high",
  },
  sesame: {
    keywords: [
      "sesame", "tahini", "sesame seed", "sesame oil", "sesamol",
      "gomasio", "halvah", "halva"
    ],
    confidence: "high",
  },
  sulfites: {
    keywords: [
      "sulfite", "sulphite", "sulfur dioxide", "sulphur dioxide",
      "wine", "dried fruit", "vinegar", "preserved"
    ],
    confidence: "medium", // Medium because wine/vinegar don't always have high sulfite levels
  },
  lupin: {
    keywords: [
      "lupin", "lupine", "lupin flour", "lupin seed"
    ],
    confidence: "high",
  },
  molluscs: {
    keywords: [
      "mussel", "oyster", "clam", "scallop", "snail", "squid",
      "octopus", "cuttlefish", "whelk", "abalone", "cockle",
      "mollusc", "mollusk", "calamari"
    ],
    confidence: "high",
  },
};

/**
 * Detects allergens from a list of selected ingredients
 * @param selectedIngredientIds - Array of selected ingredient IDs
 * @param allIngredients - Complete list of available ingredients
 * @returns Array of detected allergens with confidence and reasoning
 */
export function detectAllergensFromIngredients(
  selectedIngredientIds: string[],
  allIngredients: Ingredient[]
): AllergenDetectionResult[] {
  const detectedAllergens = new Map<string, AllergenDetectionResult>();

  // Get selected ingredients
  const selectedIngredients = allIngredients.filter((ing) =>
    selectedIngredientIds.includes(ing.id)
  );

  // Check each selected ingredient
  for (const ingredient of selectedIngredients) {
    // First, check if ingredient has pre-defined allergens
    if (ingredient.allergens && ingredient.allergens.length > 0) {
      for (const allergenId of ingredient.allergens) {
        if (!detectedAllergens.has(allergenId)) {
          detectedAllergens.set(allergenId, {
            allergenId,
            confidence: "high",
            detectedFrom: [ingredient.id],
            reason: `Détecté dans: ${ingredient.name}`,
          });
        } else {
          const existing = detectedAllergens.get(allergenId)!;
          existing.detectedFrom.push(ingredient.id);
          existing.reason += `, ${ingredient.name}`;
        }
      }
    }

    // Then, perform pattern-based detection for additional coverage
    const ingredientText = `${ingredient.name} ${ingredient.nameEn}`.toLowerCase();

    for (const [allergenId, config] of Object.entries(ALLERGEN_PATTERNS)) {
      for (const keyword of config.keywords) {
        if (ingredientText.includes(keyword.toLowerCase())) {
          if (!detectedAllergens.has(allergenId)) {
            detectedAllergens.set(allergenId, {
              allergenId,
              confidence: config.confidence as "high" | "medium" | "low",
              detectedFrom: [ingredient.id],
              reason: `Détecté dans: ${ingredient.name}`,
            });
          } else {
            const existing = detectedAllergens.get(allergenId)!;
            if (!existing.detectedFrom.includes(ingredient.id)) {
              existing.detectedFrom.push(ingredient.id);
              existing.reason += `, ${ingredient.name}`;
            }
          }
          break; // Found match, no need to check other keywords
        }
      }
    }
  }

  return Array.from(detectedAllergens.values());
}

/**
 * Get allergen suggestions that are not yet selected
 * @param detectedAllergens - Allergens detected from ingredients
 * @param currentlySelectedAllergens - Allergens already selected by user
 * @returns Allergens that should be suggested to the user
 */
export function getAllergenSuggestions(
  detectedAllergens: AllergenDetectionResult[],
  currentlySelectedAllergens: string[]
): AllergenDetectionResult[] {
  return detectedAllergens.filter(
    (detected) => !currentlySelectedAllergens.includes(detected.allergenId)
  );
}

/**
 * Get missing allergens that were detected but not selected
 * Useful for validation warnings
 */
export function getMissingAllergens(
  detectedAllergens: AllergenDetectionResult[],
  currentlySelectedAllergens: string[]
): AllergenDetectionResult[] {
  return detectedAllergens.filter(
    (detected) =>
      detected.confidence === "high" &&
      !currentlySelectedAllergens.includes(detected.allergenId)
  );
}

/**
 * Auto-apply high-confidence allergen suggestions
 * @param detectedAllergens - All detected allergens
 * @param currentlySelectedAllergens - Currently selected allergens
 * @returns Updated allergen selection with high-confidence additions
 */
export function autoApplyHighConfidenceAllergens(
  detectedAllergens: AllergenDetectionResult[],
  currentlySelectedAllergens: string[]
): string[] {
  const highConfidence = detectedAllergens
    .filter((d) => d.confidence === "high")
    .map((d) => d.allergenId);

  // Merge with existing selections (deduplicate)
  return Array.from(new Set([...currentlySelectedAllergens, ...highConfidence]));
}
