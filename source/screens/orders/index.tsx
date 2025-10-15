import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Header } from "@/components/common/header";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  items: number;
  total: string;
  status: "pending" | "preparing" | "ready" | "completed";
  time: string;
}

interface StatusStyle {
  bg: string;
  text: string;
  icon: string;
  label: string;
}

const getStatusConfig = (status: Order["status"]): StatusStyle => {
  switch (status) {
    case "pending":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        icon: "#f59e0b",
        label: "Pending",
      };
    case "preparing":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "#3b82f6",
        label: "Preparing",
      };
    case "ready":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "#10b981",
        label: "Ready",
      };
    case "completed":
      return {
        bg: "bg-gray-50",
        text: "text-gray-700",
        icon: "#6b7280",
        label: "Completed",
      };
  }
};

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const statusConfig = getStatusConfig(order.status);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mb-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">
            {order.orderNumber}
          </Text>
          <Text className="text-sm text-gray-500">{order.customerName}</Text>
        </View>
        <View className={`${statusConfig.bg} px-3 py-1.5 rounded-full`}>
          <Text className={`text-xs font-semibold ${statusConfig.text}`}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 my-3" />

      {/* Footer */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-2">
              <Feather name="shopping-bag" size={14} color="#6b7280" />
            </View>
            <Text className="text-sm text-gray-600">{order.items}</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-2">
              <Feather name="clock" size={14} color="#6b7280" />
            </View>
            <Text className="text-sm text-gray-600">{order.time}</Text>
          </View>
        </View>
        <Text className="text-xl font-bold text-orange-500">{order.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedTab, setSelectedTab] = useState<"active" | "completed">("active");

  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      orderNumber: "#1234",
      customerName: "John Doe",
      items: 4,
      total: "€51.52",
      status: "preparing",
      time: "10 min",
    },
    {
      id: "ORD-2024-002",
      orderNumber: "#1235",
      customerName: "Jane Smith",
      items: 3,
      total: "€33.00",
      status: "ready",
      time: "5 min",
    },
    {
      id: "ORD-2024-003",
      orderNumber: "#1236",
      customerName: "Bob Wilson",
      items: 3,
      total: "€48.67",
      status: "pending",
      time: "2 min",
    },
    {
      id: "ORD-2024-004",
      orderNumber: "#1237",
      customerName: "Alice Johnson",
      items: 2,
      total: "€34.84",
      status: "completed",
      time: "Delivered",
    },
  ];

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title="Orders"
          subtitle="Manage your orders"
          notificationCount={5}
          rightAction={{
            icon: "filter",
            onPress: () => console.log("Filter pressed"),
          }}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        <View className="px-5 pt-4 pb-4 bg-white border-b border-gray-100">

          {/* Tabs */}
          <View className="flex-row gap-3">
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedTab === "active" ? "bg-orange-500" : "bg-gray-100"
              }`}
              onPress={() => setSelectedTab("active")}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedTab === "active" ? "text-white" : "text-gray-600"
                }`}
              >
                Active (3)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedTab === "completed" ? "bg-orange-500" : "bg-gray-100"
              }`}
              onPress={() => setSelectedTab("completed")}
            >
              <Text
                className={`text-center font-semibold ${
                  selectedTab === "completed" ? "text-white" : "text-gray-600"
                }`}
              >
                Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders List */}
        <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={() => navigation.navigate("OrderDetailsScreen", { orderId: order.id })}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrdersScreen;
