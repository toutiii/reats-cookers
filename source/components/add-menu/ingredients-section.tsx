import React from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: "basic" | "fruit" | "dairy" | "protein";
}

interface IngredientCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface IngredientsSectionProps {
  ingredients: Ingredient[];
  selectedIngredients: string[];
  selectedCategory: string;
  categories: IngredientCategory[];
  onCategoryChange: (categoryId: string) => void;
  onToggleIngredient: (ingredientId: string) => void;
}

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
  selectedIngredients,
  selectedCategory,
  categories,
  onCategoryChange,
  onToggleIngredient,
}) => {
  const filteredIngredients = ingredients.filter(
    (ing) => ing.category === selectedCategory
  );

  return (
    <Animated.View entering={FadeIn.delay(300).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Ingrédients</Text>
      </View>
      
      <View className="bg-white rounded-2xl p-4">
        {/* Category Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => onCategoryChange(cat.id)}
              className={`mr-2 px-4 py-2 rounded-xl flex-row items-center ${
                selectedCategory === cat.id
                  ? "bg-primary-500"
                  : "bg-gray-50"
              }`}
            >
              <Ionicons
                name={cat.icon as any}
                size={16}
                color={selectedCategory === cat.id ? "#fff" : "#6B7280"}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedCategory === cat.id ? "text-white" : "text-gray-700"
                }`}
              >
                {cat.name}
              </Text>
              <View
                className={`ml-2 px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.id ? "bg-white/20" : "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedCategory === cat.id ? "text-white" : "text-gray-600"
                  }`}
                >
                  {cat.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        {/* Ingredients Grid */}
        <View className="flex-row flex-wrap -mx-1">
          {filteredIngredients.map((ingredient) => {
            const isSelected = selectedIngredients.includes(ingredient.id);
            return (
              <TouchableOpacity
                key={ingredient.id}
                onPress={() => onToggleIngredient(ingredient.id)}
                className="w-1/4 px-1 mb-3"
              >
                <View
                  className={`items-center py-3 rounded-2xl ${
                    isSelected ? "bg-orange-100 border-2 border-primary-500" : "bg-gray-50"
                  }`}
                >
                  <Text className="text-2xl mb-1">{ingredient.icon}</Text>
                  <Text
                    className={`text-xs text-center ${
                      isSelected ? "text-primary-500 font-semibold" : "text-gray-600"
                    }`}
                  >
                    {ingredient.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Animated.View>
  );
};
