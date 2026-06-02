import { baseApi } from "./baseApi";
import type { ApiResponse } from "./types";
import type {
  Order,
  OrderCancelPayload,
  OrderHistoryParams,
  OrderHistoryResponse,
  OrderListParams,
  OrderListResponse,
} from "@/types/orders";

const buildQueryString = (params: Record<string, string | number | undefined>): string => {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    const stringValue = String(value);
    if (stringValue.length === 0) return;
    search.set(key, stringValue);
  });

  const qs = search.toString();
  if (qs.length === 0) {
    return "";
  }
  return `?${qs}`;
};

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listOrders: builder.query<OrderListResponse, OrderListParams | void>({
      query: (params) => ({
        url: `/cookers-orders/${buildQueryString({
          page: params?.page,
          page_size: params?.page_size,
          status: params?.status,
        })}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<OrderListResponse>) => response.data,
      providesTags: (result) => {
        if (!result?.results) {
          return [{ type: "Order" as const, id: "LIST" }];
        }
        return [
          ...result.results.map(({ id }) => ({ type: "Order" as const, id })),
          { type: "Order" as const, id: "LIST" },
        ];
      },
    }),

    getOrder: builder.query<Order, number>({
      query: (id) => ({
        url: `/cookers-orders/${id}/`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Order>) => response.data,
      providesTags: (_result, _error, id) => [{ type: "Order" as const, id }],
    }),

    acceptOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/cookers-orders/${id}/accept/`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<Order>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "Order" as const, id },
        { type: "Order" as const, id: "LIST" },
      ],
    }),

    startOrderPreparation: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/cookers-orders/${id}/start-preparation/`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<Order>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "Order" as const, id },
        { type: "Order" as const, id: "LIST" },
      ],
    }),

    markOrderReady: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/cookers-orders/${id}/mark-ready/`,
        method: "POST",
      }),
      transformResponse: (response: ApiResponse<Order>) => response.data,
      invalidatesTags: (_result, _error, id) => [
        { type: "Order" as const, id },
        { type: "Order" as const, id: "LIST" },
      ],
    }),

    cancelOrder: builder.mutation<Order, { id: number; payload?: OrderCancelPayload }>({
      query: ({ id, payload }) => ({
        url: `/cookers-orders/${id}/cancel/`,
        method: "POST",
        body: payload ?? {},
      }),
      transformResponse: (response: ApiResponse<Order>) => response.data,
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Order" as const, id },
        { type: "Order" as const, id: "LIST" },
        { type: "OrderHistory" as const, id: "LIST" },
        { type: "Cooker" as const },
      ],
    }),

    listOrdersHistory: builder.query<OrderHistoryResponse, OrderHistoryParams | void>({
      query: (params) => ({
        url: `/cookers-orders-history/${buildQueryString({
          page: params?.page,
          page_size: params?.page_size,
          status: params?.status,
          start_date: params?.start_date,
          end_date: params?.end_date,
        })}`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<OrderHistoryResponse>) => response.data,
      providesTags: (result) => {
        if (!result?.results) {
          return [{ type: "OrderHistory" as const, id: "LIST" }];
        }
        return [
          ...result.results.map(({ id }) => ({ type: "OrderHistory" as const, id })),
          { type: "OrderHistory" as const, id: "LIST" },
        ];
      },
    }),
  }),
  overrideExisting: process.env.NODE_ENV === "development",
});

export const {
  useListOrdersQuery,
  useGetOrderQuery,
  useAcceptOrderMutation,
  useStartOrderPreparationMutation,
  useMarkOrderReadyMutation,
  useCancelOrderMutation,
  useListOrdersHistoryQuery,
} = ordersApi;
