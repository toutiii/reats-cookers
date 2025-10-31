import AsyncStorage from "@react-native-async-storage/async-storage";
import { ingredientImageBaseUrl } from "@/env";

// Cache configuration
const CACHE_KEY = "@ingredients_cache";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Normalized ingredient structure
 * @typedef {Object} Ingredient
 * @property {string} id - Unique identifier
 * @property {string} name - Display name (French)
 * @property {string} nameEn - English name
 * @property {string} icon - Emoji or icon identifier
 * @property {string} category - Category (basic, protein, dairy, fruit, vegetable, spice, etc.)
 * @property {string} [description] - Optional description
 * @property {string} [thumbnail] - Optional image URL
 * @property {string[]} [allergens] - List of allergen IDs
 */

/**
 * Fetch ingredients from TheMealDB API
 * Free tier: unlimited requests
 * @returns {Promise<Ingredient[]>}
 */
async function fetchFromTheMealDB() {
  try {
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    const data = await response.json();

    if (!data.meals) {
      throw new Error("Invalid response from TheMealDB");
    }

    // Transform TheMealDB data to our normalized structure
    return data.meals.map((meal, index) => {
      // Encode ingredient name for URL (handle spaces and special characters)
      const encodedName = meal.strIngredient
        ? encodeURIComponent(meal.strIngredient.trim())
        : null;

      return {
        id: `mealdb_${meal.idIngredient || index}`,
        name: translateIngredient(meal.strIngredient),
        nameEn: meal.strIngredient,
        icon: getIngredientIcon(meal.strIngredient),
        category: categorizeIngredient(meal.strIngredient),
        description: meal.strDescription || "",
        thumbnail: encodedName
          ? `${ingredientImageBaseUrl}/${encodedName}.png`
          : null,
        allergens: detectAllergens(meal.strIngredient),
      };
    });
  } catch (error) {
    console.error("Error fetching from TheMealDB:", error);
    return [];
  }
}

/**
 * Get local fallback ingredients
 * Used when APIs are unavailable or as supplementary data
 * @returns {Ingredient[]}
 */
