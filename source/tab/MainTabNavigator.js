import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStack from "../stack/HomeStack";
import OrdersTab from "./OrdersTab";
import DishTab from "./DishTab";
import MenuTab from "./MenuTab";
import OfferTab from "./OfferTab";
import AddView from "../views/AddView";
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
import MainDrawerNavigator from "../drawer/MainDrawerNavigator";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="TabHome"
      screenOptions={({ route }) => ({
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "TabHome") {
            iconName = "home-outline";
          } else if (route.name === "Orders") {
            iconName = "basket-outline";
          } else if (route.name === "Dishes") {
            iconName = "restaurant-outline";
          } else if (route.name === "Menus") {
            iconName = "book-outline";
          } else if (route.name === "Offers") {
            iconName = "pricetag-outline";
          } else if (route.name === "Add") {
            iconName = "add-circle-outline";
          } else if (route.name === "Balance") {
            iconName = "cash-outline";
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
          "Balance",
          "OfferFormView",
          "MainDrawerNavigator",
        ].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen name="TabHome" component={HomeStack} />
      <Tab.Screen
        name="MainDrawerNavigator"
        component={MainDrawerNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersTab}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="Dishes" component={DishTab} />
      <Tab.Screen name="Menus" component={MenuTab} />
      <Tab.Screen name="Offers" component={OfferTab} />
      <Tab.Screen name="Add" component={AddView} />
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
