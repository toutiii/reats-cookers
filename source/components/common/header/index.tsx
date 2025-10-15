import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  rightAction?: {
    icon: string;
    onPress: () => void;
    color?: string;
  };
  onBackPress?: () => void;
  onNotificationPress?: () => void;
}


export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  showNotifications = true,
  notificationCount = 0,
  rightAction,
  onBackPress,
  onNotificationPress,
}) => {
  return (
    <View
      className="px-5 pt-4 pb-6 bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View className="flex-row justify-between items-center">
        {/* Left Side - Back Button or Title */}
        <View className="flex-row items-center flex-1">
          {showBackButton && (
            <TouchableOpacity
              onPress={onBackPress}
              className="w-10 h-10 bg-gray-50 rounded-xl items-center justify-center mr-3"
              activeOpacity={0.7}
            >
              <Feather name="arrow-left" size={20} color="#374151" />
            </TouchableOpacity>
          )}
          <View className="flex-1">
            <Heading className="text-2xl font-bold text-gray-900">{title}</Heading>
            {subtitle && (
              <Text className="text-sm text-gray-500 mt-1">{subtitle}</Text>
            )}
          </View>
        </View>

        {/* Right Side - Actions */}
        <View className="flex-row items-center gap-2">
          {/* Notifications */}
          {showNotifications && (
            <TouchableOpacity
              onPress={onNotificationPress}
              className="w-11 h-11 bg-orange-50 rounded-xl items-center justify-center relative"
              activeOpacity={0.7}
            >
              <Feather name="bell" size={20} color="#f97316" />
              {notificationCount > 0 && (
                <View className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {/* Custom Right Action */}
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              className="w-11 h-11 bg-orange-50 rounded-xl items-center justify-center"
              activeOpacity={0.7}
            >
              <Feather
                name={rightAction.icon as any}
                size={20}
                color={rightAction.color || "#f97316"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
