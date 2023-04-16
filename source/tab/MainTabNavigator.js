import Ionicons from "@expo/vector-icons/Ionicons";
import OrderView from "../views/OrderView";
import DishFormView from "../forms/DishFormView";
import MenuFormView from "../forms/MenuFormView";
import OfferFormView from "../forms/OfferFormView";
import SettingsCredentialsForm from "../forms/SettingsCredentialsForm";
import SettingsPersonalInformationForm from "../forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "../forms/SettingsAddressForm";
import SettingsOrderInformationForm from "../forms/SettingsOrderInformationForm";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../views/Dashboard";
import DishFlatList from "../flatlist/DishFlatList";
import OfferFlatList from "../flatlist/OfferFlatList";
import OrderFlatList from "../flatlist/OrderFlatList";
import all_constants from "../constants";

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
          "DishFormView",
          "MenuFormView",
          "SettingsCredentialsForm",
          "SettingsPersonalInformationForm",
          "SettingsAddressForm",
          "SettingsOrderInformationForm",
          "OfferFormView",
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
        component={OrderFlatList}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen
        name={all_constants.tab.main_tab_navigator.DishFlatList}
        component={DishFlatList}
      />
      <Tab.Screen
        name={all_constants.tab.main_tab_navigator.OfferFlatList}
        component={OfferFlatList}
      />
      <Tab.Screen name="OrderView" component={OrderView} />
      <Tab.Screen name="DishFormView" component={DishFormView} />
      <Tab.Screen name="MenuFormView" component={MenuFormView} />
      <Tab.Screen name="OfferFormView" component={OfferFormView} />
      <Tab.Screen
        name="SettingsCredentialsForm"
        component={SettingsCredentialsForm}
      />
      <Tab.Screen
        name="SettingsPersonalInformationForm"
        component={SettingsPersonalInformationForm}
      />
      <Tab.Screen name="SettingsAddressForm" component={SettingsAddressForm} />
      <Tab.Screen
        name="SettingsOrderInformationForm"
        component={SettingsOrderInformationForm}
      />
    </Tab.Navigator>
  );
}
