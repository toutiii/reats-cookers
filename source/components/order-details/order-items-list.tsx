import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  emoji: string;
  notes?: string;
}

interface OrderItemsListProps {
  items: OrderItem[];
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <View className="px-5 mb-4">
      <Text className="text-lg font-bold mb-3">Order Items</Text>
      <View
        className="bg-white rounded-2xl p-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        {items.map((item, index) => (
          <View key={item.id}>
            <View className="flex-row items-center py-3">
              <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center mr-3">
                <Text className="text-2xl">{item.emoji}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold">
                  {item.name}
                </Text>
                {item.notes && (
                  <Text className="text-xs text-gray-500 mt-1">
                    Note: {item.notes}
                  </Text>
                )}
                <Text className="text-sm text-gray-600 mt-1">
                  €{item.price.toFixed(2)} × {item.quantity}
                </Text>
              </View>
              <Text className="text-base font-bold">
                €{(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
            {index < items.length - 1 && (
              <View className="h-px bg-gray-100" />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
