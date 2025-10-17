import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";

const StyledSwitch: React.FC<{
  value: boolean;
  onValueChange: (value: boolean) => void;
}> = ({ value: isEnabled, onValueChange }) => {
  return (
    <Switch
      value={isEnabled}
      onValueChange={onValueChange}
      trackColor={{ false: "#E5E7EB", true: "#FFCAB0" }}
      thumbColor={isEnabled ? "#FF6347" : "#FFFFFF"}
      ios_backgroundColor="#E5E7EB"
      style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
    />
  );
};

interface SettingItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description?: string;
  iconColor: string;
  iconBg: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  showDivider?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  label,
  description,
  iconColor,
  iconBg,
  rightElement,
  onPress,
  showDivider = true,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="py-4 px-1 flex-row items-center justify-between"
        activeOpacity={0.7}
        disabled={!onPress}
      >
        <View className="flex-row items-center flex-1">
          <View className={`${iconBg} rounded-xl w-11 h-11 items-center justify-center mr-3`}>
            <Ionicons name={icon} color={iconColor} size={22} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900 mb-0.5">
              {label}
            </Text>
            {description && (
              <Text className="text-xs text-gray-500">{description}</Text>
            )}
          </View>
        </View>
        {rightElement || (onPress && <Ionicons name="chevron-forward" color="#9CA3AF" size={20} />)}
      </TouchableOpacity>
      {showDivider && <View className="h-px bg-gray-100 ml-14" />}
    </>
  );
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotions, setPromotions] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">Settings</Text>
            <Text className="text-sm text-gray-500">Gérez vos préférences</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          {/* Notifications Section */}
          <View className="mb-6">
            <View className="px-1 mb-3">
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Notifications
              </Text>
            </View>
            <View
              className="bg-white rounded-2xl overflow-hidden px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <SettingItem
                icon="notifications-outline"
                label="Push Notifications"
                description="Recevoir des notifications push"
                iconColor="#8B5CF6"
                iconBg="bg-purple-50"
                rightElement={
                  <StyledSwitch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                  />
                }
              />
              <SettingItem
                icon="mail-outline"
                label="Email Notifications"
                description="Recevoir des emails"
                iconColor="#3B82F6"
                iconBg="bg-blue-50"
                rightElement={
                  <StyledSwitch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                  />
                }
              />
              <SettingItem
                icon="receipt-outline"
                label="Order Updates"
                description="Alertes sur vos commandes"
                iconColor="#FF6347"
                iconBg="bg-orange-50"
                rightElement={
                  <StyledSwitch value={orderUpdates} onValueChange={setOrderUpdates} />
                }
              />
              <SettingItem
                icon="pricetag-outline"
                label="Promotions"
                description="Offres et réductions"
                iconColor="#10B981"
                iconBg="bg-green-50"
                rightElement={
                  <StyledSwitch value={promotions} onValueChange={setPromotions} />
                }
                showDivider={false}
              />
            </View>
          </View>

          {/* Appearance Section */}
          <View className="mb-6">
            <View className="px-1 mb-3">
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Apparence
              </Text>
            </View>
            <View
              className="bg-white rounded-2xl overflow-hidden px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <SettingItem
                icon="moon-outline"
                label="Dark Mode"
                description="Thème sombre"
                iconColor="#6366F1"
                iconBg="bg-indigo-50"
                rightElement={
                  <StyledSwitch value={darkMode} onValueChange={setDarkMode} />
                }
              />
              <SettingItem
                icon="language-outline"
                label="Language"
                description="Français (FR)"
                iconColor="#14B8A6"
                iconBg="bg-teal-50"
                onPress={() => console.log("Language settings")}
                showDivider={false}
              />
            </View>
          </View>

          {/* App Preferences Section */}
          <View className="mb-6">
            <View className="px-1 mb-3">
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                Préférences de l'app
              </Text>
            </View>
            <View
              className="bg-white rounded-2xl overflow-hidden px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <SettingItem
                icon="volume-high-outline"
                label="Sound Effects"
                description="Sons de l'application"
                iconColor="#F59E0B"
                iconBg="bg-amber-50"
                rightElement={
                  <StyledSwitch value={soundEffects} onValueChange={setSoundEffects} />
                }
              />
              <SettingItem
                icon="navigate-outline"
                label="Location Services"
                description="Autoriser la localisation"
                iconColor="#EC4899"
                iconBg="bg-pink-50"
                onPress={() => console.log("Location settings")}
                showDivider={false}
              />
            </View>
          </View>

          {/* About Section */}
          <View className="mb-8">
            <View className="px-1 mb-3">
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                À propos
              </Text>
            </View>
            <View
              className="bg-white rounded-2xl overflow-hidden px-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <SettingItem
                icon="information-circle-outline"
                label="App Version"
                description="1.0.3 • Restaurant Manager"
                iconColor="#64748B"
                iconBg="bg-slate-50"
              />
              <SettingItem
                icon="document-text-outline"
                label="Terms & Conditions"
                iconColor="#64748B"
                iconBg="bg-slate-50"
                onPress={() => console.log("Terms")}
              />
              <SettingItem
                icon="shield-checkmark-outline"
                label="Privacy Policy"
                iconColor="#64748B"
                iconBg="bg-slate-50"
                onPress={() => console.log("Privacy")}
                showDivider={false}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default SettingsScreen;
