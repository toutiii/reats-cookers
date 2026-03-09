import React from "react";
import { View, TextInput } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

interface AdditionalInfoSectionProps {
  preparationTime: string;
  description: string;
  maxConcurrentOrders: string;
  errors: {
    preparationTime?: string;
    maxConcurrentOrders?: string;
  };
  onPreparationTimeChange: (_text: string) => void;
  onDescriptionChange: (_text: string) => void;
  onMaxConcurrentOrdersChange: (_text: string) => void;
}

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  preparationTime,
  description,
  maxConcurrentOrders,
  errors,
  onPreparationTimeChange,
  onDescriptionChange,
  onMaxConcurrentOrdersChange,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(400).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Informations complémentaires</Text>
      </View>

      <View className="bg-white rounded-2xl p-4 space-y-4">
        {/* Preparation Time & Max Orders */}
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
              Temps de préparation (min) *
            </Text>
            <TextInput
              value={preparationTime}
              onChangeText={onPreparationTimeChange}
              placeholder="15"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              className={`bg-gray-50 rounded-xl px-4 py-3 font-body ${
                errors.preparationTime
? "border border-red-300"
: ""
              }`}
            />
            {errors.preparationTime && (
              <Text className="text-red-500 text-xs mt-1">{errors.preparationTime}</Text>
            )}
          </View>

          <View className="flex-1">
            <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
              Commandes max en cours *
            </Text>
            <TextInput
              value={maxConcurrentOrders}
              onChangeText={onMaxConcurrentOrdersChange}
              placeholder="5"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              className={`bg-gray-50 rounded-xl px-4 py-3 font-body ${
                errors.maxConcurrentOrders
? "border border-red-300"
: ""
              }`}
            />
            {errors.maxConcurrentOrders && (
              <Text className="text-red-500 text-xs mt-1">{errors.maxConcurrentOrders}</Text>
            )}
          </View>
        </View>

        {/* Description */}
        <View>
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={onDescriptionChange}
            placeholder="Description détaillée du plat..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            className="bg-gray-50 rounded-xl px-4 py-3 font-body text-gray-900"
            style={{ textAlignVertical: "top", minHeight: 100 }}
          />
        </View>

      </View>
    </Animated.View>
  );
};
