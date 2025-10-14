import React from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

interface RevenueChartProps {
  selectedPeriod: string;
  onPeriodPress?: () => void;
}

/**
 * Revenue Chart Component
 * Displays total revenue with line chart and period selector
 */
export const RevenueChart: React.FC<RevenueChartProps> = ({ selectedPeriod, onPeriodPress }) => {
  const revenueData = {
    labels: ["10h", "11h", "12h", "13h", "14h", "15h", "16h"],
    datasets: [
      {
        data: [250, 320, 500, 420, 380, 450, 520],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(249, 115, 22, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(148, 163, 184, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: "#f97316",
      fill: "#ffffff",
    },
    propsForBackgroundLines: {
      strokeWidth: 0,
    },
  };

  return (
    <View
      className="bg-white rounded-3xl p-6 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <View>
          <Heading className="text-sm mb-2">Total Revenue</Heading>
          <Heading className="text-3xl font-bold">€2,241</Heading>
          <View className="flex-row items-center mt-2">
            <Feather name="trending-up" size={14} color="#10b981" />
            <Text className="text-green-600 text-sm font-semibold ml-1">+18% vs yesterday</Text>
          </View>
        </View>

        {/* Period Selector */}
        <TouchableOpacity
          className="bg-gray-50 rounded-xl px-4 py-2.5 flex-row items-center"
          onPress={onPeriodPress}
        >
          <Text className="text-gray-700 text-sm font-medium mr-1.5">{selectedPeriod}</Text>
          <Feather name="chevron-down" size={16} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Chart */}
      <View className="mt-2 -mx-2">
        <LineChart
          data={revenueData}
          width={Dimensions.get("window").width - 72}
          height={200}
          chartConfig={chartConfig}
          bezier
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
          style={{
            paddingRight: 0,
          }}
        />
      </View>
    </View>
  );
};
