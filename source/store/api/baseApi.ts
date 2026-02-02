import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import type { ApiErrorResponse } from "./types";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_URL environment variable is not set");
}

if (!API_KEY) {
  throw new Error("EXPO_PUBLIC_API_KEY environment variable is not set");
}

// Base fetch query with headers
const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${API_BASE_URL}/api/v1`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.accessToken;

    // JWT token for authenticated requests
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    // API key for public endpoints
    headers.set("X-API-Key", API_KEY as string);

    // App origin header (required by API)
    headers.set("App-Origin", "cooker");

    return headers;
  },
});

// Custom base query that transforms API responses with success: false into errors
const baseQueryWithErrorHandling: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Check if the response has success: false (API returns 200 but indicates error)
  if (result.data) {
    const data = result.data as { success?: boolean; error?: ApiErrorResponse["error"] };
    if (data.success === false && data.error) {
      return {
        error: {
          status: "CUSTOM_ERROR" as const,
          data: { success: false, error: data.error } as ApiErrorResponse,
        },
      };
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Auth", "Cooker"],
  endpoints: () => ({}),
});
