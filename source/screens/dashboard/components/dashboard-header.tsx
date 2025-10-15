import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";


export const DashboardHeader: React.FC = () => {
  return (
    <View
      className="px-5 pt-4 pb-6 bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.03,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      <View className="flex-row justify-between items-center">
        {/* Menu Button */}
        <TouchableOpacity className="w-11 h-11 bg-gray-50 rounded-xl items-center justify-center">
          <Feather name="menu" size={22} color="#374151" />
        </TouchableOpacity>

        {/* Restaurant Selector */}
        <View className="flex-1 mx-4">
          <Text className="text-orange-500 font-bold text-xs tracking-widest mb-1">
            RESTAURANT
          </Text>
          <View className="flex-row items-center">
            <Text className="text-gray-900 text-base font-semibold">Halal Lab</Text>
            <Feather name="chevron-down" size={18} color="#9ca3af" style={{ marginLeft: 4 }} />
          </View>
        </View>

        {/* User Avatar */}
        <View
          className="w-11 h-11 rounded-xl items-center justify-center"
          style={{ backgroundColor: "#f97316" }}
        >
          <Text className="text-white font-bold text-base">HL</Text>
        </View>
      </View>
    </View>
  );
};
