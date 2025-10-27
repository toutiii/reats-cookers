import React from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface PaymentSummaryProps {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  subtotal,
  tax,
  deliveryFee,
  total,
  paymentMethod,
}) => {
  return (
    <View className="px-5 mb-4">
      <Text className="text-lg font-bold mb-3">Payment Summary</Text>
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
        <View className="space-y-3">
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-600">Subtotal</Text>
            <Text className="text-sm">
              €{subtotal.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-600">Tax (10%)</Text>
            <Text className="text-sm">
              €{tax.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-sm text-gray-600">Delivery Fee</Text>
            <Text className="text-sm text-green-600 font-semibold">
              {deliveryFee === 0
? "FREE"
: `€${deliveryFee.toFixed(2)}`}
            </Text>
          </View>
          <View className="h-px bg-gray-200 my-2" />
          <View className="flex-row justify-between items-center">
            <Text className="text-base font-bold">Total</Text>
            <Text className="text-xl font-bold text-orange-500">
              €{total.toFixed(2)}
            </Text>
          </View>
          <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
            <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
              <Feather name="credit-card" size={16} color="#6b7280" />
            </View>
            <Text className="text-sm text-gray-700">{paymentMethod}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