function getLocalIngredients() {
  return [
    // Basic seasonings
    { id: "salt", name: "Sel", nameEn: "Salt", icon: "🧂", category: "basic", allergens: [] },
    { id: "pepper", name: "Poivre", nameEn: "Pepper", icon: "🌶️", category: "basic", allergens: [] },
    { id: "oil", name: "Huile", nameEn: "Oil", icon: "🫒", category: "basic", allergens: [] },
    { id: "garlic", name: "Ail", nameEn: "Garlic", icon: "🧄", category: "basic", allergens: [] },
    { id: "onion", name: "Oignon", nameEn: "Onion", icon: "🧅", category: "basic", allergens: [] },
    { id: "herbs", name: "Herbes", nameEn: "Herbs", icon: "🌿", category: "basic", allergens: [] },

    // Proteins
    { id: "chicken", name: "Poulet", nameEn: "Chicken", icon: "🍗", category: "protein", allergens: [] },
    { id: "beef", name: "Bœuf", nameEn: "Beef", icon: "🥩", category: "protein", allergens: [] },
    { id: "fish", name: "Poisson", nameEn: "Fish", icon: "🐟", category: "protein", allergens: ["fish"] },
    { id: "egg", name: "Œuf", nameEn: "Egg", icon: "🥚", category: "protein", allergens: ["eggs"] },
    { id: "shrimp", name: "Crevette", nameEn: "Shrimp", icon: "🦐", category: "protein", allergens: ["shellfish"] },
    { id: "tofu", name: "Tofu", nameEn: "Tofu", icon: "🧈", category: "protein", allergens: ["soy"] },

    // Dairy
    { id: "milk", name: "Lait", nameEn: "Milk", icon: "🥛", category: "dairy", allergens: ["lactose"] },
    { id: "cheese", name: "Fromage", nameEn: "Cheese", icon: "🧀", category: "dairy", allergens: ["lactose"] },
    { id: "butter", name: "Beurre", nameEn: "Butter", icon: "🧈", category: "dairy", allergens: ["lactose"] },
    { id: "cream", name: "Crème", nameEn: "Cream", icon: "🥛", category: "dairy", allergens: ["lactose"] },

    // Fruits & Vegetables
    { id: "tomato", name: "Tomate", nameEn: "Tomato", icon: "🍅", category: "vegetable", allergens: [] },
    { id: "avocado", name: "Avocat", nameEn: "Avocado", icon: "🥑", category: "fruit", allergens: [] },
    { id: "lettuce", name: "Laitue", nameEn: "Lettuce", icon: "🥬", category: "vegetable", allergens: [] },
    { id: "carrot", name: "Carotte", nameEn: "Carrot", icon: "🥕", category: "vegetable", allergens: [] },
    { id: "mushroom", name: "Champignon", nameEn: "Mushroom", icon: "🍄", category: "vegetable", allergens: [] },
    { id: "corn", name: "Maïs", nameEn: "Corn", icon: "🌽", category: "vegetable", allergens: [] },
    { id: "potato", name: "Pomme de terre", nameEn: "Potato", icon: "🥔", category: "vegetable", allergens: [] },
    { id: "broccoli", name: "Brocoli", nameEn: "Broccoli", icon: "🥦", category: "vegetable", allergens: [] },
    { id: "cucumber", name: "Concombre", nameEn: "Cucumber", icon: "🥒", category: "vegetable", allergens: [] },
    { id: "eggplant", name: "Aubergine", nameEn: "Eggplant", icon: "🍆", category: "vegetable", allergens: [] },

    // Grains & Pasta
    { id: "rice", name: "Riz", nameEn: "Rice", icon: "🍚", category: "grain", allergens: [] },
    { id: "pasta", name: "Pâtes", nameEn: "Pasta", icon: "🍝", category: "grain", allergens: ["gluten"] },
    { id: "bread", name: "Pain", nameEn: "Bread", icon: "🍞", category: "grain", allergens: ["gluten"] },
    { id: "flour", name: "Farine", nameEn: "Flour", icon: "🌾", category: "grain", allergens: ["gluten"] },
  ];
}

/**
 * Translate ingredient name to French
 * Basic translation mapping for common ingredients
 * @param {string} englishName
 * @returns {string}
 */
function translateIngredient(englishName) {
  const translations = {
    "Salt": "Sel",
    "Pepper": "Poivre",
    "Oil": "Huile",
    "Olive Oil": "Huile d'olive",
    "Garlic": "Ail",
    "Onion": "Oignon",
    "Tomato": "Tomate",
    "Potato": "Pomme de terre",
    "Carrot": "Carotte",
    "Chicken": "Poulet",
    "Beef": "Bœuf",
    "Fish": "Poisson",
    "Egg": "Œuf",
    "Milk": "Lait",
    "Cheese": "Fromage",
    "Butter": "Beurre",
    "Cream": "Crème",
    "Rice": "Riz",
    "Pasta": "Pâtes",
    "Bread": "Pain",
    "Flour": "Farine",
    "Sugar": "Sucre",
    "Honey": "Miel",
    "Lemon": "Citron",
    "Lime": "Citron vert",
    "Orange": "Orange",
    "Apple": "Pomme",
    "Banana": "Banane",
    "Strawberry": "Fraise",
    "Mushroom": "Champignon",
    "Lettuce": "Laitue",
    "Cucumber": "Concombre",
    "Avocado": "Avocat",
    "Corn": "Maïs",
    "Broccoli": "Brocoli",
    "Spinach": "Épinards",
    "Basil": "Basilic",
    "Parsley": "Persil",
    "Thyme": "Thym",
    "Rosemary": "Romarin",
    "Cinnamon": "Cannelle",
    "Ginger": "Gingembre",
    "Paprika": "Paprika",
    "Cumin": "Cumin",
  };

  return translations[englishName] || englishName;
}

/**
 * Get emoji icon for ingredient
 * @param {string} ingredientName
 * @returns {string}
 */
