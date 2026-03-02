import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import type { RecipeNutrition, NutriScoreGrade } from "@/api/ingredients/types";

interface NutritionSectionProps {
  nutrition: RecipeNutrition | null;
  portions: number;
  onPortionsChange: (value: number) => void;
  ingredientCount: number;
  quantifiedCount: number;
}

const NUTRI_SCORE_COLORS: Record<NutriScoreGrade, string> = {
  A: "#038141",
  B: "#85BB2F",
  C: "#FECB02",
  D: "#EE8100",
  E: "#E63E11",
};

const NUTRI_SCORE_BG: Record<NutriScoreGrade, string> = {
  A: "bg-green-700",
  B: "bg-lime-500",
  C: "bg-yellow-400",
  D: "bg-orange-500",
  E: "bg-red-600",
};

const GRADES: NutriScoreGrade[] = ["A", "B", "C", "D", "E"];

export const NutritionSection: React.FC<NutritionSectionProps> = ({
  nutrition,
  portions,
  onPortionsChange,
  ingredientCount,
  quantifiedCount,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const missingQuantities = ingredientCount - quantifiedCount;

  return (
    <Animated.View entering={FadeIn.delay(375).duration(600)} className="mb-8">
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-green-500 rounded-full mr-2" />
        <Text className="text-base font-bold">
          Informations nutritionnelles
        </Text>
      </View>

      <View className="bg-white rounded-2xl p-4">
        {/* Info banner if some ingredients have no quantity */}
        {ingredientCount > 0 && missingQuantities > 0 && (
          <View className="mb-4 bg-amber-50 rounded-lg p-3 flex-row items-start border border-amber-200">
            <Ionicons
              name="information-circle-outline"
              size={18}
              color="#D97706"
            />
            <Text className="ml-2 text-xs text-amber-700 flex-1">
              {missingQuantities} ingredient{missingQuantities > 1 ? "s" : ""}{" "}
              sans quantite. Renseignez les grammes pour un calcul complet.
            </Text>
          </View>
        )}

        {/* Empty state */}
        {!nutrition && (
          <View className="py-6 items-center">
            <Ionicons name="nutrition-outline" size={40} color="#D1D5DB" />
            <Text className="text-gray-400 mt-2 text-sm text-center">
              Selectionnez des ingredients et renseignez les quantites pour voir
              les informations nutritionnelles.
            </Text>
          </View>
        )}

        {nutrition && (
          <>
            {/* Portions selector */}
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-sm text-gray-600">Portions</Text>
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => onPortionsChange(Math.max(1, portions - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="remove" size={18} color="#374151" />
                </TouchableOpacity>
                <Text className="mx-4 text-lg font-bold">{portions}</Text>
                <TouchableOpacity
                  onPress={() => onPortionsChange(portions + 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                >
                  <Ionicons name="add" size={18} color="#374151" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Calories card */}
            <View className="bg-green-50 rounded-xl p-4 mb-4 border border-green-100">
              <Text className="text-3xl font-bold text-green-700 text-center">
                {Math.round(nutrition.perPortion.calories)}
              </Text>
              <Text className="text-sm text-green-600 text-center mt-1">
                kcal / portion
              </Text>
              <Text className="text-xs text-gray-500 text-center mt-1">
                Total : {Math.round(nutrition.total.calories)} kcal (
                {nutrition.totalWeight}g)
              </Text>
            </View>

            {/* Macro bars */}
            <View className="mb-4">
              <MacroBar
                label="Proteines"
                value={nutrition.perPortion.proteins}
                color="bg-blue-500"
                textColor="text-blue-700"
                max={50}
              />
              <MacroBar
                label="Glucides"
                value={nutrition.perPortion.carbs}
                color="bg-yellow-500"
                textColor="text-yellow-700"
                max={100}
              />
              <MacroBar
                label="Lipides"
                value={nutrition.perPortion.fats}
                color="bg-red-500"
                textColor="text-red-700"
                max={50}
              />
              <MacroBar
                label="Fibres"
                value={nutrition.perPortion.fiber}
                color="bg-green-500"
                textColor="text-green-700"
                max={15}
              />
            </View>

            {/* Nutri-Score badge */}
            <View className="mb-4">
              <Text className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                Nutri-Score
              </Text>
              <View className="flex-row justify-center items-end">
                {GRADES.map((grade) => {
                  const isActive = grade === nutrition.nutriScore;
                  return (
                    <View
                      key={grade}
                      className={`mx-0.5 rounded-lg items-center justify-center ${
                        isActive ? "w-10 h-10" : "w-8 h-8 opacity-40"
                      } ${NUTRI_SCORE_BG[grade]}`}
                    >
                      <Text
                        className={`font-bold text-white ${
                          isActive ? "text-lg" : "text-sm"
                        }`}
                      >
                        {grade}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Ingredient breakdown accordion */}
            {nutrition.ingredientBreakdown.length > 0 && (
              <View>
                <TouchableOpacity
                  onPress={() => setShowBreakdown(!showBreakdown)}
                  className="flex-row items-center justify-between py-2"
                >
                  <Text className="text-sm text-gray-600">
                    Detail par ingredient
                  </Text>
                  <Ionicons
                    name={showBreakdown ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>

                {showBreakdown && (
                  <View className="mt-2">
                    {nutrition.ingredientBreakdown.map((item) => (
                      <View
                        key={item.ingredientId}
                        className="flex-row items-center py-2 border-b border-gray-50"
                      >
                        <Text className="flex-1 text-sm text-gray-700">
                          {item.ingredientName}
                        </Text>
                        <Text className="text-xs text-gray-500 mr-3">
                          {item.quantityGrams}g
                        </Text>
                        <Text className="text-sm font-semibold text-gray-800 w-16 text-right">
                          {Math.round(item.calories)} kcal
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </>
        )}
      </View>
    </Animated.View>
  );
};

// --- Internal sub-component ---

function MacroBar({
  label,
  value,
  color,
  textColor,
  max,
}: {
  label: string;
  value: number;
  color: string;
  textColor: string;
  max: number;
}) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <View className="mb-3">
      <View className="flex-row justify-between mb-1">
        <Text className={`text-xs font-semibold ${textColor}`}>{label}</Text>
        <Text className="text-xs text-gray-600">{value}g</Text>
      </View>
      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <View
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </View>
    </View>
  );
}
