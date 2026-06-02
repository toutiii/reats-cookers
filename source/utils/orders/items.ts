import type { DisplayOrderLineItem, Order } from "@/types/orders";

export const mergeOrderLineItems = (order: Order): DisplayOrderLineItem[] => {
  const dishes: DisplayOrderLineItem[] = order.dishes_items.map((item) => ({
    id: item.id,
    kind: "dish",
    name: item.name,
    image: item.image,
    quantity: item.quantity,
    unit_price: item.unit_price,
    line_total: item.unit_price * item.quantity,
  }));

  const drinks: DisplayOrderLineItem[] = order.drinks_items.map((item) => {
    const displayName =
      item.capacity.length > 0
        ? `${item.name} (${item.capacity})`
        : item.name;

    return {
      id: item.id,
      kind: "drink",
      name: displayName,
      image: item.image,
      quantity: item.quantity,
      unit_price: item.unit_price,
      line_total: item.unit_price * item.quantity,
    };
  });

  return [...dishes, ...drinks];
};
