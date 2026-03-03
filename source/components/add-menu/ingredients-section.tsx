import React, { useState, useMemo, useCallback } from "react";
import { View, TouchableOpacity, ScrollView, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeIn } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import type { Ingredient } from "@/api/ingredients";

// Re-export for backward compatibility
export type { Ingredient };

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
  ingredientQuantities?: Record<string, number>;
  onQuantityChange?: (ingredientId: string, grams: number) => void;
}

const QUANTITY_PRESETS = [50, 100, 200] as const;

export const IngredientsSection: React.FC<IngredientsSectionProps> = ({
  ingredients,
  selectedIngredients,
  selectedCategory,
  categories,
  onCategoryChange,
  onToggleIngredient,
  ingredientQuantities = {},
  onQuantityChange,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and search ingredients with memoization for performance
  const filteredIngredients = useMemo(() => {
    let filtered = ingredients.filter((ing) => ing.category === selectedCategory);

    // Apply search filter if query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ing) =>
          ing.name.toLowerCase().includes(query) ||
          ing.nameEn.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [ingredients, selectedCategory, searchQuery]);

  // Render individual ingredient item
  const renderIngredient = useCallback(
    ({ item: ingredient }: { item: Ingredient }) => {
      const isSelected = selectedIngredients.includes(ingredient.id);
      return (
        <TouchableOpacity
          onPress={() => onToggleIngredient(ingredient.id)}
          activeOpacity={0.7}
          className="p-1"
        >
          <View
            className={`items-center py-3 rounded-2xl ${
              isSelected
                ? "bg-orange-100 border-2 border-primary-500"
                : "bg-gray-50"
            }`}
          >
            {ingredient.thumbnail
              ? (
                  <Image
                    source={{ uri: ingredient.thumbnail }}
                    className="w-10 h-10 mb-1"
                    resizeMode="contain"
                  />
                )
              : (
                  <Text className="text-2xl mb-1">{ingredient.icon}</Text>
                )}
            <Text
              className={`text-xs text-center ${
                isSelected
                  ? "text-primary-500 font-semibold"
                  : "text-gray-600"
              }`}
            >
              {ingredient.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [selectedIngredients, onToggleIngredient]
  );

  // Empty state component
  const renderEmpty = useCallback(
    () => (
      <View className="w-full py-8 items-center">
        <Ionicons name="search-outline" size={48} color="#D1D5DB" />
        <Text className="text-gray-400 mt-3 text-center">
          {searchQuery
            ? "Aucun ingrédient trouvé"
            : "Aucun ingrédient dans cette catégorie"}
        </Text>
      </View>
    ),
    [searchQuery]
  );

  // Footer with results info
  const renderFooter = useCallback(() => {
    if (filteredIngredients.length === 0) return null;
    return (
      <View className="py-3 items-center">
        <Text className="text-gray-500 text-xs">
          {filteredIngredients.length} ingrédient{filteredIngredients.length > 1 ? "s" : ""}
        </Text>
      </View>
    );
  }, [filteredIngredients.length]);

  return (
    <Animated.View entering={FadeIn.delay(300).duration(600)} className="mb-8">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
          <Text className="text-base font-bold">Ingrédients</Text>
        </View>
        {selectedIngredients.length > 0 && (
          <View className="bg-primary-500 px-3 py-1 rounded-full">
            <Text className="text-white text-xs font-semibold">
              {selectedIngredients.length} sélectionné{selectedIngredients.length > 1 ? "s" : ""}
            </Text>
          </View>
        )}
      </View>

      <View className="bg-white rounded-2xl p-4">
        {/* Search Bar */}
        <View className="mb-4 bg-gray-50 rounded-xl flex-row items-center px-4 py-3">
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher un ingrédient..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-gray-900"
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
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
                color={selectedCategory === cat.id
? "#fff"
: "#6B7280"}
              />
              <Text
                className={`ml-2 font-semibold text-sm ${
                  selectedCategory === cat.id
? "text-white"
: "text-gray-700"
                }`}
              >
                {cat.name}
              </Text>
              <View
                className={`ml-2 px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.id
? "bg-white/20"
: "bg-gray-200"
                }`}
              >
                <Text
                  className={`text-xs font-semibold ${
                    selectedCategory === cat.id
? "text-white"
: "text-gray-600"
                  }`}
                >
                  {cat.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Ingredients Grid with FlashList - Infinite Scroll */}
        <View style={{ height: 384 }}>
          <FlashList
            data={filteredIngredients}
            renderItem={renderIngredient}
            numColumns={4}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
        </View>

        {/* Quantity inputs for selected ingredients */}
        {selectedIngredients.length > 0 && onQuantityChange && (
          <View className="mt-4 pt-4 border-t border-gray-100">
            <Text className="text-xs uppercase tracking-wide text-gray-500 mb-3">
              Quantites (grammes)
            </Text>
            {selectedIngredients.map((id) => {
              const ingredient = ingredients.find((i) => i.id === id);
              if (!ingredient) return null;
              const currentQty = ingredientQuantities[id] ?? 0;

              return (
                <View key={id} className="flex-row items-center mb-3">
                  <Text className="text-lg mr-2">{ingredient.icon}</Text>
                  <Text className="text-sm text-gray-700 flex-1" numberOfLines={1}>
                    {ingredient.name}
                  </Text>

                  {/* Preset buttons */}
                  {QUANTITY_PRESETS.map((preset) => (
                    <TouchableOpacity
                      key={preset}
                      onPress={() => onQuantityChange(id, preset)}
                      className={`px-2 py-1 rounded-lg mr-1 ${
                        currentQty === preset
                          ? "bg-primary-500"
                          : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`text-xs font-semibold ${
                          currentQty === preset ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {preset}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {/* Numeric input */}
                  <TextInput
                    value={currentQty > 0 ? String(currentQty) : ""}
                    onChangeText={(text) => {
                      const parsed = parseInt(text, 10);
                      onQuantityChange(id, isNaN(parsed) ? 0 : Math.max(0, parsed));
                    }}
                    placeholder="0"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                    className="w-14 text-center text-sm border border-gray-200 rounded-lg py-1 mx-1"
                  />
                  <Text className="text-xs text-gray-500">g</Text>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </Animated.View>
  );
};
