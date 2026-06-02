import React from "react";
import { Image, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import type { DisplayOrderLineItem } from "@/types/orders";
import { formatCurrency } from "@/utils/orders";

interface OrderItemsListProps {
  items: readonly DisplayOrderLineItem[];
}

export const OrderItemsList: React.FC<OrderItemsListProps> = ({ items }) => {
  return (
    <View className="px-5 mb-4">
      <Text className="text-lg font-bold mb-3">Order items</Text>
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
          <View key={`${item.kind}-${item.id}`}>
            <View className="flex-row items-center py-3">
              <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center mr-3 overflow-hidden">
                {item.image
? (
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )
: (
                  <Feather
                    name={item.kind === "drink"
? "coffee"
: "shopping-bag"}
                    size={22}
                    color="#f97316"
                  />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-base font-semibold">{item.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {formatCurrency(item.unit_price)} × {item.quantity}
                </Text>
              </View>
              <Text className="text-base font-bold">{formatCurrency(item.line_total)}</Text>
            </View>
            {index < items.length - 1 && <View className="h-px bg-gray-100" />}
          </View>
        ))}
      </View>
    </View>
  );
};
