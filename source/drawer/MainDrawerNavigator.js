import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MainDrawerContent from "./DrawerContent";
import MainTabNavigator from "../tab/MainTabNavigator";

const Drawer = createDrawerNavigator();

export const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MainDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabNavigator" component={MainTabNavigator} />
    </Drawer.Navigator>
  );
};
