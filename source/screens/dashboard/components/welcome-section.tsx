import React from "react";
import { View } from "react-native";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

/**
 * Welcome Section Component
 * Displays greeting message and daily activity subtitle
 */
export const WelcomeSection: React.FC = () => {
  return (
    <View className="mb-6">
      <Heading className="text-2xl font-bold mb-1">Hello, Chef! 👋</Heading>
      <Text className="text-base">Here's your daily activity</Text>
    </View>
  );
};
