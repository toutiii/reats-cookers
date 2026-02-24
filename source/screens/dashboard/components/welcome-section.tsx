import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useTranslation } from "@/hooks/useTranslation";

interface WelcomeSectionProps {
  name?: string;
}

/**
 * Welcome Section Component
 * Displays greeting message and daily activity subtitle
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ name = "Chef" }) => {
  const { t } = useTranslation("dashboard");

  return (
    <View className="mb-6">
      <Heading className="text-2xl font-bold mb-1">{t("welcome.greeting", { name })} 👋</Heading>
      <Text className="text-base">{t("welcome.message")}</Text>
    </View>
  );
};
