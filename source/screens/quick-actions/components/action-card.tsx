import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import Animated, { FadeIn } from "react-native-reanimated";

interface ActionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  iconBgColor: string;
  label: string;
  description: string;
  index: number;
  onPress: () => void;
}

const ActionCardComponent: React.FC<ActionCardProps> = ({ icon, iconColor, iconBgColor, label, description, index, onPress }) => (
    <Animated.View
      entering={FadeIn.delay(index * 80).duration(500)}
      className="w-[48%]"
    >
      <TouchableOpacity
        className="bg-white rounded-2xl p-4"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          elevation: 2,
        }}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View
          className="rounded-xl w-14 h-14 items-center justify-center mb-3"
          style={{ backgroundColor: iconBgColor }}
        >
          <Ionicons name={icon} size={26} color={iconColor} />
        </View>
        <Text className="font-semibold text-sm text-gray-900">{label}</Text>
        <Text className="text-xs text-gray-500 mt-1">{description}</Text>
      </TouchableOpacity>
    </Animated.View>
);

ActionCardComponent.displayName = "ActionCard";

export const ActionCard = React.memo(ActionCardComponent);
