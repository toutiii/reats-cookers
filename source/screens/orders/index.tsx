import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Header } from "@/components/common/header";
import { useTranslation } from "@/hooks/useTranslation";
import { StackNavigation } from "@/types/navigation";
import type { Order } from "@/types/orders";
import {
  useListOrdersHistoryQuery,
  useListOrdersQuery,
} from "@/store/api/ordersApi";
import {
  ORDER_STATUS_DISPLAY,
  countOrderItems,
  formatCurrency,
  formatTime,
} from "@/utils/orders";

type OrdersTab = "active" | "history";

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const { t } = useTranslation("orders");
  const display = ORDER_STATUS_DISPLAY[order.status];
  const itemsCount = countOrderItems(order);
  const customerName = `${order.customer.firstname} ${order.customer.lastname}`.trim();

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
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1.5">
            {t("details.orderNumber", { number: order.id })}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="person-outline" size={14} color="#9CA3AF" />
            <Text className="text-sm text-gray-500 ml-1">{customerName}</Text>
          </View>
        </View>
        <View className={`${display.bg} px-4 py-2 rounded-full flex-row items-center`}>
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: display.dot }}
          />
          <Text className={`text-xs font-bold ${display.text} uppercase tracking-wide`}>
            {display.label}
          </Text>
        </View>
      </View>

      <View className="h-px bg-gray-100 my-3" />

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-4">
          <View className="flex-row items-center">
            <View className="w-9 h-9 bg-orange-50 rounded-xl items-center justify-center mr-2">
              <Ionicons name="fast-food-outline" size={16} color="#FF6347" />
            </View>
            <Text className="text-sm font-semibold text-gray-700">
              {t("card.items", { count: itemsCount })}
            </Text>
          </View>
          <View className="flex-row items-center">
            <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-2">
              <Ionicons name="time-outline" size={16} color="#3B82F6" />
            </View>
            <Text className="text-sm font-semibold text-gray-700">
              {formatTime(order.timestamps.created)}
            </Text>
          </View>
        </View>
        <Text className="text-2xl font-bold text-primary-500">
          {formatCurrency(order.total_amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <View className="flex-1 items-center justify-center py-20">
    <Ionicons name="receipt-outline" size={48} color="#D1D5DB" />
    <Text className="text-base text-gray-500 mt-3">{message}</Text>
  </View>
);

const LoadingState: React.FC = () => (
  <View className="flex-1 items-center justify-center py-20">
    <ActivityIndicator size="large" color="#FF6347" />
  </View>
);

const OrdersScreen: React.FC = () => {
  const { t } = useTranslation("orders");
  const navigation = useNavigation<StackNavigation>();
  const [selectedTab, setSelectedTab] = useState<OrdersTab>("active");

  const activeQuery = useListOrdersQuery(undefined, { skip: selectedTab !== "active" });
  const historyQuery = useListOrdersHistoryQuery(undefined, {
    skip: selectedTab !== "history",
  });

  const orders = useMemo<readonly Order[]>(
    () =>
      (selectedTab === "active"
        ? activeQuery.data?.results ?? []
        : historyQuery.data?.results ?? []),
    [selectedTab, activeQuery.data, historyQuery.data],
  );

  const todayRevenue = useMemo(
    () =>
      (activeQuery.data?.results ?? []).reduce(
        (sum, order) => sum + order.total_amount,
        0,
      ),
    [activeQuery.data],
  );

  const activeCount = activeQuery.data?.pagination.total_items ?? 0;
  const isLoading =
    selectedTab === "active"
? activeQuery.isLoading
: historyQuery.isLoading;
  const isFetching =
    selectedTab === "active"
? activeQuery.isFetching
: historyQuery.isFetching;

  const onRefresh = useCallback(() => {
    if (selectedTab === "active") {
      activeQuery.refetch();
    } else {
      historyQuery.refetch();
    }
  }, [selectedTab, activeQuery, historyQuery]);

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title={t("header.title")}
          subtitle={t("header.subtitle")}
          notificationCount={5}
          onNotificationPress={() => undefined}
        />

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
                <Text className="text-2xl font-bold text-primary-500">{activeCount}</Text>
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
                <Text className="text-2xl font-bold text-green-600">
                  {formatCurrency(todayRevenue)}
                </Text>
              </View>
              <Text className="text-xs text-gray-600">{t("stats.todayRevenue")}</Text>
            </View>
          </View>
        </View>

        <View className="px-5 pb-4">
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
                {t("filters.activeCount", { count: activeCount })}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedTab === "history"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedTab("history")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedTab === "history"
? "text-white"
: "text-gray-600"
                }`}
              >
                {t("filters.completed")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          className="flex-1 px-5 pt-5"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isFetching && !isLoading} onRefresh={onRefresh} />
          }
        >
          {isLoading
? (
            <LoadingState />
          )
: orders.length === 0
? (
            <EmptyState message={t("empty.message")} />
          )
: (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onPress={() =>
                  navigation.navigate("OrderDetailsScreen", { orderId: order.id })
                }
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrdersScreen;
