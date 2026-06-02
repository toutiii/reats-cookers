import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import type { OrderStatus } from "@/types/orders";
import {
  ORDER_PROGRESS_STEPS,
  ORDER_STATUS_DISPLAY,
} from "@/utils/orders";
import { formatTime } from "@/utils/orders";

interface StatusCardProps {
  status: OrderStatus;
  createdAt: string;
  lastTransitionAt: string | null;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  status,
  createdAt,
  lastTransitionAt,
}) => {
  const display = ORDER_STATUS_DISPLAY[status];
  const currentIndex = ORDER_PROGRESS_STEPS.indexOf(status);
  const isTerminalOffPath = currentIndex === -1;

  return (
    <View className="px-5 pt-4">
      <View className={`${display.bg} ${display.border} border rounded-2xl p-5 mb-4`}>
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center flex-1">
            <View className="w-12 h-12 bg-white/70 rounded-full items-center justify-center mr-3">
              <Feather name={display.icon} size={22} color={display.dot} />
            </View>
            <View className="flex-1">
              <Text className={`text-lg font-bold ${display.text}`}>{display.label}</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Last update: {formatTime(lastTransitionAt ?? createdAt)}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-500">Created</Text>
            <Text className="text-sm font-semibold mt-1">{formatTime(createdAt)}</Text>
          </View>
        </View>

        {!isTerminalOffPath && (
          <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-200">
            {ORDER_PROGRESS_STEPS.map((step, index) => {
              const isActive = currentIndex >= index;
              const stepDisplay = ORDER_STATUS_DISPLAY[step];

              return (
                <View key={step} className="flex-1 items-center">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      isActive
? "bg-orange-500"
: "bg-gray-200"
                    }`}
                  >
                    <Feather
                      name={stepDisplay.icon}
                      size={14}
                      color={isActive
? "#ffffff"
: "#9ca3af"}
                    />
                  </View>
                  <Text
                    className={`text-[10px] mt-2 ${
                      isActive
? "font-semibold text-gray-700"
: "text-gray-400"
                    }`}
                  >
                    {stepDisplay.label}
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};
