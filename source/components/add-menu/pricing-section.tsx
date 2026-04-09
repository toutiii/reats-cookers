import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

export type DeliveryType = "pickup" | "delivery" | "both";

interface PricingSectionProps {
  price: string;
  cost: string;
  deliveryType: DeliveryType;
  errors: {
    price?: string;
    cost?: string;
  };
  onPriceChange: (text: string) => void;
  onCostChange: (text: string) => void;
  onDeliveryTypeChange: (type: DeliveryType) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  price,
  cost,
  deliveryType,
  errors,
  onPriceChange,
  onCostChange,
  onDeliveryTypeChange,
}) => {
  const isPickup = deliveryType === "pickup" || deliveryType === "both";
  const isDelivery = deliveryType === "delivery" || deliveryType === "both";

  const toggleOption = (option: "pickup" | "delivery") => {
    if (option === "pickup") {
      if (isPickup && isDelivery) onDeliveryTypeChange("delivery");
      else if (isPickup) return; // au moins une option requise
      else if (isDelivery) onDeliveryTypeChange("both");
      else onDeliveryTypeChange("pickup");
    } else {
      if (isDelivery && isPickup) onDeliveryTypeChange("pickup");
      else if (isDelivery) return; // au moins une option requise
      else if (isPickup) onDeliveryTypeChange("both");
      else onDeliveryTypeChange("delivery");
    }
  };
  const calculateMargin = () => {
    const priceNum = parseFloat(price);
    const costNum = parseFloat(cost);
    if (priceNum > 0 && costNum > 0) {
      return ((priceNum - costNum) / priceNum * 100).toFixed(0);
    }
    return null;
  };

  const margin = calculateMargin();

  return (
    <Animated.View entering={FadeIn.delay(200).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Tarification</Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
              Prix de vente (€) *
            </Text>
            <TextInput
              value={price}
              onChangeText={onPriceChange}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
              className={`bg-gray-50 rounded-xl px-4 text-center font-semibold text-lg font-body ${
                errors.price
? "border border-red-300"
: ""
              }`}
              style={{ height: 48, lineHeight: 20 }}
            />
          </View>

          <View className="flex-1">
            <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
              Coût (€) *
            </Text>
            <TextInput
              value={cost}
              onChangeText={onCostChange}
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              keyboardType="decimal-pad"
              className={`bg-gray-50 rounded-xl px-4 text-center font-semibold text-lg font-body ${
                errors.cost
? "border border-red-300"
: ""
              }`}
              style={{ height: 48, lineHeight: 20 }}
            />
          </View>
        </View>

        {/* Margin Calculation */}
        {margin && (
          <View className="mt-4 bg-green-50 rounded-xl p-3">
            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-gray-700">Marge bénéficiaire</Text>
              <Text className="text-lg font-bold text-green-600">
                {margin}%
              </Text>
            </View>
          </View>
        )}

        {/* Delivery Options */}
        <View className="mt-4">
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Options de livraison
          </Text>
          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={() => toggleOption("pickup")}
              className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
                isPickup
                  ? "bg-primary-500"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <Ionicons
                name="storefront-outline"
                size={18}
                color={isPickup ? "#fff" : "#6B7280"}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  isPickup ? "text-white" : "text-gray-700"
                }`}
              >
                Sur place
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => toggleOption("delivery")}
              className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
                isDelivery
                  ? "bg-primary-500"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <Ionicons
                name="bicycle-outline"
                size={18}
                color={isDelivery ? "#fff" : "#6B7280"}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  isDelivery ? "text-white" : "text-gray-700"
                }`}
              >
                Livraison
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};
