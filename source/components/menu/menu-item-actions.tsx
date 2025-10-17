import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MenuItemActionsProps {
  itemId: string;
  onAnalytics: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const MenuItemActions: React.FC<MenuItemActionsProps> = React.memo(
  ({ itemId, onAnalytics, onEdit, onDelete }) => (
    <View className="flex-row">
      <TouchableOpacity className="p-1.5 mr-1" onPress={() => onAnalytics(itemId)}>
        <Ionicons name="stats-chart-outline" size={16} color="#6B7280" />
      </TouchableOpacity>
      <TouchableOpacity className="p-1.5 mr-1" onPress={() => onEdit(itemId)}>
        <Ionicons name="create-outline" size={16} color="#FF6347" />
      </TouchableOpacity>
      <TouchableOpacity className="p-1.5" onPress={() => onDelete(itemId)}>
        <Ionicons name="trash-outline" size={16} color="#EF4444" />
      </TouchableOpacity>
    </View>
  )
);

MenuItemActions.displayName = "MenuItemActions";
