import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import HomeView from "./views/HomeView";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BalanceView from "./views/BalanceView";
import SettingsView from "./views/SettingsView";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrdersTab from "./tab/OrdersTab";
import DishTab from "./tab/DishTab";

const Tab = createBottomTabNavigator();

export default class App extends Component {
    render () {
        return (
            <AppearanceProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="Home"
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Home') {
                                    iconName = 'home-outline'
                                } else if (route.name === 'Orders') {
                                    iconName = 'basket-outline';
                                } else if (route.name === 'Dishes') {
                                    iconName = 'fast-food-outline';
                                }else if (route.name === 'Balance') {
                                    iconName = 'cash-outline';
                                }else if (route.name === 'Settings') {
                                    iconName = 'settings-outline';
                                }
                                // You can return any component that you like here!
                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'gray',
                        }}
                    >
                        <Tab.Screen name="Home" component={HomeView} />
                        <Tab.Screen name="Orders" component={OrdersTab} options={{ tabBarBadge: 3 }} />
                        <Tab.Screen name="Dishes" component={DishTab} />
                        <Tab.Screen name="Balance" component={BalanceView} />
                        <Tab.Screen name="Settings" component={SettingsView} />
                    </Tab.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        )
    }
}