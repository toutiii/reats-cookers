import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface StatusConfig {
  bg: string;
  text: string;
  border: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

interface StatusCardProps {
  statusConfig: StatusConfig;
  orderTime: string;
  estimatedTime: string;
  currentStatus: string;
}

export const StatusCard: React.FC<StatusCardProps> = ({
  statusConfig,
  orderTime,
  estimatedTime,
  currentStatus,
}) => {
  const statusOrder = ["pending", "preparing", "ready", "completed"];
  const currentIndex = statusOrder.indexOf(currentStatus);

  return (
    <View className="px-5 pt-4">
      <View
        className={`${statusConfig.bg} ${statusConfig.border} border rounded-2xl p-5 mb-4`}
      >
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View className={`w-12 h-12 ${statusConfig.bg} rounded-full items-center justify-center mr-3`}>
              <Feather name={statusConfig.icon} size={24} color={statusConfig.text.replace("text-", "#")} />
            </View>
            <View>
              <Text className={`text-lg font-bold ${statusConfig.text}`}>
                {statusConfig.label}
              </Text>
              <Text className="text-sm text-gray-600 mt-1">
                Estimated: {estimatedTime}
              </Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-xs text-gray-500">Order Time</Text>
            <Text className="text-sm font-semibold mt-1">
              {orderTime}
            </Text>
          </View>
        </View>

        {/* Status Timeline */}
        <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-200">
          {statusOrder.map((status, index) => {
            const isActive = currentIndex >= index;
            const iconName =
              status === "pending"
? "clock" :
              status === "preparing"
? "loader" :
              status === "ready"
? "check-circle"
: "check";

            return (
              <View key={status} className="flex-1 items-center">
                <View
                  className={`w-8 h-8 rounded-full items-center justify-center ${
                    isActive
? "bg-orange-500"
: "bg-gray-200"
                  }`}
                >
                  <Feather
                    name={iconName}
                    size={16}
                    color={isActive
? "#ffffff"
: "#9ca3af"}
                  />
                </View>
                <Text
                  className={`text-xs mt-2 ${
                    isActive
? "font-semibold"
: "text-gray-400"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
