import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "@/components/ui/text";

interface CategoryItemProps {
  category: { id: string; name: string; count: number };
  isSelected: boolean;
  onPress: (id: string) => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = React.memo(({ category, isSelected, onPress }) => (
  <TouchableOpacity
    className="px-4 py-2 rounded-xl mr-2 flex-row items-center bg-white border border-gray-200"
    style={isSelected ? { backgroundColor: "#FF6347", borderColor: "#FF6347" } : {}}
    onPress={() => onPress(category.id)}
  >
    <Text className={`font-semibold text-sm ${isSelected ? "text-white" : "text-gray-700"}`}>
      {category.name}
    </Text>
    <View className={`ml-2 px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20" : "bg-gray-100"}`}>
      <Text className={`text-xs font-semibold ${isSelected ? "text-white" : "text-gray-600"}`}>
        {category.count}
      </Text>
    </View>
  </TouchableOpacity>
));

CategoryItem.displayName = "CategoryItem";