function getIngredientIcon(ingredientName) {
  const name = ingredientName.toLowerCase();

  // Mapping of keywords to emojis
  const iconMap = {
    "salt": "🧂",
    "pepper": "🌶️",
    "oil": "🫒",
    "garlic": "🧄",
    "onion": "🧅",
    "tomato": "🍅",
    "potato": "🥔",
    "carrot": "🥕",
    "chicken": "🍗",
    "beef": "🥩",
    "fish": "🐟",
    "egg": "🥚",
    "milk": "🥛",
    "cheese": "🧀",
    "butter": "🧈",
    "cream": "🥛",
    "rice": "🍚",
    "pasta": "🍝",
    "bread": "🍞",
    "flour": "🌾",
    "sugar": "🍬",
    "honey": "🍯",
    "lemon": "🍋",
    "lime": "🍋",
    "orange": "🍊",
    "apple": "🍎",
    "banana": "🍌",
    "strawberry": "🍓",
    "mushroom": "🍄",
    "lettuce": "🥬",
    "cucumber": "🥒",
    "avocado": "🥑",
    "corn": "🌽",
    "broccoli": "🥦",
    "spinach": "🥬",
    "herb": "🌿",
    "basil": "🌿",
    "parsley": "🌿",
    "spice": "🧂",
    "meat": "🥩",
    "pork": "🥓",
    "bacon": "🥓",
    "shrimp": "🦐",
    "lobster": "🦞",
    "crab": "🦀",
    "wine": "🍷",
    "beer": "🍺",
    "water": "💧",
  };

  // Find matching icon
  for (const [keyword, emoji] of Object.entries(iconMap)) {
    if (name.includes(keyword)) {
      return emoji;
    }
  }

  // Default icon based on category
  return "🥘";
}

/**
 * Categorize ingredient based on name
 * @param {string} ingredientName
 * @returns {string}
 */
function categorizeIngredient(ingredientName) {
  const name = ingredientName.toLowerCase();

  // Protein sources
  if (/(chicken|beef|pork|lamb|fish|salmon|tuna|shrimp|egg|tofu|meat)/i.test(name)) {
    return "protein";
  }

  // Dairy products
  if (/(milk|cheese|butter|cream|yogurt|dairy)/i.test(name)) {
    return "dairy";
  }

  // Vegetables
  if (/(tomato|potato|carrot|onion|garlic|lettuce|cucumber|broccoli|spinach|mushroom|pepper|vegetable)/i.test(name)) {
    return "vegetable";
  }

  // Fruits
  if (/(apple|banana|orange|lemon|lime|strawberry|berry|fruit|avocado)/i.test(name)) {
    return "fruit";
  }

  // Grains
  if (/(rice|pasta|bread|flour|wheat|grain|oat|barley)/i.test(name)) {
    return "grain";
  }

  // Spices and herbs
  if (/(spice|herb|basil|parsley|thyme|rosemary|cinnamon|ginger|paprika|cumin|oregano|sage)/i.test(name)) {
    return "spice";
  }

  // Default to basic
  return "basic";
}

/**
 * Detect potential allergens in ingredient
 * @param {string} ingredientName
 * @returns {string[]}
 */
function detectAllergens(ingredientName) {
  const name = ingredientName.toLowerCase();
  const allergens = [];

  if (/(milk|cheese|butter|cream|yogurt|dairy|lactose)/i.test(name)) {
    allergens.push("lactose");
  }

  if (/(egg)/i.test(name)) {
    allergens.push("eggs");
  }

  if (/(fish|salmon|tuna|cod)/i.test(name)) {
    allergens.push("fish");
  }

  if (/(shrimp|lobster|crab|shellfish|seafood)/i.test(name)) {
    allergens.push("shellfish");
  }

  if (/(peanut|almond|walnut|cashew|nut)/i.test(name)) {
    allergens.push("nuts");
  }

  if (/(soy|tofu)/i.test(name)) {
    allergens.push("soy");
  }

  if (/(wheat|flour|bread|pasta|gluten)/i.test(name)) {
    allergens.push("gluten");
  }

  return allergens;
}

/**
 * Merge and deduplicate ingredients from multiple sources
 * Priority: First source takes precedence for duplicates
 * @param {Ingredient[][]} ingredientArrays
 * @returns {Ingredient[]}
 * @private - Reserved for future use when merging multiple APIs
 */
