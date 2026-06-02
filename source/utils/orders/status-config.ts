import type { Feather } from "@expo/vector-icons";
import type { OrderStatus } from "@/types/orders";

export interface OrderStatusDisplay {
  readonly label: string;
  readonly bg: string;
  readonly text: string;
  readonly border: string;
  readonly dot: string;
  readonly icon: keyof typeof Feather.glyphMap;
}

export const ORDER_STATUS_DISPLAY: Readonly<Record<OrderStatus, OrderStatusDisplay>> = {
  pending: {
    label: "Pending",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    dot: "#f59e0b",
    icon: "clock",
  },
  accepted: {
    label: "Accepted",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "#6366f1",
    icon: "thumbs-up",
  },
  preparing: {
    label: "Preparing",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "#3b82f6",
    icon: "loader",
  },
  ready: {
    label: "Ready",
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    dot: "#10b981",
    icon: "check-circle",
  },
  delivering: {
    label: "Delivering",
    bg: "bg-orange-50",
    text: "text-orange-700",
    border: "border-orange-200",
    dot: "#f97316",
    icon: "truck",
  },
  completed: {
    label: "Completed",
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-200",
    dot: "#6b7280",
    icon: "check",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    dot: "#ef4444",
    icon: "x-circle",
  },
  not_accepted: {
    label: "Not accepted",
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "#f43f5e",
    icon: "slash",
  },
};

export const ORDER_PROGRESS_STEPS: readonly OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "delivering",
  "completed",
] as const;

export type OrderAction = "accept" | "start-preparation" | "mark-ready" | "cancel";

export interface OrderActionDescriptor {
  readonly action: OrderAction;
  readonly nextStatus: OrderStatus;
  readonly label: string;
  readonly icon: keyof typeof Feather.glyphMap;
  readonly buttonClass: string;
  readonly confirmTitle: string;
  readonly confirmMessage: string;
  readonly confirmCta: string;
}

const ACCEPT_ACTION: OrderActionDescriptor = {
  action: "accept",
  nextStatus: "accepted",
  label: "Accept order",
  icon: "thumbs-up",
  buttonClass: "bg-indigo-500",
  confirmTitle: "Accept order",
  confirmMessage:
    "Accepting this order confirms you can prepare it. The customer will be notified.",
  confirmCta: "Accept",
};

const START_PREPARATION_ACTION: OrderActionDescriptor = {
  action: "start-preparation",
  nextStatus: "preparing",
  label: "Start preparation",
  icon: "loader",
  buttonClass: "bg-blue-500",
  confirmTitle: "Start preparation",
  confirmMessage:
    "This will mark the order as being prepared. The customer will be notified.",
  confirmCta: "Start",
};

const MARK_READY_ACTION: OrderActionDescriptor = {
  action: "mark-ready",
  nextStatus: "ready",
  label: "Mark as ready",
  icon: "check-circle",
  buttonClass: "bg-green-500",
  confirmTitle: "Mark order ready",
  confirmMessage:
    "This will notify the courier that the order is ready for pickup.",
  confirmCta: "Mark ready",
};

const CANCEL_ACTION: OrderActionDescriptor = {
  action: "cancel",
  nextStatus: "cancelled",
  label: "Cancel order",
  icon: "x-circle",
  buttonClass: "bg-red-500",
  confirmTitle: "Cancel order",
  confirmMessage:
    "Cancelling refunds the customer in full and lowers your acceptance rate by 10 points. This cannot be undone.",
  confirmCta: "Cancel order",
};

export const ORDER_PRIMARY_ACTION: Readonly<Partial<Record<OrderStatus, OrderActionDescriptor>>> = {
  pending: ACCEPT_ACTION,
  accepted: START_PREPARATION_ACTION,
  preparing: MARK_READY_ACTION,
};

export const isOrderCancellable = (status: OrderStatus): boolean =>
  status === "pending" || status === "accepted" || status === "preparing";

export const ORDER_CANCEL_ACTION = CANCEL_ACTION;
