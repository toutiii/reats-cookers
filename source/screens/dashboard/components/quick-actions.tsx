import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

interface QuickAction {
  icon: string;
  label: string;
  bg: string;
  iconBg: string;
}

interface QuickActionButtonProps {
  action: QuickAction;
  onPress?: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action, onPress }) => (
  <TouchableOpacity
    className="flex-1 rounded-xl p-4 items-center"
    style={{ backgroundColor: action.bg }}
    onPress={onPress}
  >
    <View
      className="rounded-full w-12 h-12 items-center justify-center mb-3"
      style={{ backgroundColor: action.iconBg }}
    >
      <Feather name={action.icon as any} size={20} color="#ffffff" />
    </View>
    <Text className="font-semibold text-xs text-center">{action.label}</Text>
  </TouchableOpacity>
);

/**
 * Quick Actions Component
 * Displays quick action buttons for common tasks
 */
export const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      icon: "shopping-bag",
      label: "New\nOrder",
      bg: "#fff7ed",
      iconBg: "#f97316",
    },
    {
      icon: "menu",
      label: "Manage\nMenu",
      bg: "#eff6ff",
      iconBg: "#3b82f6",
    },
    {
      icon: "users",
      label: "View\nCustomers",
      bg: "#f5f3ff",
      iconBg: "#8b5cf6",
    },
  ];

  return (
    <View
      className="bg-white rounded-3xl p-6 mb-8"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <Heading className="text-lg mb-5">Quick Actions</Heading>
      <View className="flex-row gap-3">
        {actions.map((action, index) => (
          <QuickActionButton key={index} action={action} />
        ))}
      </View>
    </View>
  );
};
