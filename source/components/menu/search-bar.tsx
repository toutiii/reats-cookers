import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = React.memo(({ value, onChangeText }) => (
  <View className="bg-gray-50 rounded-xl flex-row items-center px-4 py-2.5">
    <Ionicons name="search-outline" size={18} color="#6B7280" />
    <TextInput
      placeholder="Rechercher par nom ou SKU..."
      placeholderTextColor="#9CA3AF"
      value={value}
      onChangeText={onChangeText}
      className="flex-1 ml-2 text-sm text-gray-900 font-body"
    />
  </View>
));

SearchBar.displayName = "SearchBar";
