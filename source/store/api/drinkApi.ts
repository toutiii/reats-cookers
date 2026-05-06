import { Platform } from "react-native";
import { baseApi } from "./baseApi";
import type { ApiResponse } from "./types";
import type {
  Drink,
  DrinkCreatePayload,
  DrinkUpdatePayload,
  DrinkListParams,
  DrinkListResponse,
  DrinkIngredientsListResponse,
} from "@/types/drink";

// Build multipart/form-data for drink create/update
const buildDrinkFormData = (
  data: DrinkCreatePayload | DrinkUpdatePayload,
): globalThis.FormData => {
  const formData = new globalThis.FormData();

  // create-only fields (cooker / country / unit are immutable on PATCH)
  if ("cooker" in data && (data as DrinkCreatePayload).cooker !== undefined) {
    formData.append("cooker", String((data as DrinkCreatePayload).cooker));
  }
  if ("country" in data && (data as DrinkCreatePayload).country !== undefined) {
    formData.append("country", (data as DrinkCreatePayload).country);
  }
  if ("unit" in data && (data as DrinkCreatePayload).unit !== undefined) {
    formData.append("unit", (data as DrinkCreatePayload).unit);
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
  if (data.capacity !== undefined) {
    formData.append("capacity", String(data.capacity));
  }
  if (data.is_suitable_for_quick_delivery !== undefined) {
    formData.append(
      "is_suitable_for_quick_delivery",
      String(data.is_suitable_for_quick_delivery),
    );
  }
  if (data.is_suitable_for_scheduled_delivery !== undefined) {
    formData.append(
      "is_suitable_for_scheduled_delivery",
      String(data.is_suitable_for_scheduled_delivery),
    );
  }
  // is_enabled — only relevant on PATCH (not on create per Swagger), but harmless if backend ignores it on POST
  if ((data as DrinkUpdatePayload).is_enabled !== undefined) {
    formData.append("is_enabled", String((data as DrinkUpdatePayload).is_enabled));
  }

  // Ingredients as JSON-stringified array
  if (data.ingredients !== undefined) {
    formData.append("ingredients", JSON.stringify(data.ingredients));
  }

  // Nutritional info as JSON-stringified object
  if (data.nutritional_info !== undefined) {
    formData.append("nutritional_info", JSON.stringify(data.nutritional_info));
  }

  // Photo files: only send local URIs. Already-uploaded URLs are skipped.
  if (data.photos !== undefined) {
    data.photos.forEach((uri, index) => {
      if (uri.startsWith("http://") || uri.startsWith("https://")) return;

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
const buildDrinkQueryString = (params: DrinkListParams): string => {
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

export const drinkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /drinks/ — List drinks (paginated)
    listDrinks: builder.query<DrinkListResponse, DrinkListParams>({
      query: (params) => ({
        url: `/drinks/${buildDrinkQueryString(params)}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<DrinkListResponse>) => {
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
              ...result.results.map(({ id }) => ({ type: "Drink" as const, id })),
              { type: "Drink", id: "LIST" },
            ]
          : [{ type: "Drink", id: "LIST" }],
    }),

    // GET /drinks/{id}/ — Get single drink
    getDrink: builder.query<Drink, number>({
      query: (id) => ({
        url: `/drinks/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Drink>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Drink", id }],
    }),

    // POST /drinks/ — Create a drink
    createDrink: builder.mutation<Drink, DrinkCreatePayload>({
      query: (data) => ({
        url: "/drinks/",
        method: "POST",
        body: buildDrinkFormData(data),
        formData: true,
      }),
      transformResponse: (response: ApiResponse<Drink>) => response.data,
      invalidatesTags: [{ type: "Drink", id: "LIST" }],
    }),

    // PATCH /drinks/{id}/ — Partial update
    updateDrink: builder.mutation<Drink, { id: number; data: DrinkUpdatePayload }>({
      query: ({ id, data }) => {
        // Multipart only if at least one NEW local photo URI is present.
        const hasNewPhotos =
          data.photos !== undefined &&
          data.photos.some(
            (uri) => !uri.startsWith("http://") && !uri.startsWith("https://"),
          );

        if (hasNewPhotos) {
          return {
            url: `/drinks/${id}/`,
            method: "PATCH",
            body: buildDrinkFormData(data),
            formData: true,
          };
        }

        // JSON body when no photos are being uploaded
        const jsonBody: Record<string, unknown> = {};
        if (data.is_enabled !== undefined) jsonBody.is_enabled = data.is_enabled;
        if (data.name !== undefined) jsonBody.name = data.name;
        if (data.description !== undefined) jsonBody.description = data.description;
        if (data.price !== undefined) jsonBody.price = data.price;
        if (data.capacity !== undefined) jsonBody.capacity = data.capacity;
        if (data.is_suitable_for_quick_delivery !== undefined) {
          jsonBody.is_suitable_for_quick_delivery = data.is_suitable_for_quick_delivery;
        }
        if (data.is_suitable_for_scheduled_delivery !== undefined) {
          jsonBody.is_suitable_for_scheduled_delivery = data.is_suitable_for_scheduled_delivery;
        }
        if (data.ingredients !== undefined) jsonBody.ingredients = data.ingredients;
        if (data.nutritional_info !== undefined) jsonBody.nutritional_info = data.nutritional_info;

        return {
          url: `/drinks/${id}/`,
          method: "PATCH",
          body: jsonBody,
        };
      },
      transformResponse: (response: ApiResponse<Drink>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Drink", id },
        { type: "Drink", id: "LIST" },
      ],
    }),

    // DELETE /drinks/{id}/ — Soft delete
    deleteDrink: builder.mutation<void, number>({
      query: (id) => ({
        url: `/drinks/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Drink", id },
        { type: "Drink", id: "LIST" },
      ],
    }),

    // PATCH /drinks/{id}/availability/ — Toggle availability
    toggleDrinkAvailability: builder.mutation<Drink, number>({
      query: (id) => ({
        url: `/drinks/${id}/availability/`,
        method: "PATCH",
      }),
      transformResponse: (response: ApiResponse<Drink>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "Drink", id },
        { type: "Drink", id: "LIST" },
      ],
    }),

    // GET /drinks/ingredients/ — List available drink ingredients
    listDrinkIngredients: builder.query<DrinkIngredientsListResponse, string | void>({
      query: (search) => ({
        url: `/drinks/ingredients/${search ? `?search=${encodeURIComponent(search)}` : ""}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<DrinkIngredientsListResponse>) => response.data,
    }),
  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useListDrinksQuery,
  useGetDrinkQuery,
  useCreateDrinkMutation,
  useUpdateDrinkMutation,
  useDeleteDrinkMutation,
  useToggleDrinkAvailabilityMutation,
  useListDrinkIngredientsQuery,
} = drinkApi;
