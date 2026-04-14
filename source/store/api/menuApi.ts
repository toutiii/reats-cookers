import { Platform } from "react-native";
import { baseApi } from "./baseApi";
import type {
  ApiResponse,
  MenuItemCreateRequest,
  MenuItemResponse,
} from "./types";

const buildMenuItemFormData = (data: MenuItemCreateRequest): globalThis.FormData => {
  const formData = new globalThis.FormData();

  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("cost", String(data.cost));
  formData.append("category", data.category);
  formData.append("preparation_time", String(data.preparationTime));
  formData.append("max_concurrent_orders", String(data.maxConcurrentOrders));
  formData.append("available", String(data.available));
  formData.append("delivery_type", data.deliveryType);

  data.ingredients.forEach((ingredient) => {
    formData.append("ingredients", ingredient);
  });

  data.allergens.forEach((allergen) => {
    formData.append("allergens", allergen);
  });

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

  return formData;
};

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMenuItem: builder.mutation<ApiResponse<MenuItemResponse>, MenuItemCreateRequest>({
      query: (data) => {
        const body = buildMenuItemFormData(data);
        return {
          url: "/menu/items/",
          method: "POST",
          body,
          // Do NOT set Content-Type manually — React Native's fetch
          // auto-generates multipart/form-data with the correct boundary
          // when the body is a FormData instance
          formData: true,
        };
      },
      invalidatesTags: ["Menu"],
    }),
  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const { useCreateMenuItemMutation } = menuApi;
