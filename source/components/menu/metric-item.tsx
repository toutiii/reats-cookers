import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";

interface MetricItemProps {
  label: string;
  value: string;
  valueColor?: string;
  highlight?: boolean;
}

export const MetricItem: React.FC<MetricItemProps> = React.memo(
  ({ label, value, valueColor, highlight }) => (
    <View>
      <Text className="text-xs text-gray-500">{label}</Text>
      <Text
        className={`text-sm font-semibold ${!valueColor && (highlight ? "text-red-600" : "text-gray-900")}`}
        style={valueColor ? { color: valueColor } : {}}
      >
        {value}
      </Text>
    </View>
  )
);

MetricItem.displayName = "MetricItem";
