import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../views/Dashboard";
import all_constants from "../constants";
import DishFlatlistStackNavigator from "../stack/DishFlatlistStackNavigator";
import DrinkFlatlistStackNavigator from "../stack/DrinkFlatlistStackNavigator";
import OrdersStack from "../stack/OrdersStack";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    console.log("all_constants.screen.width :", all_constants.screen.width);
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName={all_constants.tab.main_tab_navigator.Home}
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: "tomato",
                    tabBarinactiveTintColor: "gray",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
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
                            route.name === all_constants.tab.main_tab_navigator.DrinkFlatList
                        ) {
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
                <Tab.Screen
                    name={all_constants.tab.main_tab_navigator.Home}
                    component={Dashboard}
                />
                <Tab.Screen
                    name={all_constants.tab.main_tab_navigator.OrderFlatList}
                    component={OrdersStack}
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
            </Tab.Navigator>
        </View>
    );
}
