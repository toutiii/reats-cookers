import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";
import type { ApiErrorResponse, ApiResponse, RefreshTokenResponse } from "./types";
import { updateTokens, logout } from "../slices/auth";
import { Mutex } from "./mutex";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_URL environment variable is not set");
}

if (!API_KEY) {
  throw new Error("EXPO_PUBLIC_API_KEY environment variable is not set");
}

// Mutex to prevent multiple simultaneous refresh requests
const refreshMutex = new Mutex();

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

// Check if the error is a token expiration error
const isTokenError = (result: { error?: FetchBaseQueryError; data?: unknown }): boolean => {
  // HTTP 401
  if (result.error && "status" in result.error && result.error.status === 401) {
    return true;
  }
  // API returns 200 with success: false and token_not_valid code
  if (result.data) {
    const data = result.data as { success?: boolean; error?: { code?: string } };
    if (data.success === false && data.error?.code === "token_not_valid") {
      return true;
    }
  }
  return false;
};

// Custom base query with automatic token refresh and error handling
const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  // Wait if a refresh is already in progress
  await refreshMutex.waitForUnlock();

  let result = await rawBaseQuery(args, api, extraOptions);

  if (isTokenError(result)) {
    // Try to refresh the token
    if (!refreshMutex.isLocked()) {
      const release = await refreshMutex.acquire();

      try {
        const state = api.getState() as RootState;
        const refreshToken = state.auth.refreshToken;

        if (refreshToken) {
          const refreshResult = await rawBaseQuery(
            { url: "/token/refresh/", method: "POST", body: { refresh: refreshToken } },
            api,
            extraOptions,
          );

          if (refreshResult.data) {
            const data = refreshResult.data as ApiResponse<RefreshTokenResponse>;
            if (data.success) {
              // Store new tokens
              api.dispatch(updateTokens({
                accessToken: data.data.access,
                refreshToken: data.data.refresh,
              }));
            } else {
              api.dispatch(logout());
              return result;
            }
          } else {
            // Refresh failed, logout
            api.dispatch(logout());
            return result;
          }
        } else {
          // No refresh token available, logout
          api.dispatch(logout());
          return result;
        }
      } finally {
        release();
      }

      // Retry the original request with the new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Another refresh is in progress, wait and retry
      await refreshMutex.waitForUnlock();
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  // Transform API responses with success: false into RTK Query errors
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
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Cooker", "Dashboard"],
  endpoints: () => ({}),
});
