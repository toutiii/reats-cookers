import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Header } from "@/components/common/header";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, change, isPositive }) => (
  <View
    className="bg-white rounded-2xl p-5 mb-4"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 2,
    }}
  >
    <View className="flex-row items-center justify-between mb-3">
      <View className="w-12 h-12 bg-orange-50 rounded-xl items-center justify-center">
        <Feather name={icon as any} size={20} color="#f97316" />
      </View>
      <View className={`px-3 py-1 rounded-full ${isPositive ? "bg-green-50" : "bg-red-50"}`}>
        <Text className={`text-xs font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {change}
        </Text>
      </View>
    </View>
    <Text className="text-3xl font-bold text-gray-900 mb-1">{value}</Text>
    <Text className="text-sm text-gray-500">{label}</Text>
  </View>
);

const AnalyticsScreen: React.FC = () => {
  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Header
          title="Analytics"
          subtitle="Performance overview"
          notificationCount={1}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

      {/* Stats */}
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {/* Revenue Stats */}
        <Heading className="text-lg font-bold mb-4">Revenue</Heading>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <StatCard
              icon="trending-up"
              label="Total Revenue"
              value="€12,450"
              change="+18%"
              isPositive={true}
            />
          </View>
          <View className="flex-1">
            <StatCard
              icon="dollar-sign"
              label="Avg Order Value"
              value="€32.50"
              change="+5%"
              isPositive={true}
            />
          </View>
        </View>

        {/* Orders Stats */}
        <Heading className="text-lg font-bold mb-4 mt-2">Orders</Heading>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <StatCard
              icon="shopping-bag"
              label="Total Orders"
              value="384"
              change="+12%"
              isPositive={true}
            />
          </View>
          <View className="flex-1">
            <StatCard
              icon="clock"
              label="Avg Prep Time"
              value="18 min"
              change="-8%"
              isPositive={true}
            />
          </View>
        </View>

        {/* Customer Stats */}
        <Heading className="text-lg font-bold mb-4 mt-2">Customers</Heading>
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1">
            <StatCard
              icon="users"
              label="Total Customers"
              value="1,248"
              change="+22%"
              isPositive={true}
            />
          </View>
          <View className="flex-1">
            <StatCard
              icon="repeat"
              label="Repeat Rate"
              value="68%"
              change="+3%"
              isPositive={true}
            />
          </View>
        </View>

        {/* Top Performing Items */}
        <Heading className="text-lg font-bold mb-4 mt-2">Top Items</Heading>
        <View
          className="bg-white rounded-2xl p-5 mb-8"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          {[
            { name: "Classic Burger", orders: 156, revenue: "€2,016" },
            { name: "Margherita Pizza", orders: 142, revenue: "€2,059" },
            { name: "Caesar Salad", orders: 98, revenue: "€970" },
          ].map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center justify-between ${
                index < 2 ? "pb-4 mb-4 border-b border-gray-100" : ""
              }`}
            >
              <View className="flex-1">
                <Text className="text-base font-semibold text-gray-900">{item.name}</Text>
                <Text className="text-sm text-gray-500 mt-1">{item.orders} orders</Text>
              </View>
              <Text className="text-lg font-bold text-orange-500">{item.revenue}</Text>
            </View>
          ))}
        </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default AnalyticsScreen;
