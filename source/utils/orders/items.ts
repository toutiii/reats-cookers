import type { DisplayOrderLineItem, Order } from "@/types/orders";

export const mergeOrderLineItems = (order: Order): DisplayOrderLineItem[] => {
  const dishes: DisplayOrderLineItem[] = order.dishes.map((item) => ({
    ...item,
    kind: "dish",
    line_total: item.unit_price * item.quantity,
  }));

  const drinks: DisplayOrderLineItem[] = order.drinks.map((item) => ({
    ...item,
    kind: "drink",
    line_total: item.unit_price * item.quantity,
  }));

  return [...dishes, ...drinks];
};

export const countOrderItems = (order: Order): number =>
  order.dishes.reduce((sum, item) => sum + item.quantity, 0) +
  order.drinks.reduce((sum, item) => sum + item.quantity, 0);
