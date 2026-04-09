import React from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Text } from "@/components/ui/text";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface SaveButtonProps {
  onSave: () => void;
  isLoading?: boolean;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSave, isLoading }) => {
  return (
    <AnimatedTouchableOpacity
      entering={SlideInDown.delay(500).springify()}
      onPress={onSave}
      disabled={isLoading}
      className={`rounded-2xl py-4 mb-6 shadow-lg ${isLoading ? "bg-gray-400" : "bg-primary-500"}`}
      style={{
        shadowColor: "#FF6347",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
      }}
    >
      <View className="flex-row items-center justify-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <Feather name="check" size={20} color="white" />
        )}
        <Text className="text-white font-bold text-base ml-2">
          {isLoading ? "Envoi en cours..." : "Ajouter au Menu"}
        </Text>
      </View>
    </AnimatedTouchableOpacity>
  );
};
