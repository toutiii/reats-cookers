import Ionicons from "@expo/vector-icons/Ionicons";
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
import Dashboard from "../views/Dashboard";
import HomeView from "../views/HomeView";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeView"
      screenOptions={({ route }) => ({
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeView") {
            iconName = "home-outline";
          } else if (route.name === "Orders") {
            iconName = "basket-outline";
          } else if (route.name === "TabDishes") {
            iconName = "restaurant-outline";
          } else if (route.name === "TabMenus") {
            iconName = "book-outline";
          } else if (route.name === "TabOffers") {
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
        ].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
      })}
    >
      <Tab.Screen name="HomeView" component={Dashboard} />
      <Tab.Screen
        name="Orders"
        component={OrdersTab}
        options={{ tabBarBadge: 3 }}
      />
      <Tab.Screen name="TabDishes" component={DishTab} />
      <Tab.Screen name="TabMenus" component={MenuTab} />
      <Tab.Screen name="TabOffers" component={OfferTab} />
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
