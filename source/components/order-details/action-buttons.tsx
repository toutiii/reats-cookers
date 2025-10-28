import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

interface ActionButtonsProps {
  status: OrderStatus;
  onStatusChange: (newStatus: OrderStatus) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  status,
  onStatusChange,
}) => {
  return (
    <View className="px-5 pb-6">
      <View className="flex-row gap-3">
        {status !== "completed" && status !== "cancelled" && (
          <>
            {status === "pending" && (
              <TouchableOpacity
                onPress={() => onStatusChange("preparing")}
                className="flex-1 bg-orange-500 rounded-xl py-4 items-center"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <Feather name="loader" size={20} color="#ffffff" />
                  <Text className="text-white font-bold ml-2">Start Preparing</Text>
                </View>
              </TouchableOpacity>
            )}
            {status === "preparing" && (
              <TouchableOpacity
                onPress={() => onStatusChange("ready")}
                className="flex-1 bg-green-500 rounded-xl py-4 items-center"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <Feather name="check-circle" size={20} color="#ffffff" />
                  <Text className="text-white font-bold ml-2">Mark as Ready</Text>
                </View>
              </TouchableOpacity>
            )}
            {status === "ready" && (
              <TouchableOpacity
                onPress={() => onStatusChange("completed")}
                className="flex-1 bg-blue-500 rounded-xl py-4 items-center"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center">
                  <Feather name="check" size={20} color="#ffffff" />
                  <Text className="text-white font-bold ml-2">Complete Order</Text>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => onStatusChange("cancelled")}
              className="bg-red-50 rounded-xl py-4 px-6 items-center"
              activeOpacity={0.8}
            >
              <Feather name="x" size={20} color="#ef4444" />
            </TouchableOpacity>
          </>
        )}
        {(status === "completed" || status === "cancelled") && (
          <View className="flex-1 bg-gray-100 rounded-xl py-4 items-center">
            <Text className="text-gray-500 font-semibold">
              Order {status === "completed"
? "Completed"
: "Cancelled"}
            </Text>
          </View>
        )}
      </View>

      {/* Additional Actions */}
      <View className="flex-row gap-3 mt-3">
        <TouchableOpacity
          className="flex-1 bg-white border border-gray-200 rounded-xl py-4 items-center"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Feather name="phone" size={18} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Call Customer</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-white border border-gray-200 rounded-xl py-4 items-center"
          activeOpacity={0.8}
        >
          <View className="flex-row items-center">
            <Feather name="printer" size={18} color="#6b7280" />
            <Text className="text-gray-700 font-semibold ml-2">Print Receipt</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