function _mergeIngredients(...ingredientArrays) {
  const merged = new Map();
  const seenNames = new Set();

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

/**
 * Save ingredients to cache
 * @param {Ingredient[]} ingredients
 */
async function saveToCache(ingredients) {
  try {
    const cacheData = {
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
 * @returns {Promise<Ingredient[] | null>}
 */
async function loadFromCache() {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { timestamp, data } = JSON.parse(cached);

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
 * Main function to fetch all ingredients
 * Implements multi-source strategy with caching and fallback
 * @param {boolean} forceRefresh - Force refresh from APIs, bypass cache
 * @returns {Promise<Ingredient[]>}
 */
export async function fetchIngredients(forceRefresh = false) {
  try {
    // Try cache first unless force refresh
    if (!forceRefresh) {
      const cached = await loadFromCache();
      if (cached) {
        console.log("Loaded ingredients from cache");
        return cached;
      }
    }

    console.log("Fetching ingredients from APIs...");

    // Fetch from API sources
    const mealDBIngredients = await fetchFromTheMealDB();
    // Note: Open Food Facts API is commented out due to large response size
    // const openFoodFactsIngredients = await _fetchFromOpenFoodFacts();

    // Use API data if available, otherwise fallback to local
    let allIngredients;
    if (mealDBIngredients.length > 0) {
      // API succeeded - use API data only (no merge with local to avoid duplicates)
      allIngredients = mealDBIngredients;
      console.log(`Using ${mealDBIngredients.length} ingredients from TheMealDB`);
    } else {
      // API failed - use local fallback
      console.log("API failed, using local ingredients as fallback");
      allIngredients = getLocalIngredients();
    }

    // Sort alphabetically by French name
    allIngredients.sort((a, b) => a.name.localeCompare(b.name, "fr"));

    // Save to cache
    await saveToCache(allIngredients);

    console.log(`Fetched ${allIngredients.length} ingredients`);
    return allIngredients;

  } catch (error) {
    console.error("Error fetching ingredients:", error);

    // Fallback to local ingredients only
    return getLocalIngredients();
  }
}

/**
 * Search ingredients by name with fuzzy matching
 * @param {string} query - Search query
 * @param {Ingredient[]} ingredients - Array of ingredients to search
 * @returns {Ingredient[]}
 */
export function searchIngredients(query, ingredients) {
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
 * @param {string} category - Category to filter by
 * @param {Ingredient[]} ingredients - Array of ingredients to filter
 * @returns {Ingredient[]}
 */
export function filterIngredientsByCategory(category, ingredients) {
  if (!category || category === "all") {
    return ingredients;
  }

  return ingredients.filter(ingredient => ingredient.category === category);
}

/**
 * Get unique categories from ingredients
 * @param {Ingredient[]} ingredients
 * @returns {string[]}
 */
export function getIngredientCategories(ingredients) {
  const categories = new Set(ingredients.map(i => i.category));
  return Array.from(categories).sort();
}

/**
 * Paginate ingredients array
 * @param {Ingredient[]} ingredients - Array of ingredients to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Number of items per page
 * @returns {{ items: Ingredient[], totalPages: number, currentPage: number, totalItems: number }}
 */
export function paginateIngredients(ingredients, page = 1, pageSize = 20) {
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
 * @param {Object} options - Pagination options
 * @param {Ingredient[]} options.ingredients - All ingredients
 * @param {string} options.category - Category filter
 * @param {string} options.searchQuery - Search query
 * @param {number} options.page - Page number
 * @param {number} options.pageSize - Items per page
 * @returns {Object} Paginated result
 */
export function getPaginatedIngredients({
  ingredients,
  category = null,
  searchQuery = "",
  page = 1,
  pageSize = 20,
}) {
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

/**
 * Clear ingredients cache
 * Useful for testing or forcing refresh
 */
export async function clearIngredientsCache() {
  try {
    await AsyncStorage.removeItem(CACHE_KEY);
    console.log("Ingredients cache cleared");
  } catch (error) {
    console.error("Error clearing cache:", error);
  }
}
