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
import { useTranslation } from "@/hooks/useTranslation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/slices/auth";
import type { RootState } from "@/store";

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
  const { t } = useTranslation("account");
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();

  // Get cooker from auth state (already fetched in App.tsx)
  const cooker = useSelector((state: RootState) => state.auth.cooker);

  // Build user object from store data
  const user = {
    name: cooker ? `${cooker.firstname} ${cooker.lastname}` : "",
    phone: cooker?.phone || "",
    email: cooker?.email || "",
    avatar: cooker?.photo || "",
    acceptanceRate: cooker?.acceptanceRate || 0,
    isOnline: cooker?.isOnline || false,
    maxOrderNumber: cooker?.maxOrderNumber || 0,
  };

  const menuSections: MenuSection[] = [
    {
      title: t("sections.account"),
      items: [
        {
          icon: "person-outline",
          label: t("menu.personalInfo"),
          description: t("menu.personalInfoDesc"),
          action: () => navigation.navigate("PersonalInfoScreen"),
          iconColor: "#3B82F6",
          iconBg: "bg-blue-50",
        },
        {
          icon: "settings-outline",
          label: t("menu.settings"),
          description: t("menu.settingsDesc"),
          action: () => navigation.navigate("SettingsScreen" as any),
          iconColor: "#6366F1",
          iconBg: "bg-indigo-50",
        },
      ],
    },
    {
      title: t("sections.activity"),
      items: [
        {
          icon: "cash-outline",
          label: t("menu.withdrawalHistory"),
          description: t("menu.withdrawalHistoryDesc"),
          action: () => navigation.navigate("WithdrawalHistoryScreen" as any),
          iconColor: "#10B981",
          iconBg: "bg-green-50",
        },
        {
          icon: "receipt-outline",
          label: t("menu.orders"),
          description: t("menu.ordersDesc"),
          action: () => navigation.navigate("OrdersScreen" as any),
          iconColor: "#FF6347",
          iconBg: "bg-orange-50",
        },
        {
          icon: "star-outline",
          label: t("menu.reviews"),
          description: t("menu.reviewsDesc"),
          action: () => navigation.navigate("UserReviewsScreen" as any),
          iconColor: "#F59E0B",
          iconBg: "bg-amber-50",
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(t("logout.title"), t("logout.message"), [
      {
        text: t("common:buttons.cancel"),
        style: "cancel",
      },
      {
        text: t("logout.confirm"),
        onPress: () => dispatch(logout()),
        style: "destructive",
      },
    ]);
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Header
          title={t("header.title")}
          subtitle={t("header.subtitle")}
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
                {user.avatar && <AvatarImage source={{ uri: user.avatar }} />}
              </Avatar>
              <View className="ml-4 flex-1">
                <View className="flex-row items-center mb-1">
                  <Heading className="text-xl font-bold text-gray-900">
                    {user.name}
                  </Heading>
                  {user.isOnline && (
                    <View className="ml-2 w-3 h-3 bg-green-500 rounded-full" />
                  )}
                </View>
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
                  <Ionicons name="checkmark-circle-outline" size={20} color="#10B981" />
                  <Text className="text-2xl font-bold text-green-500">{user.acceptanceRate}%</Text>
                </View>
                <Text className="text-xs text-gray-600">{t("stats.acceptanceRate")}</Text>
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
                  <Ionicons name="restaurant-outline" size={20} color="#FF6347" />
                  <Text className="text-2xl font-bold text-primary-500">{user.maxOrderNumber}</Text>
                </View>
                <Text className="text-xs text-gray-600">{t("stats.maxOrders")}</Text>
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
                {t("logout.button")}
              </Text>
            </TouchableOpacity>

            {/* Version de l'application */}
            <Text className="text-center text-gray-400 text-xs mt-2 mb-4">
              {t("footer.version")}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default AccountScreen;
