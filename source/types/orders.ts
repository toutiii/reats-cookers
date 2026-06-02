export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "ready"
  | "delivering"
  | "completed"
  | "cancelled"
  | "not_accepted";

export type OrderCancelledBy = "cooker" | "customer" | "system";

export type ActiveOrderStatus = Extract<
  OrderStatus,
  "pending" | "accepted" | "preparing" | "ready"
>;

export type TerminalOrderStatus = Extract<
  OrderStatus,
  "completed" | "cancelled" | "not_accepted"
>;

export const ACTIVE_ORDER_STATUSES: readonly OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "delivering",
] as const;

export const TERMINAL_ORDER_STATUSES: readonly TerminalOrderStatus[] = [
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
  readonly id: number;
  readonly postal_code: string;
  readonly town: string;
}

export interface OrderDeliveryMan {
  readonly id: number;
  readonly firstname: string;
  readonly lastname: string;
}

export type OrderLineItemKind = "dish" | "drink";

export interface OrderDishItem {
  readonly id: number;
  readonly name: string;
  readonly category: "dish";
  readonly image: string | null;
  readonly quantity: number;
  readonly unit_price: number;
}

export interface OrderDrinkItem {
  readonly id: number;
  readonly name: string;
  readonly capacity: string;
  readonly image: string | null;
  readonly quantity: number;
  readonly unit_price: number;
}

export interface DisplayOrderLineItem {
  readonly id: number;
  readonly kind: OrderLineItemKind;
  readonly name: string;
  readonly image: string | null;
  readonly quantity: number;
  readonly unit_price: number;
  readonly line_total: number;
}

export interface Order {
  readonly id: number;
  readonly status: OrderStatus;
  readonly created: string;
  readonly accepted_date: string | null;
  readonly preparing_date: string | null;
  readonly ready_date: string | null;
  readonly delivering_date: string | null;
  readonly completed_date: string | null;
  readonly cancelled_date: string | null;
  readonly cancelled_by: OrderCancelledBy | null;
  readonly scheduled_delivery_date: string | null;
  readonly is_scheduled: boolean;
  readonly paid_date: string | null;
  readonly delivery_fees: number;
  readonly delivery_fees_bonus: number | null;
  readonly delivery_distance: number;
  readonly delivery_initial_distance: number | null;
  readonly rating: number | null;
  readonly comment: string | null;
  readonly customer: OrderCustomer;
  readonly address: OrderAddress;
  readonly delivery_man: OrderDeliveryMan | null;
  readonly dishes_items: readonly OrderDishItem[];
  readonly drinks_items: readonly OrderDrinkItem[];
  readonly items_count: number;
  readonly sub_total: number;
  readonly service_fees: number;
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
  readonly status?: ActiveOrderStatus;
}

export interface OrderListResponse {
  readonly results: readonly Order[];
  readonly pagination: OrderPagination;
}

export interface OrderHistoryParams {
  readonly page?: number;
  readonly page_size?: number;
  readonly status?: TerminalOrderStatus;
  readonly cancelled_by?: OrderCancelledBy;
  readonly start_date?: string;
  readonly end_date?: string;
}

export type OrderHistoryResponse = OrderListResponse;

export const SERVICE_FEES_RATE = 0.07;

export const computeServiceFees = (subTotal: number): number =>
  Math.round(subTotal * SERVICE_FEES_RATE * 100) / 100;
