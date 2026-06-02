export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "delivering"
  | "completed"
  | "cancelled"
  | "not_accepted";

export const ACTIVE_ORDER_STATUSES: readonly OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "delivering",
] as const;

export const TERMINAL_ORDER_STATUSES: readonly OrderStatus[] = [
  "completed",
  "cancelled",
  "not_accepted",
] as const;

export const CANCELLABLE_ORDER_STATUSES: readonly OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
] as const;

export interface OrderCustomer {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
}

export interface OrderAddress {
  readonly postal_code: string;
  readonly city: string;
}

export type OrderLineItemKind = "dish" | "drink";

export interface OrderLineItem {
  readonly id: number;
  readonly name: string;
  readonly quantity: number;
  readonly unit_price: number;
  readonly image_url: string | null;
}

export interface DisplayOrderLineItem extends OrderLineItem {
  readonly kind: OrderLineItemKind;
  readonly line_total: number;
}

export interface OrderTimestamps {
  readonly created: string;
  readonly accepted_date: string | null;
  readonly preparing_date: string | null;
  readonly ready_date: string | null;
  readonly delivering_date: string | null;
  readonly completed_date: string | null;
  readonly cancelled_date: string | null;
}

export interface Order {
  readonly id: number;
  readonly status: OrderStatus;
  readonly timestamps: OrderTimestamps;
  readonly customer: OrderCustomer;
  readonly address: OrderAddress;
  readonly dishes: readonly OrderLineItem[];
  readonly drinks: readonly OrderLineItem[];
  readonly sub_total: number;
  readonly service_fees: number;
  readonly delivery_fees: number;
  readonly total_amount: number;
}

export interface OrderPagination {
  readonly current_page: number;
  readonly total_pages: number;
  readonly total_items: number;
  readonly items_per_page: number;
}

export interface OrderListParams {
  readonly page?: number;
  readonly page_size?: number;
  readonly status?: OrderStatus;
}

export interface OrderListResponse {
  readonly results: readonly Order[];
  readonly pagination: OrderPagination;
}

export interface OrderHistoryParams {
  readonly page?: number;
  readonly page_size?: number;
  readonly status?: Extract<OrderStatus, "completed" | "cancelled" | "not_accepted">;
  readonly start_date?: string;
  readonly end_date?: string;
}

export type OrderHistoryResponse = OrderListResponse;

export interface OrderCancelPayload {
  readonly reason?: string;
}

export const SERVICE_FEES_RATE = 0.07;

export const computeServiceFees = (subTotal: number): number =>
  Math.round(subTotal * SERVICE_FEES_RATE * 100) / 100;
