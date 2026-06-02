import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { formatCurrency } from "@/utils/orders";

interface PaymentSummaryProps {
  subTotal: number;
  serviceFees: number;
  deliveryFees: number;
  totalAmount: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  subTotal,
  serviceFees,
  deliveryFees,
  totalAmount,
}) => {
  return (
    <View className="px-5 mb-4">
      <Text className="text-lg font-bold mb-3">Payment summary</Text>
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
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-gray-600">Subtotal</Text>
          <Text className="text-sm">{formatCurrency(subTotal)}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-gray-600">Service fees (7%)</Text>
          <Text className="text-sm">{formatCurrency(serviceFees)}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-sm text-gray-600">Delivery fees</Text>
          <Text
            className={
              deliveryFees === 0
? "text-sm text-green-600 font-semibold"
: "text-sm"
            }
          >
            {deliveryFees === 0
? "FREE"
: formatCurrency(deliveryFees)}
          </Text>
        </View>
        <View className="h-px bg-gray-200 my-2" />
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-bold">Total</Text>
          <Text className="text-xl font-bold text-orange-500">
            {formatCurrency(totalAmount)}
          </Text>
        </View>
      </View>
    </View>
  );
};
