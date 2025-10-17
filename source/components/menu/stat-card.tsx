import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import { Heading } from "@/components/ui/heading";
import { Text } from "../ui/text";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  color: string;
  icon: string;
}

export const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, subtitle, color, icon }) => (
  <Animated.View
    entering={FadeIn.duration(500)}
    className="flex-1 bg-white rounded-2xl p-4 mr-3"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
      minWidth: 160,
    }}
  >
    <View className="flex-row justify-between items-start mb-2">
      <View className="flex-1 mr-1">
        <Heading className="text-2xs text-gray-500 uppercase tracking-wide">{title} </Heading>
        <Heading className="text-2xl font-bold mt-1" style={{ color }}>{value}</Heading>
        {subtitle && <Text className="text-xs text-gray-400 mt-1">{subtitle}</Text>}
      </View>
      <View className="size-9 rounded-full items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <Ionicons name={icon as any} size={19} color={color} />
      </View>
    </View>
  </Animated.View>
));

StatCard.displayName = "StatCard";
