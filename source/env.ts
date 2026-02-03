// API Configuration
// Uses EXPO_PUBLIC_* environment variables from .env file

export const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";
export const apiKeyBackend = process.env.EXPO_PUBLIC_API_KEY || "";

export const appOriginHeader = "cooker";

// External APIs
export const ingredientImageBaseUrl = "https://www.themealdb.com/images/ingredients";
export const ingredientApiBaseUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
