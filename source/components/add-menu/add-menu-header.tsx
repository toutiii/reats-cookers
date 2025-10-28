import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { Heading } from "../ui/heading";
import { useTranslation } from "@/hooks/useTranslation";

interface AddMenuHeaderProps {
  onBack: () => void;
  onReset: () => void;
  scrollY?: any;
}

export const AddMenuHeader: React.FC<AddMenuHeaderProps> = ({
  onBack,
  onReset,
  scrollY,
}) => {
  const { t } = useTranslation("menu");

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!scrollY) return { opacity: 1 };
    const opacity = 1 - (scrollY.value / 100) * 0.02;
    return { opacity: Math.max(opacity, 0.98) };
  });

  return (
    <Animated.View
      style={[headerAnimatedStyle]}
      className="bg-white px-5 py-4 border-b border-gray-100"
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={onBack}
            className="mr-4 p-2 -ml-2 bg-gray-100 rounded-xl"
          >
            <Ionicons name="arrow-back" size={20} color="#374151" />
          </TouchableOpacity>
          <View>
            <Heading className="text-xl font-bold">{t("header.addNew")}</Heading>
            <Text className="text-xs mt-0.5">{t("header.addToMenu")}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={onReset}
          className="bg-gray-100 px-4 py-2 rounded-xl"
        >
          <Text className="font-semibold text-sm">{t("form.resetButton")}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
