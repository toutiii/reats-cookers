import { ThemedView } from "@/components/themed-view";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { StackNavigation } from "@/types/navigation";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "@/components/common/header";
import { Heading } from "@/components/ui/heading";

type MenuItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description?: string;
  action?: () => void;
  rightElement?: React.ReactNode;
  showDivider?: boolean;
  iconColor?: string;
  iconBg?: string;
};

type MenuSection = {
  title: string;
  description?: string;
  items: MenuItem[];
};

const MenuItemComponent: React.FC<MenuItem> = ({
  icon,
  label,
  description,
  action,
  rightElement,
  showDivider = true,
  iconColor = "#FF6347",
  iconBg = "bg-orange-50",
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={action}
        className="py-4 px-1 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <View
            className={`${iconBg} rounded-xl w-11 h-11 items-center justify-center mr-3`}
          >
            <Ionicons name={icon} color={iconColor} size={22} />
          </View>
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900 mb-0.5">
              {label}
            </Text>
            {description && (
              <Text className="text-xs text-gray-500">
                {description}
              </Text>
            )}
          </View>
        </View>
        {rightElement || (
          <Ionicons name="chevron-forward" color="#9CA3AF" size={20} />
        )}
      </TouchableOpacity>
      {showDivider && <View className="h-px bg-gray-100 ml-14" />}
    </>
  );
};

const MenuSectionComponent: React.FC<{ section: MenuSection }> = ({ section }) => {
  return (
    <View className="mb-6">
      <View className="px-1 mb-3">
        <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
          {section.title}
        </Text>
        {section.description && (
          <Text className="text-xs text-gray-400 mt-1">
            {section.description}
          </Text>
        )}
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
        {section.items.map((item, index) => (
          <MenuItemComponent
            key={`${section.title}-${index}`}
            {...item}
            showDivider={index < section.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

const AccountScreen = () => {
  const navigation = useNavigation<StackNavigation>();

  const user = {
    name: "Ronald Richards",
    phone: "+111 1234 56 89",
    email: "ronaldrichards@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  };

  const menuSections: MenuSection[] = [
    {
      title: "Compte",
      items: [
        {
          icon: "person-outline",
          label: "Personal Info",
          description: "Gérez vos informations personnelles",
          action: () => navigation.navigate("PersonalInfoScreen"),
          iconColor: "#3B82F6",
          iconBg: "bg-blue-50",
        },
        {
          icon: "settings-outline",
          label: "Settings",
          description: "Préférences et paramètres de l'app",
          action: () => navigation.navigate("SettingsScreen" as any),
          iconColor: "#6366F1",
          iconBg: "bg-indigo-50",
        },
      ],
    },
    {
      title: "Activité",
      items: [
        {
          icon: "cash-outline",
          label: "Withdrawal History",
          description: "Historique de vos retraits",
          action: () => navigation.navigate("WithdrawalHistoryScreen" as any),
          iconColor: "#10B981",
          iconBg: "bg-green-50",
        },
        {
          icon: "receipt-outline",
          label: "Number of Orders",
          description: "Consultez toutes vos commandes",
          action: () => navigation.navigate("OrdersScreen" as any),
          iconColor: "#FF6347",
          iconBg: "bg-orange-50",
        },
        {
          icon: "star-outline",
          label: "User Reviews",
          description: "Avis et évaluations des clients",
          action: () => navigation.navigate("UserReviewsScreen" as any),
          iconColor: "#F59E0B",
          iconBg: "bg-amber-50",
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        onPress: () => console.log("User logged out"),
        style: "destructive",
      },
    ]);
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Header
          title="Profile"
          subtitle="Manage your account settings"
          notificationCount={0}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1 px-5 pt-4"
        >
          <View className="pb-6">
            {/* En-tête avec profil utilisateur */}
            <View
              className="bg-white rounded-2xl p-5 mb-6 flex-row items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <Avatar size="xl" className="shadow-md border-2 border-primary-100">
                <AvatarFallbackText>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallbackText>
                <AvatarImage source={{ uri: user.avatar }} />
              </Avatar>
              <View className="ml-4 flex-1">
                <Heading className="text-xl font-bold text-gray-900 mb-1">
                  {user.name}
                </Heading>
                <View className="flex-row items-center mb-1">
                  <Ionicons name="call-outline" size={14} color="#9CA3AF" />
                  <Text className="text-sm text-gray-600 ml-1.5">
                    {user.phone}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="mail-outline" size={14} color="#9CA3AF" />
                  <Text className="text-sm text-gray-600 ml-1.5">
                    {user.email}
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats Cards */}
            <View className="flex-row gap-3 mb-6">
              <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Ionicons name="receipt-outline" size={20} color="#FF6347" />
                  <Text className="text-2xl font-bold text-primary-500">248</Text>
                </View>
                <Text className="text-xs text-gray-600">Total Orders</Text>
              </View>
              <View
                className="flex-1 bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-2">
                  <Ionicons name="star" size={20} color="#F59E0B" />
                  <Text className="text-2xl font-bold text-amber-500">4.8</Text>
                </View>
                <Text className="text-xs text-gray-600">Rating</Text>
              </View>
            </View>

            {/* Sections de menu */}
            {menuSections.map((section, index) => (
              <MenuSectionComponent key={`section-${index}`} section={section} />
            ))}

            {/* Bouton de déconnexion */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-white rounded-2xl p-4 flex-row items-center justify-center mb-4"
              style={{
                shadowColor: "#EF4444",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 2,
                borderWidth: 1,
                borderColor: "#FEE2E2",
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" color="#EF4444" size={20} />
              <Text className="text-red-500 font-bold ml-2 text-base">
                Déconnexion
              </Text>
            </TouchableOpacity>

            {/* Version de l'application */}
            <Text className="text-center text-gray-400 text-xs mt-2 mb-4">
              Version 1.0.3 • Restaurant Manager
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default AccountScreen;
