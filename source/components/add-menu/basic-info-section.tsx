import React from "react";
import { View, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface BasicInfoSectionProps {
  name: string;
  category: string;
  sku: string;
  available: boolean;
  categories: Category[];
  errors: {
    name?: string;
    category?: string;
    sku?: string;
  };
  onNameChange: (text: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onSkuChange: (text: string) => void;
  onAvailableChange: (value: boolean) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  name,
  category,
  sku,
  available,
  categories,
  errors,
  onNameChange,
  onCategoryChange,
  onSkuChange,
  onAvailableChange,
}) => {
  return (
    <Animated.View entering={FadeIn.delay(100).duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Informations de base</Text>
      </View>
      
      <View className="bg-white rounded-2xl p-4 space-y-4">
        {/* Name */}
        <View>
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Nom du plat *
          </Text>
          <TextInput
            value={name}
            onChangeText={onNameChange}
            placeholder="Ex: Burger Signature"
            placeholderTextColor="#9CA3AF"
            className={`bg-gray-50 rounded-xl px-4 py-3 text-gray-900 ${
              errors.name ? "border border-red-300" : ""
            }`}
          />
          {errors.name && (
            <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
          )}
        </View>

        {/* Category */}
        <View>
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Catégorie *
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => onCategoryChange(cat.id)}
                className={`mr-2 px-4 py-2.5 rounded-xl flex-row items-center ${
                  category === cat.id
                    ? "bg-[#FF6347]"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={16}
                  color={category === cat.id ? "#fff" : cat.color}
                />
                <Text
                  className={`ml-2 font-semibold text-sm ${
                    category === cat.id ? "text-white" : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.category && (
            <Text className="text-red-500 text-xs mt-1">{errors.category}</Text>
          )}
        </View>

        {/* SKU */}
        <View>
          <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
            Code SKU *
          </Text>
          <TextInput
            value={sku}
            onChangeText={(text) => onSkuChange(text.toUpperCase())}
            placeholder="Ex: BRG-001"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="characters"
            className={`bg-gray-50 rounded-xl px-4 py-3 text-gray-900 ${
              errors.sku ? "border border-red-300" : ""
            }`}
          />
          {errors.sku && (
            <Text className="text-red-500 text-xs mt-1">{errors.sku}</Text>
          )}
        </View>

        {/* Availability Toggle */}
        <View className="flex-row items-center justify-between py-2">
          <View>
            <Text className="text-sm font-semibold">Disponible immédiatement</Text>
            <Text className="text-xs mt-0.5">Le plat sera visible dans le menu</Text>
          </View>
          <TouchableOpacity
            onPress={() => onAvailableChange(!available)}
            className={`w-14 h-8 rounded-full p-1 ${
              available ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <Animated.View
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              style={useAnimatedStyle(() => ({
                transform: [{
                  translateX: withSpring(available ? 22 : 0)
                }]
              }))}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
