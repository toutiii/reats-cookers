import { Platform } from "react-native";
import { baseApi } from "./baseApi";
import type { ApiResponse } from "./types";
import type {
  Dish,
  DishCreatePayload,
  DishUpdatePayload,
  DishListParams,
  DishListResponse,
  DishIngredientsListResponse,
} from "@/types/dish";

// Build multipart/form-data for dish create/update
const buildDishFormData = (
  data: DishCreatePayload | DishUpdatePayload,
): globalThis.FormData => {
  const formData = new globalThis.FormData();

  if ("cooker" in data && (data as DishCreatePayload).cooker !== undefined) {
    formData.append("cooker", String((data as DishCreatePayload).cooker));
  }
  if ("country" in data && (data as DishCreatePayload).country !== undefined) {
    formData.append("country", (data as DishCreatePayload).country);
  }

  if (data.name !== undefined) {
    formData.append("name", data.name);
  }
  if (data.description !== undefined) {
    formData.append("description", data.description);
  }
  if (data.price !== undefined) {
    formData.append("price", String(data.price));
  }
  if (data.cost !== undefined) {
    formData.append("cost", String(data.cost));
  }
  if (data.category !== undefined) {
    formData.append("category", data.category);
  }
  if (data.preparation_time !== undefined) {
    formData.append("preparation_time", String(data.preparation_time));
  }
  if (data.max_concurrent_orders !== undefined) {
    formData.append("max_concurrent_orders", String(data.max_concurrent_orders));
  }

  // Ingredients as JSON-stringified array
  if (data.ingredients !== undefined) {
    formData.append("ingredients", JSON.stringify(data.ingredients));
  }

  // Nutritional info as JSON-stringified object
  if (data.nutritional_info !== undefined) {
    formData.append("nutritional_info", JSON.stringify(data.nutritional_info));
  }

  // Photo files
  if (data.photos !== undefined) {
    data.photos.forEach((uri, index) => {
      const filename = uri.split("/").pop() || `photo_${index}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("photos", {
        uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
        name: filename,
        type,
      } as unknown as Blob);
    });
  }

  return formData;
};

// Build query string from params, filtering out undefined values
const buildDishQueryString = (params: DishListParams): string => {
  const searchParams = new URLSearchParams();

  if (params.page !== undefined) {
    searchParams.set("page", String(params.page));
  }
  if (params.page_size !== undefined) {
    searchParams.set("page_size", String(params.page_size));
  }
  if (params.search !== undefined && params.search.length > 0) {
    searchParams.set("search", params.search);
  }
  if (params.is_enabled !== undefined) {
    searchParams.set("is_enabled", String(params.is_enabled));
  }

  const qs = searchParams.toString();
  return qs.length > 0 ? `?${qs}` : "";
};

export const dishApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /dishes/ — List dishes (paginated)
    listDishes: builder.query<DishListResponse, DishListParams>({
      query: (params) => ({
        url: `/dishes/${buildDishQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<DishListResponse>) => {
        const data = response.data ?? response;
        return {
          results: Array.isArray(data.results) ? data.results : [],
          pagination: data.pagination ?? {
            current_page: 1,
            total_pages: 1,
            total_items: 0,
            items_per_page: 10,
          },
        };
      },
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map(({ id }) => ({ type: "Dish" as const, id })),
              { type: "Dish", id: "LIST" },
            ]
          : [{ type: "Dish", id: "LIST" }],
    }),

    // GET /dishes/{id}/ — Get single dish
    getDish: builder.query<Dish, number>({
      query: (id) => ({
        url: `/dishes/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Dish>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Dish", id }],
    }),

    // POST /dishes/ — Create a dish
    createDish: builder.mutation<Dish, DishCreatePayload>({
      query: (data) => ({
        url: "/dishes/",
        method: "POST",
        body: buildDishFormData(data),
        formData: true,
      }),
      transformResponse: (response: ApiResponse<Dish>) => response.data,
      invalidatesTags: [{ type: "Dish", id: "LIST" }],
    }),

    // PATCH /dishes/{id}/ — Partial update
    updateDish: builder.mutation<Dish, { id: number; data: DishUpdatePayload }>({
      query: ({ id, data }) => {
        const hasPhotos = data.photos !== undefined && data.photos.length > 0;

        if (hasPhotos) {
          return {
            url: `/dishes/${id}/`,
            method: "PATCH",
            body: buildDishFormData(data),
            formData: true,
          };
        }

        // JSON body when no photos are being uploaded
        const jsonBody: Record<string, unknown> = {};
        if (data.name !== undefined) jsonBody.name = data.name;
        if (data.description !== undefined) jsonBody.description = data.description;
        if (data.price !== undefined) jsonBody.price = data.price;
        if (data.cost !== undefined) jsonBody.cost = data.cost;
        if (data.category !== undefined) jsonBody.category = data.category;
        if (data.preparation_time !== undefined) jsonBody.preparation_time = data.preparation_time;
        if (data.max_concurrent_orders !== undefined) jsonBody.max_concurrent_orders = data.max_concurrent_orders;
        if (data.ingredients !== undefined) jsonBody.ingredients = data.ingredients;
        if (data.nutritional_info !== undefined) jsonBody.nutritional_info = data.nutritional_info;

        return {
          url: `/dishes/${id}/`,
          method: "PATCH",
          body: jsonBody,
        };
      },
      transformResponse: (response: ApiResponse<Dish>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Dish", id },
        { type: "Dish", id: "LIST" },
      ],
    }),

    // DELETE /dishes/{id}/ — Soft delete
    deleteDish: builder.mutation<void, number>({
      query: (id) => ({
        url: `/dishes/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Dish", id },
        { type: "Dish", id: "LIST" },
      ],
    }),

    // PATCH /dishes/{id}/availability/ — Toggle availability
    toggleDishAvailability: builder.mutation<Dish, number>({
      query: (id) => ({
        url: `/dishes/${id}/availability/`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<Dish>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "Dish", id },
        { type: "Dish", id: "LIST" },
      ],
    }),

    // GET /dishes/ingredients/ — List available ingredients
    listDishIngredients: builder.query<DishIngredientsListResponse, string | void>({
      query: (search) => ({
        url: `/dishes/ingredients/${search ? `?search=${encodeURIComponent(search)}` : ""}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<DishIngredientsListResponse>) => response.data,
    }),
  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useListDishesQuery,
  useGetDishQuery,
  useCreateDishMutation,
  useUpdateDishMutation,
  useDeleteDishMutation,
  useToggleDishAvailabilityMutation,
  useListDishIngredientsQuery,
} = dishApi;
