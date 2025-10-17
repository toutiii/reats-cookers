import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

export const LowStockBadge: React.FC = React.memo(() => (
  <View className="ml-2 px-2 py-1 bg-red-100 rounded-full">
    <Text className="text-xs font-semibold text-red-600">Capacité max</Text>
  </View>
));

LowStockBadge.displayName = "LowStockBadge";
