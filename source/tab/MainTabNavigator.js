import Ionicons from "@expo/vector-icons/Ionicons";
import OrderView from "../views/OrderView";
import DishForm from "../forms/DishForm";
import SettingsPersonalInformationForm from "../forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "../forms/SettingsAddressForm";
import SettingsOrderInformationForm from "../forms/SettingsOrderInformationForm";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../views/Dashboard";
import all_constants from "../constants";
import DishFlatlistStackNavigator from "../stack/DishFlatlistStackNavigator";
import OrderFlatlistStackNavigator from "../stack/OrderFlatlistStackNavigator";
import OrdersHistoryStackNavigator from "../stack/OrdersHistoryStackNavigator";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={all_constants.tab.main_tab_navigator.Home}
      screenOptions={({ route }) => ({
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === all_constants.tab.main_tab_navigator.Home) {
            iconName = "home-outline";
          } else if (
            route.name === all_constants.tab.main_tab_navigator.OrderFlatList
          ) {
            iconName = "basket-outline";
          } else if (
            route.name === all_constants.tab.main_tab_navigator.DishFlatList
          ) {
            iconName = "restaurant-outline";
          } else if (
            route.name === all_constants.tab.main_tab_navigator.OfferFlatList
          ) {
            iconName = "pricetag-outline";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarButton: [
          "OrderView",
          "DishForm",
          "SettingsPersonalInformationForm",
          "SettingsAddressForm",
          "SettingsOrderInformationForm",
          "OrdersHistory",
        ].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen
        name={all_constants.tab.main_tab_navigator.Home}
        component={Dashboard}
      />
      <Tab.Screen
        name={all_constants.tab.main_tab_navigator.OrderFlatList}
        component={OrderFlatlistStackNavigator}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name={all_constants.tab.main_tab_navigator.DishFlatList}
        component={DishFlatlistStackNavigator}
      />

      <Tab.Screen name="OrderView" component={OrderView} />
      <Tab.Screen name="DishForm" component={DishForm} />

      <Tab.Screen
        name="SettingsPersonalInformationForm"
        component={SettingsPersonalInformationForm}
      />
      <Tab.Screen name="SettingsAddressForm" component={SettingsAddressForm} />
      <Tab.Screen
        name="SettingsOrderInformationForm"
        component={SettingsOrderInformationForm}
      />
      <Tab.Screen
        name="OrdersHistory"
        component={OrdersHistoryStackNavigator}
      />
    </Tab.Navigator>
  );
}
