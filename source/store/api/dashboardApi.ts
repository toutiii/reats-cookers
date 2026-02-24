import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  DashboardPeriod,
  DashboardStatsResponse,
  PopularItemsResponse,
  RecentReviewsResponse,
} from "./types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiResponse<DashboardStatsResponse>, { period?: DashboardPeriod } | void>({
      query: (params) => ({
        url: "/dashboard/stats/",
        method: "GET",
        params: params ? { period: params.period } : undefined,
      }),
      providesTags: ["Dashboard"],
    }),

    getPopularItems: builder.query<ApiResponse<PopularItemsResponse>, void>({
      query: () => ({
        url: "/dashboard/popular-items/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    getRecentReviews: builder.query<ApiResponse<RecentReviewsResponse>, void>({
      query: () => ({
        url: "/dashboard/recent-reviews/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useGetDashboardStatsQuery,
  useGetPopularItemsQuery,
  useGetRecentReviewsQuery,
} = dashboardApi;
