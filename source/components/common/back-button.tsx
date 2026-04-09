import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps {
  onPress?: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={onPress || (() => navigation.goBack())}
      className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 mr-3"
      activeOpacity={0.7}
    >
      <Ionicons name="arrow-back" size={20} color="#374151" />
    </TouchableOpacity>
  );
};
