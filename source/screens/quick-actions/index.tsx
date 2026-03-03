import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/common/header";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useTranslation } from "@/hooks/useTranslation";
import { StackNavigation } from "@/types/navigation";
import { ActionCard } from "./components/action-card";

interface QuickAction {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  labelKey: string;
  descriptionKey: string;
  onPress: () => void;
}

const QuickActionsScreen: React.FC = () => {
  const { t } = useTranslation("quickActions");
  const navigation = useNavigation<StackNavigation>();
  const parentNavigation = navigation.getParent<StackNavigation>();

  const navigateToStack = (screen: string) => {
    parentNavigation?.navigate(screen as any);
  };

  const navigateToTab = (tab: string) => {
    navigation.navigate(tab as any);
  };

  const menuActions: QuickAction[] = [
    {
      icon: "restaurant-outline",
      iconColor: "#EA580C",
      iconBgColor: "#FFF7ED",
      labelKey: "actions.addDish.label",
      descriptionKey: "actions.addDish.description",
      onPress: () => navigateToStack("AddMenuItemScreen"),
    },
    {
      icon: "cafe-outline",
      iconColor: "#9333EA",
      iconBgColor: "#FAF5FF",
      labelKey: "actions.addDrink.label",
      descriptionKey: "actions.addDrink.description",
      onPress: () => navigateToStack("AddDrinksScreen"),
    },
    {
      icon: "book-outline",
      iconColor: "#3B82F6",
      iconBgColor: "#EFF6FF",
      labelKey: "actions.viewMenu.label",
      descriptionKey: "actions.viewMenu.description",
      onPress: () => navigateToTab("Menu"),
    },
  ];

  const operationsActions: QuickAction[] = [
    {
      icon: "receipt-outline",
      iconColor: "#F59E0B",
      iconBgColor: "#FFFBEB",
      labelKey: "actions.orders.label",
      descriptionKey: "actions.orders.description",
      onPress: () => navigateToTab("Orders"),
    },
    {
      icon: "stats-chart-outline",
      iconColor: "#10B981",
      iconBgColor: "#ECFDF5",
      labelKey: "actions.analytics.label",
      descriptionKey: "actions.analytics.description",
      onPress: () => navigateToTab("Analytics"),
    },
    {
      icon: "star-outline",
      iconColor: "#EF4444",
      iconBgColor: "#FEF2F2",
      labelKey: "actions.reviews.label",
      descriptionKey: "actions.reviews.description",
      onPress: () => navigateToStack("UserReviewsScreen"),
    },
  ];

  const accountActions: QuickAction[] = [
    {
      icon: "settings-outline",
      iconColor: "#6366F1",
      iconBgColor: "#EEF2FF",
      labelKey: "actions.settings.label",
      descriptionKey: "actions.settings.description",
      onPress: () => navigateToStack("SettingsScreen"),
    },
    {
      icon: "person-outline",
      iconColor: "#14B8A6",
      iconBgColor: "#F0FDFA",
      labelKey: "actions.profile.label",
      descriptionKey: "actions.profile.description",
      onPress: () => navigateToStack("PersonalInfoScreen"),
    },
  ];

  const sections = [
    { titleKey: "sections.menuManagement", actions: menuActions },
    { titleKey: "sections.operations", actions: operationsActions },
    { titleKey: "sections.account", actions: accountActions },
  ];

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title={t("header.title")}
          subtitle={t("header.subtitle")}
          showNotifications={false}
        />

        <ScrollView
          className="flex-1 px-5 pt-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {sections.map((section, sectionIndex) => (
            <View key={section.titleKey} className={sectionIndex > 0 ? "mt-6" : ""}>
              <Heading className="text-lg font-bold text-gray-900 mb-4">
                {t(section.titleKey)}
              </Heading>
              <View className="flex-row flex-wrap justify-between gap-y-3">
                {section.actions.map((action, actionIndex) => {
                  const globalIndex =
                    sections
                      .slice(0, sectionIndex)
                      .reduce((sum, s) => sum + s.actions.length, 0) + actionIndex;

                  return (
                    <ActionCard
                      key={action.labelKey}
                      icon={action.icon}
                      iconColor={action.iconColor}
                      iconBgColor={action.iconBgColor}
                      label={t(action.labelKey)}
                      description={t(action.descriptionKey)}
                      index={globalIndex}
                      onPress={action.onPress}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default QuickActionsScreen;
