import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import type { OrderStatus } from "@/types/orders";
import {
  ORDER_CANCEL_ACTION,
  ORDER_PRIMARY_ACTION,
  ORDER_STATUS_DISPLAY,
  isOrderCancellable,
  type OrderActionDescriptor,
} from "@/utils/orders";

interface ActionButtonsProps {
  status: OrderStatus;
  onAction: (_descriptor: OrderActionDescriptor) => void;
  isBusy?: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onAction, isBusy }) => {
  const primary = ORDER_PRIMARY_ACTION[status];
  const canCancel = isOrderCancellable(status);
  const display = ORDER_STATUS_DISPLAY[status];

  if (!primary && !canCancel) {
    return (
      <View className="px-5 pb-6">
        <View className="bg-gray-100 rounded-xl py-4 items-center">
          <Text className="text-gray-600 font-semibold">Order {display.label.toLowerCase()}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="px-5 pb-6">
      <View className="flex-row gap-3">
        {primary && (
          <TouchableOpacity
            onPress={() => onAction(primary)}
            disabled={isBusy}
            className={`flex-1 ${primary.buttonClass} rounded-xl py-4 items-center ${
              isBusy
? "opacity-60"
: ""
            }`}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center">
              {isBusy
? (
                <ActivityIndicator color="#ffffff" />
              )
: (
                <Feather name={primary.icon} size={20} color="#ffffff" />
              )}
              <Text className="text-white font-bold ml-2">{primary.label}</Text>
            </View>
          </TouchableOpacity>
        )}
        {canCancel && (
          <TouchableOpacity
            onPress={() => onAction(ORDER_CANCEL_ACTION)}
            disabled={isBusy}
            className={`bg-red-50 rounded-xl py-4 px-6 items-center ${
              isBusy
? "opacity-60"
: ""
            }`}
            activeOpacity={0.8}
          >
            <Feather name="x" size={20} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
