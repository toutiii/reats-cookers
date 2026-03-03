import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { useTranslation } from "@/hooks/useTranslation";

interface QuickAction {
  icon: string;
  label: string;
  bg: string;
  iconBg: string;
  onPress: () => void;
}

interface QuickActionButtonProps {
  action: QuickAction;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ action }) => (
  <TouchableOpacity
    className="flex-1 rounded-xl p-4 items-center"
    style={{ backgroundColor: action.bg }}
    onPress={action.onPress}
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
  const navigation = useNavigation<StackNavigation>();
  const { t } = useTranslation("dashboard");

  const actions: QuickAction[] = [
    {
      icon: "shopping-bag",
      label: t("quickActions.viewOrders"),
      bg: "#fff7ed",
      iconBg: "#f97316",
      onPress: () =>
        navigation.navigate("MainNavigator", { screen: "Orders" } as any),
    },
    {
      icon: "menu",
      label: t("quickActions.manageMenu"),
      bg: "#eff6ff",
      iconBg: "#3b82f6",
      onPress: () =>
        navigation.navigate("MainNavigator", { screen: "Menu" } as any),
    },
    {
      icon: "users",
      label: t("quickActions.viewReports"),
      bg: "#f5f3ff",
      iconBg: "#8b5cf6",
      onPress: () =>
        navigation.navigate("MainNavigator", { screen: "Analytics" } as any),
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
      <View className="flex-row justify-between items-center mb-5">
        <Heading className="text-lg">{t("quickActions.title")}</Heading>
        <TouchableOpacity onPress={() => navigation.navigate("QuickActions" as any)}>
          <Text className="text-sm text-orange-500 font-semibold">
            {t("quickActions.viewAll")}
          </Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row gap-3">
        {actions.map((action, index) => (
          <QuickActionButton key={index} action={action} />
        ))}
      </View>
    </View>
  );
};
