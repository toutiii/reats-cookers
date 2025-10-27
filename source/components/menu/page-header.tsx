import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Heading } from "../ui/heading";

interface PageHeaderProps {
  viewMode: "grid" | "list";
  onToggleViewMode: () => void;
  onAddPress: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = React.memo(
  ({ viewMode, onToggleViewMode, onAddPress }) => (
    <View className="flex-row justify-between items-center mb-4">
      <View>
        <Heading className="text-2xl font-bold text-gray-900">Gestion du Menu</Heading>
        <Text className="text-sm text-gray-500">Restaurant Central Paris</Text>
      </View>

      <View className="flex-row items-center">
        <TouchableOpacity
          className="bg-gray-100 p-2.5 rounded-xl mr-2"
          onPress={onToggleViewMode}
        >
          <Ionicons
            name={viewMode === "grid"
? "list-outline"
: "grid-outline"}
            size={20}
            color="#374151"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="px-4 py-2.5 rounded-xl flex-row items-center"
          style={{ backgroundColor: "#FF6347" }}
          onPress={onAddPress}
        >
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
);

PageHeader.displayName = "PageHeader";
