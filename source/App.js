import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import OrdersTab from "./tab/OrdersTab";
import DishTab from "./tab/DishTab";
import BalanceTab from "./tab/BalanceTab";
import HomeStack from "./stack/HomeStack";
import OrderView from "./views/OrderView";
import DishFormView from "./forms/DishFormView";
import MenuFormView from "./forms/MenuFormView";
import SettingsCredentialsForm from "./forms/SettingsCredentialsForm";
import SettingsPersonalInformationForm from "./forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "./forms/SettingsAddressForm";
import SettingsOrderInformationForm from "./forms/SettingsOrderInformationForm";
import MenuTab from "./tab/MenuTab";
import OfferTab from "./tab/OfferTab";
import OfferFormView from "./forms/OfferFormView";
import AddView from "./views/AddView";
import LoginFormView from "./forms/LoginFormView";
import {createStackNavigator} from "@react-navigation/stack";
import HomeView from "./views/HomeView";
import all_constants from "./constants";
import SettingsView from "./views/SettingsView";
import MainTabNavigator from "./tab/MainTabNavigator";

const Stack = createStackNavigator();

export default class App extends Component {
    render () {
        return (
            <AppearanceProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false
                        }}
                        initialRouteName='Signin'
                    >
                        <Stack.Screen name="Signin" component={LoginFormView} />
                        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        )
    }
}