import React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import SettingsView from "../views/SettingsView";
import all_constants from "../constants";
import HomeView from "../views/HomeView";
import CurrentWeekOrderView from "../views/CurrentWeekOrderView";
import SplitBalanceView from "../views/SplitBalanceView";
import SplitStatsView from "../views/SplitStatsView";
import { Drawer } from "react-native-paper";

export default function MainDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Item
        name="Home"
        component={HomeView}
        options={{ title: all_constants.main_drawer_navigator.titles.home }}
      />
      <Drawer.Item
        name="OrdersTab"
        component={CurrentWeekOrderView}
        options={{ title: all_constants.main_drawer_navigator.titles.orders }}
      />
      <Drawer.Item
        name="BalanceTab"
        component={SplitBalanceView}
        options={{ title: all_constants.main_drawer_navigator.titles.balance }}
      />
      <Drawer.Item
        name="Settings"
        component={SettingsView}
        options={{ title: all_constants.main_drawer_navigator.titles.settings }}
      />
      <Drawer.Item
        name="StatsView"
        component={SplitStatsView}
        options={{ title: all_constants.main_drawer_navigator.titles.stats }}
      />
    </DrawerContentScrollView>
  );
}
