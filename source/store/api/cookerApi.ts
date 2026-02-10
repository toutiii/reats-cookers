import { baseApi } from "./baseApi";
import type { ApiResponse, CookerProfileResponse } from "./types";

export const cookerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /cookers/{id} - Récupérer le profil du cooker connecté
    getCookerProfile: builder.query<ApiResponse<CookerProfileResponse>, number>({
      query: (cookerId) => ({
        url: `/cookers/${cookerId}/`,
        method: "GET",
      }),
      providesTags: ["Cooker"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCookerProfileQuery, useLazyGetCookerProfileQuery } = cookerApi;
