import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface CustomerInfoProps {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  notes?: string;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({
  customerName,
  customerPhone,
  customerAddress,
  notes,
}) => {
  return (
    <View className="px-5 mb-4">
      <View
        className="bg-white rounded-2xl p-5"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center mb-4">
          <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mr-3">
            <Feather name="user" size={20} color="#f97316" />
          </View>
          <View className="flex-1">
            <Text className="text-base font-bold">
              {customerName}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">Customer</Text>
          </View>
        </View>

        <View className="space-y-3">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
              <Feather name="phone" size={16} color="#6b7280" />
            </View>
            <Text className="text-sm text-gray-700">{customerPhone}</Text>
          </View>

          <View className="flex-row items-start">
            <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
              <Feather name="map-pin" size={16} color="#6b7280" />
            </View>
            <Text className="text-sm text-gray-700 flex-1">
              {customerAddress}
            </Text>
          </View>

          {notes && (
            <View className="flex-row items-start">
              <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                <Feather name="message-circle" size={16} color="#6b7280" />
              </View>
              <Text className="text-sm text-gray-700 flex-1">{notes}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
