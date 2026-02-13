import { baseApi } from "./baseApi";
import type { ApiResponse, CookerProfileResponse, CookerUpdateRequest } from "./types";

export const cookerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /cookers/{id} - Get the connected cooker's profile
    getCookerProfile: builder.query<ApiResponse<CookerProfileResponse>, number>({
      query: (cookerId) => ({
        url: `/cookers/${cookerId}/`,
        method: "GET",
      }),
      providesTags: ["Cooker"],
    }),

    // PATCH /cookers/{id} - Update the connected cooker's profile
    updateCookerProfile: builder.mutation<ApiResponse<CookerProfileResponse>, CookerUpdateRequest>({
      query: ({ cookerId, ...body }) => ({
        url: `/cookers/${cookerId}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cooker"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCookerProfileQuery,
  useLazyGetCookerProfileQuery,
  useUpdateCookerProfileMutation,
} = cookerApi;
