import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { useCountdown } from "@/hooks/useCountdown";
import { useTranslation } from "@/hooks/useTranslation";
import type { ScheduledOrder, ScheduledStatus } from "@/types/planning";

interface StatusConfig {
  bg: string;
  text: string;
  dot: string;
  label: string;
}

const getStatusConfig = (status: ScheduledStatus, t: any): StatusConfig => {
  const configs: Record<ScheduledStatus, StatusConfig> = {
    pending_approval: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      dot: "#F97316",
      label: t("status.pending_approval"),
    },
    confirmed: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      dot: "#3B82F6",
      label: t("status.confirmed"),
    },
    rejected: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "#EF4444",
      label: t("status.rejected"),
    },
    preparing: {
      bg: "bg-indigo-50",
      text: "text-indigo-700",
      dot: "#6366F1",
      label: t("status.preparing"),
    },
    ready: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "#10B981",
      label: t("status.ready"),
    },
    completed: {
      bg: "bg-gray-50",
      text: "text-gray-600",
      dot: "#9CA3AF",
      label: t("status.completed"),
    },
    cancelled: {
      bg: "bg-gray-50",
      text: "text-gray-500",
      dot: "#D1D5DB",
      label: t("status.cancelled"),
    },
  };
  return configs[status];
};

interface ScheduledCardProps {
  order: ScheduledOrder;
  index: number;
  onAccept: (orderId: string) => void;
  onReject: (orderId: string) => void;
  onPress: (orderId: string) => void;
}

export const ScheduledCard: React.FC<ScheduledCardProps> = ({
  order,
  index,
  onAccept,
  onReject,
  onPress,
}) => {
  const { t } = useTranslation("planning");
  const statusConfig = getStatusConfig(order.status, t);
  const countdown = useCountdown(
    order.scheduledDate,
    order.scheduledTime,
    order.preparationTime
  );

  const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const isPending = order.status === "pending_approval";

  return (
    <Animated.View entering={FadeInDown.delay(index * 80).duration(400)}>
      <TouchableOpacity
        onPress={() => onPress(order.id)}
        activeOpacity={0.7}
        className="bg-white rounded-2xl p-5 mb-3"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
          elevation: 3,
        }}
      >
        {/* Header: Status + Countdown */}
        <View className="flex-row items-center justify-between mb-3">
          <View
            className={`${statusConfig.bg} px-3 py-1.5 rounded-full flex-row items-center`}
          >
            <View
              className="w-2 h-2 rounded-full mr-1.5"
              style={{ backgroundColor: statusConfig.dot }}
            />
            <Text
              className={`text-xs font-bold ${statusConfig.text} uppercase tracking-wide`}
            >
              {statusConfig.label}
            </Text>
          </View>

          <View
            className={`px-3 py-1.5 rounded-full ${
              countdown.isUrgent ? "bg-red-50" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-xs font-bold ${
                countdown.isUrgent ? "text-red-600" : "text-gray-600"
              }`}
            >
              {countdown.label}
            </Text>
          </View>
        </View>

        {/* Order info */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900">
              {order.orderNumber}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="person-outline" size={14} color="#9CA3AF" />
              <Text className="text-sm text-gray-500 ml-1 font-body">
                {order.customerName}
              </Text>
            </View>
          </View>
          <Text className="text-xl font-bold text-primary-500">
            {order.total.toFixed(2)}€
          </Text>
        </View>

        {/* Schedule info */}
        <View className="bg-gray-50 rounded-xl p-3 mb-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-2.5">
                <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
              </View>
              <View>
                <Text className="text-xs text-gray-500 font-body">
                  {t("card.scheduledFor")}
                </Text>
                <Text className="text-sm font-bold text-gray-900 font-body">
                  {order.scheduledDate} · {order.scheduledTime}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-2.5">
                <Ionicons
                  name={
                    order.deliveryType === "pickup"
                      ? "storefront-outline"
                      : "bicycle-outline"
                  }
                  size={16}
                  color="#F97316"
                />
              </View>
              <Text className="text-xs font-semibold text-gray-600 font-body">
                {t(`card.${order.deliveryType}`)}
              </Text>
            </View>
          </View>
        </View>

        {/* Items summary */}
        <View className="flex-row items-center mb-1">
          <Ionicons name="fast-food-outline" size={14} color="#9CA3AF" />
          <Text className="text-sm text-gray-500 ml-1.5 font-body">
            {t("card.items", { count: itemsCount })}
            {" · "}
            {order.items.map((item) => `${item.name} ×${item.quantity}`).join(", ")}
          </Text>
        </View>

        {/* Prep time indicator */}
        {countdown.isPrepTime && !countdown.isPast && order.status === "confirmed" && (
          <View className="bg-orange-50 rounded-xl p-2.5 mt-3 flex-row items-center">
            <Ionicons name="flame" size={16} color="#F97316" />
            <Text className="text-sm font-bold text-orange-700 ml-2 font-body">
              {t("card.startPrepNow")}
            </Text>
          </View>
        )}

        {!countdown.isPrepTime && order.status === "confirmed" && (
          <View className="bg-blue-50 rounded-xl p-2.5 mt-3 flex-row items-center">
            <Ionicons name="time-outline" size={16} color="#3B82F6" />
            <Text className="text-sm text-blue-700 ml-2 font-body">
              {t("card.startPrepIn", { time: countdown.label.replace("Dans ", "") })}
            </Text>
          </View>
        )}

        {/* Accept/Reject buttons for pending orders */}
        {isPending && (
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={() => onReject(order.id)}
              className="flex-1 py-3 rounded-xl border border-red-200 bg-red-50 flex-row items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={18} color="#EF4444" />
              <Text className="ml-2 font-bold text-sm text-red-600">
                {t("actions.reject")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => onAccept(order.id)}
              className="flex-1 py-3 rounded-xl bg-green-500 flex-row items-center justify-center"
              activeOpacity={0.7}
              style={{
                shadowColor: "#10B981",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="checkmark" size={18} color="#fff" />
              <Text className="ml-2 font-bold text-sm text-white">
                {t("actions.accept")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
