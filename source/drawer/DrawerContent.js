import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsView from "../views/SettingsView";
import all_constants from "../constants";
import HomeView from "../views/HomeView";
import CurrentWeekOrderView from "../views/CurrentWeekOrderView";
import SplitBalanceView from "../views/SplitBalanceView";
import SplitStatsView from "../views/SplitStatsView";

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerPosition: "left", headerShown: false }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeView}
        options={{ title: all_constants.main_drawer_navigator.titles.home }}
      />
      <Drawer.Screen
        name="OrdersTab"
        component={CurrentWeekOrderView}
        options={{ title: all_constants.main_drawer_navigator.titles.orders }}
      />
      <Drawer.Screen
        name="BalanceTab"
        component={SplitBalanceView}
        options={{ title: all_constants.main_drawer_navigator.titles.balance }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsView}
        options={{ title: all_constants.main_drawer_navigator.titles.settings }}
      />
      <Drawer.Screen
        name="StatsView"
        component={SplitStatsView}
        options={{ title: all_constants.main_drawer_navigator.titles.stats }}
      />
    </Drawer.Navigator>
  );
}
