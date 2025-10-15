import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import AccountScreen from "@/screens/account";
import DashboardScreen from "@/screens/dashboard";
import OrdersScreen from "@/screens/orders";
import MenuScreen from "@/screens/menu";
import AnalyticsScreen from "@/screens/analytics";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

type TabParamList = {
  Dashboard: undefined;
  Orders: undefined;
  Menu: undefined;
  Analytics: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainNavigator = () => {
  const activeColor = "#f97316";
  const inactiveColor = "#9CA3AF";
  const bgColor = "#FFFFFF";

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          paddingVertical: 10,
          paddingTop: 5,
          borderTopWidth: 1,
          height: 90,
          borderTopColor: "#F3F4F6",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: "Montserrat_500Medium",
          paddingBottom: 5,
        },
        tabBarIcon: ({ color }) => {
          if (route.name === "Dashboard") {
            return <Feather name="grid" size={20} color={color} />;
          } else if (route.name === "Orders") {
            return <Feather name="shopping-bag" size={20} color={color} />;
          } else if (route.name === "Menu") {
            return <Feather name="book-open" size={20} color={color} />;
          } else if (route.name === "Analytics") {
            return <Feather name="bar-chart-2" size={20} color={color} />;
          } else if (route.name === "Profile") {
            return (
              <Avatar size="xs">
                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
                <AvatarBadge />
              </Avatar>
            );
          }

          return <Feather name="home" size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: "Dashboard" }}
      />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: "Orders" }} />
      <Tab.Screen name="Menu" component={MenuScreen} options={{ tabBarLabel: "Menu" }} />
      <Tab.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{ tabBarLabel: "Analytics" }}
      />
      <Tab.Screen name="Profile" component={AccountScreen} options={{ tabBarLabel: "Profile" }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
