export const ENV = process.env.ENV;

export const apiBaseUrl =
    ENV === "production"
        ? process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL
        : ENV === "staging"
            ? process.env.EXPO_PUBLIC_STAGING_API_BASE_URL
            : process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL;

export const apiKeyBackend =
    ENV === "production"
        ? process.env.EXPO_PUBLIC_PRODUCTION_API_KEY
        : ENV === "staging"
            ? process.env.EXPO_PUBLIC_STAGING_API_KEY
            : process.env.EXPO_PUBLIC_DEVELOPMENT_API_KEY;

export const appOriginHeader = "cooker";

export const ingredientImageBaseUrl = "https://www.themealdb.com/images/ingredients";
export const ingredientApiBaseUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";