import React from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import type { AllergenDetectionResult } from "@/services/allergen-detector";

interface Allergen {
  id: string;
  name: string;
  icon: string;
}

interface AllergensSectionProps {
  allergens: Allergen[];
  selectedAllergens: string[];
  suggestedAllergens?: AllergenDetectionResult[]; // AI-detected allergens
  onToggleAllergen: (_allergenId: string) => void;
  onApplyAllSuggestions?: () => void; // Auto-apply all high-confidence suggestions
}

/**
 * Dedicated section for allergen selection
 * Displays allergen chips with visual feedback for selection state
 */
export const AllergensSection: React.FC<AllergensSectionProps> = ({
  allergens,
  selectedAllergens,
  suggestedAllergens = [],
  onToggleAllergen,
  onApplyAllSuggestions,
}) => {
  // Create a map of suggested allergen IDs for quick lookup
  const suggestedIds = new Set(suggestedAllergens.map((s) => s.allergenId));
  const highConfidenceSuggestions = suggestedAllergens.filter(
    (s) => s.confidence === "high"
  );
  return (
    <Animated.View entering={FadeIn.delay(350).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-red-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Allergènes</Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        {/* AI Suggestions Banner */}
        {suggestedAllergens.length > 0 && (
          <View className="mb-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-row items-center flex-1">
                <MaterialIcons name="auto-awesome" size={18} color="#2563EB" />
                <Text className="ml-2 text-sm font-semibold text-blue-700">
                  IA : {suggestedAllergens.length} allergène{suggestedAllergens.length > 1
                    ? "s"
                    : ""} détecté{suggestedAllergens.length > 1
                    ? "s"
                    : ""}
                </Text>
              </View>
              {onApplyAllSuggestions && highConfidenceSuggestions.length > 0 && (
                <TouchableOpacity
                  onPress={onApplyAllSuggestions}
                  className="bg-blue-600 px-3 py-1.5 rounded-lg"
                  activeOpacity={0.7}
                >
                  <Text className="text-xs font-semibold text-white">
                    Tout appliquer
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <Text className="text-xs text-blue-600">
              Basé sur les ingrédients sélectionnés
            </Text>
          </View>
        )}

        <Text className="text-xs mb-3 uppercase tracking-wide">
          Sélectionnez les allergènes présents dans ce plat
        </Text>

        <View className="flex-row flex-wrap -mx-1">
          {allergens.map((allergen) => {
            const isSelected = selectedAllergens.includes(allergen.id);
            const isSuggested = suggestedIds.has(allergen.id);
            const suggestion = suggestedAllergens.find(
              (s) => s.allergenId === allergen.id
            );

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
                      : isSuggested
                      ? "bg-blue-50 border-2 border-blue-400"
                      : "bg-gray-50 border border-gray-200"
                  }`}
                >
                  {/* AI Badge for suggested allergens */}
                  {isSuggested && !isSelected && (
                    <View className="mr-1">
                      <MaterialIcons
                        name="auto-awesome"
                        size={14}
                        color="#2563EB"
                      />
                    </View>
                  )}

                  <MaterialIcons
                    name={allergen.icon as any}
                    size={18}
                    color={isSelected
                      ? "#DC2626"
                      : isSuggested
                      ? "#2563EB"
                      : "#6B7280"}
                  />
                  <Text
                    className={`ml-2 text-sm ${
                      isSelected
                        ? "text-red-700 font-semibold"
                        : isSuggested
                        ? "text-blue-700 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {allergen.name}
                  </Text>

                  {/* Confidence indicator */}
                  {isSuggested && !isSelected && suggestion && (
                    <View className="ml-1">
                      <View
                        className={`w-1.5 h-1.5 rounded-full ${
                          suggestion.confidence === "high"
                            ? "bg-green-500"
                            : suggestion.confidence === "medium"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </View>
                  )}
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
