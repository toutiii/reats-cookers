import { Platform } from "react-native";
import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  CookerProfileResponse,
  CookerUpdateRequest,
  CookerPhotoUpdateRequest,
} from "./types";

// Build multipart/form-data with a single `photo` file for /cookers/{id}/photo/
const buildPhotoFormData = (uri: string): globalThis.FormData => {
  const formData = new globalThis.FormData();
  const filename = uri.split("/").pop() || "photo.jpg";
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : "image/jpeg";
  formData.append("photo", {
    uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
    name: filename,
    type,
  } as unknown as Blob);
  return formData;
};

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

    // PATCH /cookers/{id} - Update the connected cooker's profile (JSON body)
    updateCookerProfile: builder.mutation<ApiResponse<CookerProfileResponse>, CookerUpdateRequest>({
      query: ({ cookerId, ...body }) => ({
        url: `/cookers/${cookerId}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Cooker"],
    }),

    // PATCH /cookers/{id}/photo/ - Replace the cooker's profile photo (multipart)
    updateCookerPhoto: builder.mutation<ApiResponse<CookerProfileResponse>, CookerPhotoUpdateRequest>({
      query: ({ cookerId, photo }) => ({
        url: `/cookers/${cookerId}/photo/`,
        method: "PATCH",
        body: buildPhotoFormData(photo),
        formData: true,
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
  useUpdateCookerPhotoMutation,
} = cookerApi;
