import Ionicons from "@expo/vector-icons/Ionicons";
import OrderView from "../views/OrderView";
import DishForm from "../forms/DishForm";
import DrinkForm from "../forms/DrinkForm";
import SettingsPersonalInformationForm from "../forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "../forms/SettingsAddressForm";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../views/Dashboard";
import all_constants from "../constants";
import DishFlatlistStackNavigator from "../stack/DishFlatlistStackNavigator";
import DrinkFlatlistStackNavigator from "../stack/DrinkFlatlistStackNavigator";
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
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === all_constants.tab.main_tab_navigator.Home) {
                        iconName = "home-outline";
                    } else if (route.name === all_constants.tab.main_tab_navigator.OrderFlatList) {
                        iconName = "basket-outline";
                    } else if (route.name === all_constants.tab.main_tab_navigator.DishFlatList) {
                        iconName = "restaurant-outline";
                    } else if (route.name === all_constants.tab.main_tab_navigator.DrinkFlatList) {
                        iconName = "wine-sharp";
                    }
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarButton: [
                    "OrderView",
                    "DishForm",
                    "DrinkForm",
                    "SettingsPersonalInformationForm",
                    "SettingsAddressForm",
                    "OrdersHistory",
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
            })}
        >
            <Tab.Screen name={all_constants.tab.main_tab_navigator.Home} component={Dashboard} />
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.OrderFlatList}
                component={OrderFlatlistStackNavigator}
                // options={{ tabBarBadge: 3 }}
            />
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.DishFlatList}
                component={DishFlatlistStackNavigator}
            />
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.DrinkFlatList}
                component={DrinkFlatlistStackNavigator}
            />

            <Tab.Screen name='OrderView' component={OrderView} />
            <Tab.Screen name='DishForm' component={DishForm} />
            <Tab.Screen name='DrinkForm' component={DrinkForm} />

            <Tab.Screen
                name='SettingsPersonalInformationForm'
                component={SettingsPersonalInformationForm}
            />
            <Tab.Screen name='SettingsAddressForm' component={SettingsAddressForm} />

            <Tab.Screen name='OrdersHistory' component={OrdersHistoryStackNavigator} />
        </Tab.Navigator>
    );
}
