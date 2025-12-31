import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../index";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

if (!API_BASE_URL) {
  throw new Error("EXPO_PUBLIC_API_URL environment variable is not set");
}

if (!API_KEY) {
  throw new Error("EXPO_PUBLIC_API_KEY environment variable is not set");
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: ["Auth", "Cooker"],
  endpoints: () => ({}),
});
