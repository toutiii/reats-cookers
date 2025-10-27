import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface SaveButtonProps {
  onSave: () => void;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave }) => {
  return (
    <AnimatedTouchableOpacity
      entering={SlideInDown.delay(500).springify()}
      onPress={onSave}
      className="bg-primary-500 rounded-2xl py-4 mb-6 shadow-lg"
      style={{
        shadowColor: "#FF6347",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <View className="flex-row items-center justify-center">
        <Feather name="check" size={20} color="white" />
        <Text className="text-white font-bold text-base ml-2">
          Ajouter au Menu
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};
