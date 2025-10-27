import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Header } from "@/components/common/header";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { useTranslation } from "@/hooks/useTranslation";

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

const getStatusConfig = (status: Order["status"], t: any): StatusStyle => {
  switch (status) {
    case "pending":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        icon: "#f59e0b",
        label: t("orders:status.pending"),
      };
    case "preparing":
      return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: "#3b82f6",
        label: t("orders:status.preparing"),
      };
    case "ready":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "#10b981",
        label: t("orders:status.ready"),
      };
    case "completed":
      return {
        bg: "bg-gray-50",
        text: "text-gray-700",
        icon: "#6b7280",
        label: t("orders:status.completed"),
      };
  }
};

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { t } = useTranslation("orders");
  const statusConfig = getStatusConfig(order.status, t);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-5 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 3,
      }}
      activeOpacity={0.7}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1.5">
            {order.orderNumber}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={14} color="#9CA3AF" />
            <Text className="text-sm text-gray-500 ml-1">{order.customerName}</Text>
          </View>
        </View>
        <View
          className={`${statusConfig.bg} px-4 py-2 rounded-full flex-row items-center`}
          style={{
            shadowColor: statusConfig.icon,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: statusConfig.icon }}
          />
          <Text className={`text-xs font-bold ${statusConfig.text} uppercase tracking-wide`}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 my-3" />

      {/* Footer */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center">
            <View className="w-9 h-9 bg-orange-50 rounded-xl items-center justify-center mr-2">
              <Ionicons name="fast-food-outline" size={16} color="#FF6347" />
            </View>
            <Text className="text-sm font-semibold text-gray-700">{t("card.itemsCount", { count: order.items })}</Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-2">
              <Ionicons name="time-outline" size={16} color="#3B82F6" />
            </View>
            <Text className="text-sm font-semibold text-gray-700">{order.time}</Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-primary-500">{order.total}</Text>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen: React.FC = () => {
  const { t } = useTranslation("orders");
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
          title={t("header.title")}
          subtitle={t("header.subtitle")}
          notificationCount={5}
          rightAction={{
            icon: "filter",
            onPress: () => console.log("Filter pressed"),
          }}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        {/* Stats Cards */}
        <View className="px-5 pt-4 pb-2">
          <View className="flex-row gap-3 mb-4">
            <View
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="receipt-outline" size={20} color="#FF6347" />
                <Text className="text-2xl font-bold text-primary-500">12</Text>
              </View>
              <Text className="text-xs text-gray-600">{t("stats.activeOrders")}</Text>
            </View>
            <View
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="cash-outline" size={20} color="#10B981" />
                <Text className="text-2xl font-bold text-green-600">€342</Text>
              </View>
              <Text className="text-xs text-gray-600">{t("stats.todayRevenue")}</Text>
            </View>
          </View>
        </View>

        <View className="px-5 pb-4">
          {/* Tabs */}
          <View
            className="bg-white rounded-2xl p-1.5 flex-row"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
          >
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedTab === "active"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedTab("active")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedTab === "active"
? "text-white"
: "text-gray-600"
                }`}
              >
                {t("filters.activeCount", { count: 3 })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedTab === "completed"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedTab("completed")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedTab === "completed"
? "text-white"
: "text-gray-600"
                }`}
              >
                {t("filters.completed")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Orders List */}
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
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
