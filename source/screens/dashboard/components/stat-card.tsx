import React from "react";
import { View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface StatCardProps {
  iconName: string;
  iconFamily?: "Feather" | "MaterialCommunityIcons";
  value: string;
  label: string;
  trend?: string;
  bgColor: string;
  iconColor: string;
}

/**
 * Stat Card Component
 * Displays a statistic with icon, value, label, and optional trend indicator
 */
export const StatCard: React.FC<StatCardProps> = ({
  iconName,
  iconFamily = "Feather",
  value,
  label,
  trend,
  bgColor,
  iconColor,
}) => {
  return (
    <View
      className="flex-1 bg-white rounded-2xl p-5"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {/* Icon and Trend Badge */}
      <View className="flex-row justify-between items-start mb-3">
        <View className={`w-12 h-12 ${bgColor} rounded-xl items-center justify-center`}>
          {iconFamily === "MaterialCommunityIcons" ? (
            <MaterialCommunityIcons name={iconName as any} size={22} color={iconColor} />
          ) : (
            <Feather name={iconName as any} size={22} color={iconColor} />
          )}
        </View>
        {trend && (
          <View className="bg-green-50 px-2.5 py-1 rounded-full flex-row items-center">
            <Feather name="trending-up" size={12} color="#10b981" />
            <Text className="text-green-600 text-xs font-semibold ml-1">{trend}</Text>
          </View>
        )}
      </View>

      {/* Value */}
      <Text className="text-3xl font-bold text-gray-900 mb-1">{value}</Text>

      {/* Label */}
      <Text className="text-gray-500 text-sm font-medium">{label}</Text>
    </View>
  );
};
