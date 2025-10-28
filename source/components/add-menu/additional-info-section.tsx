import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeIn, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

interface Allergen {
  id: string;
  name: string;
  icon: string;
}

interface AdditionalInfoSectionProps {
  preparationTime: string;
  description: string;
  maxConcurrentOrders: string;
  allergens: Allergen[];
  selectedAllergens: string[];
  featured: boolean;
  errors: {
    preparationTime?: string;
    maxConcurrentOrders?: string;
  };
  onPreparationTimeChange: (text: string) => void;
  onDescriptionChange: (text: string) => void;
  onMaxConcurrentOrdersChange: (text: string) => void;
  onToggleAllergen: (allergenId: string) => void;
  onFeaturedChange: (value: boolean) => void;
}

export const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  preparationTime,
  description,
  maxConcurrentOrders,
  allergens,
  selectedAllergens,
  featured,
  errors,
  onPreparationTimeChange,
  onDescriptionChange,
  onMaxConcurrentOrdersChange,
  onToggleAllergen,
  onFeaturedChange,
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
              className={`bg-gray-50 rounded-xl px-4 py-3 ${
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
              className={`bg-gray-50 rounded-xl px-4 py-3 ${
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

        {/* Allergens */}
        <View>
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Allergènes
          </Text>
          <View className="flex-row flex-wrap -mx-1">
            {allergens.map((allergen) => {
              const isSelected = selectedAllergens.includes(allergen.id);
              return (
                <TouchableOpacity
                  key={allergen.id}
                  onPress={() => onToggleAllergen(allergen.id)}
                  className="px-1 mb-2"
                >
                  <View
                    className={`px-4 py-2 rounded-xl flex-row items-center ${
                      isSelected
? "bg-red-100 border border-red-300"
: "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <MaterialIcons
                      name={allergen.icon as any}
                      size={16}
                      color={isSelected
? "#DC2626"
: "#6B7280"}
                    />
                    <Text
                      className={`ml-2 text-sm ${
                        isSelected
? "text-red-700 font-semibold"
: "text-gray-600"
                      }`}
                    >
                      {allergen.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
            className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900"
            style={{ textAlignVertical: "top", minHeight: 100 }}
          />
        </View>

        {/* Featured Toggle */}
        <View className="flex-row items-center justify-between py-2">
          <View>
            <Text className="text-sm font-semibold">Mettre en avant</Text>
            <Text className="text-xs mt-0.5">Apparaîtra dans les suggestions</Text>
          </View>
          <TouchableOpacity
            onPress={() => onFeaturedChange(!featured)}
            className={`w-14 h-8 rounded-full p-1 ${
              featured
? "bg-yellow-500"
: "bg-gray-300"
            }`}
          >
            <Animated.View
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              style={useAnimatedStyle(() => ({
                transform: [{
                  translateX: withSpring(featured
? 22
: 0)
                }]
              }))}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
