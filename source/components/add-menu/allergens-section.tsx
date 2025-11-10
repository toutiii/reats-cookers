import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

interface Allergen {
  id: string;
  name: string;
  icon: string;
}

interface AllergensSectionProps {
  allergens: Allergen[];
  selectedAllergens: string[];
  onToggleAllergen: (_allergenId: string) => void;
}

/**
 * Dedicated section for allergen selection
 * Displays allergen chips with visual feedback for selection state
 */
export const AllergensSection: React.FC<AllergensSectionProps> = ({
  allergens,
  selectedAllergens,
  onToggleAllergen,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(350).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-red-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Allergènes</Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        <Text className="text-xs mb-3 uppercase tracking-wide">
          Sélectionnez les allergènes présents dans ce plat
        </Text>

        <View className="flex-row flex-wrap -mx-1">
          {allergens.map((allergen) => {
            const isSelected = selectedAllergens.includes(allergen.id);
            return (
              <TouchableOpacity
                key={allergen.id}
                onPress={() => onToggleAllergen(allergen.id)}
                className="px-1 mb-2"
                activeOpacity={0.7}
              >
                <View
                  className={`px-4 py-2.5 rounded-xl flex-row items-center ${
                    isSelected
                      ? "bg-red-100 border border-red-300"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  <MaterialIcons
                    name={allergen.icon as any}
                    size={18}
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

        {/* Info message when allergens are selected */}
        {selectedAllergens.length > 0 && (
          <View className="mt-3 bg-red-50 rounded-lg p-3 flex-row items-start">
            <MaterialIcons name="info-outline" size={16} color="#DC2626" />
            <Text className="ml-2 text-xs text-red-700 flex-1">
              {selectedAllergens.length} allergène{selectedAllergens.length > 1
                ? "s"
                : ""} sélectionné{selectedAllergens.length > 1
                ? "s"
                : ""}. Ces informations seront affichées aux clients.
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
