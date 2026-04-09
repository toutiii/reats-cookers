import React, { useState, useMemo, useCallback } from "react";
import { ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/common/header";
import { Text } from "@/components/ui/text";
import { useTranslation } from "@/hooks/useTranslation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { ScheduledCard } from "./components/scheduled-card";
import type { ScheduledOrder } from "@/types/planning";

type PlanningTab = "today" | "upcoming" | "past";

// Mock data — will be replaced by API
const MOCK_ORDERS: ScheduledOrder[] = [
  {
    id: "SCH-001",
    orderNumber: "#1301",
    customerName: "Marie Dupont",
    customerPhone: "+33612345678",
    status: "pending_approval",
    items: [
      { id: "1", name: "Burger Signature", quantity: 2, price: 18.9 },
      { id: "3", name: "Salade César", quantity: 1, price: 14.9 },
    ],
    total: 52.7,
    scheduledDate: new Date().toISOString().split("T")[0],
    scheduledTime: "12:30",
    deliveryType: "pickup",
    notes: "Sans oignons sur les burgers",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    preparationTime: 20,
  },
  {
    id: "SCH-002",
    orderNumber: "#1302",
    customerName: "Paul Renard",
    customerPhone: "+33698765432",
    status: "confirmed",
    items: [
      { id: "2", name: "Pizza Margherita", quantity: 2, price: 24.5 },
      { id: "5", name: "Pizza Quattro", quantity: 1, price: 26.9 },
      { id: "7", name: "Jus d'Orange", quantity: 2, price: 5.5 },
    ],
    total: 86.9,
    scheduledDate: new Date().toISOString().split("T")[0],
    scheduledTime: "13:00",
    deliveryType: "delivery",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    preparationTime: 25,
  },
  {
    id: "SCH-003",
    orderNumber: "#1303",
    customerName: "Julie Martin",
    customerPhone: "+33634567890",
    status: "pending_approval",
    items: [
      { id: "6", name: "Burger Végétarien", quantity: 3, price: 16.5 },
    ],
    total: 49.5,
    scheduledDate: new Date().toISOString().split("T")[0],
    scheduledTime: "12:30",
    deliveryType: "pickup",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    preparationTime: 15,
  },
  {
    id: "SCH-004",
    orderNumber: "#1304",
    customerName: "Marc Leblanc",
    customerPhone: "+33645678901",
    status: "confirmed",
    items: [
      { id: "1", name: "Burger Signature", quantity: 1, price: 18.9 },
      { id: "8", name: "Limonade Maison", quantity: 1, price: 4.9 },
    ],
    total: 23.8,
    scheduledDate: getTomorrowDate(),
    scheduledTime: "12:00",
    deliveryType: "pickup",
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    preparationTime: 15,
  },
  {
    id: "SCH-005",
    orderNumber: "#1305",
    customerName: "Sophie Bernard",
    customerPhone: "+33656789012",
    status: "pending_approval",
    items: [
      { id: "2", name: "Pizza Margherita", quantity: 4, price: 24.5 },
      { id: "4", name: "Fondant Chocolat", quantity: 4, price: 12.5 },
    ],
    total: 148.0,
    scheduledDate: getTomorrowDate(),
    scheduledTime: "19:30",
    deliveryType: "delivery",
    notes: "Anniversaire — demande un mot sur le dessert",
    createdAt: new Date(Date.now() - 36000000).toISOString(),
    preparationTime: 30,
  },
];

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function formatDate(dateStr: string): string {
  const today = new Date().toISOString().split("T")[0];
  const tomorrow = getTomorrowDate();

  if (dateStr === today) return "Aujourd'hui";
  if (dateStr === tomorrow) return "Demain";

  const date = new Date(dateStr);
  return date.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

const PlanningScreen: React.FC = () => {
  const { t } = useTranslation("planning");
  const navigation = useNavigation<StackNavigation>();
  const [selectedTab, setSelectedTab] = useState<PlanningTab>("today");
  const [orders, setOrders] = useState<ScheduledOrder[]>(MOCK_ORDERS);

  const today = new Date().toISOString().split("T")[0];

  const filteredOrders = useMemo(() => {
    switch (selectedTab) {
      case "today":
        return orders
          .filter((o) => o.scheduledDate === today && o.status !== "rejected" && o.status !== "cancelled")
          .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
      case "upcoming":
        return orders
          .filter((o) => o.scheduledDate > today && o.status !== "rejected" && o.status !== "cancelled")
          .sort((a, b) =>
            a.scheduledDate === b.scheduledDate
              ? a.scheduledTime.localeCompare(b.scheduledTime)
              : a.scheduledDate.localeCompare(b.scheduledDate)
          );
      case "past":
        return orders
          .filter((o) => o.scheduledDate < today || o.status === "completed" || o.status === "rejected" || o.status === "cancelled")
          .sort((a, b) => b.scheduledDate.localeCompare(a.scheduledDate));
      default:
        return [];
    }
  }, [orders, selectedTab, today]);

  // Group orders by date for display
  const groupedOrders = useMemo(() => {
    const groups: { date: string; label: string; orders: ScheduledOrder[] }[] = [];
    let currentDate = "";

    filteredOrders.forEach((order) => {
      if (order.scheduledDate !== currentDate) {
        currentDate = order.scheduledDate;
        groups.push({
          date: currentDate,
          label: formatDate(currentDate),
          orders: [],
        });
      }
      groups[groups.length - 1].orders.push(order);
    });

    return groups;
  }, [filteredOrders]);

  const pendingCount = useMemo(
    () => orders.filter((o) => o.status === "pending_approval").length,
    [orders]
  );

  const todayCount = useMemo(
    () => orders.filter((o) => o.scheduledDate === today && o.status !== "rejected" && o.status !== "cancelled").length,
    [orders, today]
  );

  const upcomingCount = useMemo(
    () => orders.filter((o) => o.scheduledDate > today && o.status !== "rejected" && o.status !== "cancelled").length,
    [orders, today]
  );

  const handleAccept = useCallback(
    (orderId: string) => {
      const order = orders.find((o) => o.id === orderId);
      if (!order) return;

      Alert.alert(
        t("accept.title"),
        t("accept.message", { date: formatDate(order.scheduledDate), time: order.scheduledTime }),
        [
          { text: t("accept.cancel"), style: "cancel" },
          {
            text: t("accept.confirm"),
            onPress: () => {
              setOrders((prev) =>
                prev.map((o) =>
                  o.id === orderId ? { ...o, status: "confirmed" as const } : o
                )
              );
            },
          },
        ]
      );
    },
    [orders, t]
  );

  const handleReject = useCallback(
    (orderId: string) => {
      Alert.alert(t("reject.title"), t("reject.message"), [
        { text: t("reject.cancel"), style: "cancel" },
        {
          text: t("reject.confirm"),
          style: "destructive",
          onPress: () => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === orderId ? { ...o, status: "rejected" as const } : o
              )
            );
          },
        },
      ]);
    },
    [t]
  );

  const handlePress = useCallback((orderId: string) => {
    navigation.navigate("OrderDetailsScreen", { orderId });
  }, [navigation]);

  const tabs: { key: PlanningTab; labelKey: string; count: number }[] = [
    { key: "today", labelKey: "tabs.today", count: todayCount },
    { key: "upcoming", labelKey: "tabs.upcoming", count: upcomingCount },
    { key: "past", labelKey: "tabs.past", count: 0 },
  ];

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title={t("header.title")}
          subtitle={t("header.subtitle")}
          showNotifications={true}
          notificationCount={pendingCount}
        />

        {/* Stats */}
        <View className="px-5 pt-4 pb-2">
          <View className="flex-row gap-3">
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
                <Ionicons name="time-outline" size={20} color="#F97316" />
                <Text className="text-2xl font-bold text-orange-500">
                  {pendingCount}
                </Text>
              </View>
              <Text className="text-xs text-gray-600 font-body">
                {t("status.pending_approval")}
              </Text>
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
                <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                <Text className="text-2xl font-bold text-blue-500">
                  {todayCount}
                </Text>
              </View>
              <Text className="text-xs text-gray-600 font-body">
                {t("tabs.today")}
              </Text>
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
                <Ionicons name="trending-up-outline" size={20} color="#10B981" />
                <Text className="text-2xl font-bold text-green-500">
                  {upcomingCount}
                </Text>
              </View>
              <Text className="text-xs text-gray-600 font-body">
                {t("tabs.upcoming")}
              </Text>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="px-5 pb-3">
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
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
                  selectedTab === tab.key ? "bg-primary-500" : ""
                }`}
                onPress={() => setSelectedTab(tab.key)}
              >
                <Text
                  className={`font-semibold text-sm ${
                    selectedTab === tab.key ? "text-white" : "text-gray-600"
                  }`}
                >
                  {t(tab.labelKey)}
                </Text>
                {tab.count > 0 && (
                  <View
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full ${
                      selectedTab === tab.key ? "bg-white/30" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedTab === tab.key ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {tab.count}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Orders list */}
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {filteredOrders.length === 0 ? (
            <View className="items-center justify-center py-20">
              <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="calendar-outline" size={36} color="#D1D5DB" />
              </View>
              <Text className="text-lg font-bold text-gray-400 mb-1">
                {t("empty.title")}
              </Text>
              <Text className="text-sm text-gray-400 font-body">
                {t("empty.subtitle")}
              </Text>
            </View>
          ) : (
            groupedOrders.map((group) => (
              <View key={group.date} className="mb-2">
                <View className="flex-row items-center mb-3 mt-2">
                  <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
                  <Text className="text-sm font-bold text-gray-700">
                    {group.label}
                  </Text>
                  <Text className="text-xs text-gray-400 ml-2 font-body">
                    {group.orders.length} commande{group.orders.length > 1 ? "s" : ""}
                  </Text>
                </View>
                {group.orders.map((order, idx) => (
                  <ScheduledCard
                    key={order.id}
                    order={order}
                    index={idx}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onPress={handlePress}
                  />
                ))}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PlanningScreen;
