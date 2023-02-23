import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrdersTab from "../tab/OrdersTab";
import BalanceTab from "../tab/BalanceTab";
import SettingsView from "../views/SettingsView";
import all_constants from "../constants";
import StatsView from "../views/StatsView";
import HomeView from "../views/HomeView";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerPosition: "left", headerShown: false }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeView}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="OrdersTab"
        component={OrdersTab}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="BalanceTab"
        component={BalanceTab}
        options={{ title: all_constants.label.balance.title }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsView}
        options={{ title: all_constants.label.settings.my_account }}
      />
      <Drawer.Screen
        name="StatsView"
        component={StatsView}
        options={{ title: all_constants.label.stats.title }}
      />
    </Drawer.Navigator>
  );
}
