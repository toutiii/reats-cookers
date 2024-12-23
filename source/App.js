import React, { Component } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./forms/LoginForm";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from "./forms/SignupForm";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import OTPView from "./views/OTPView";
import DishForm from "./forms/DishForm";
import DrinkForm from "./forms/DrinkForm";
import SettingsPersonalInformationForm from "./forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "./forms/SettingsAddressForm";
import OrdersHistoryStackNavigator from "./stack/OrdersHistoryStackNavigator";
import all_constants from "./constants";
import OrderView from "./components/OrderView";

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <AutocompleteDropdownContextProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName='LoginForm'>
                            <Stack.Screen
                                name='LoginForm'
                                component={LoginForm}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='OTPView'
                                component={OTPView}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='SignupForm'
                                component={SignupForm}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />
                            <Stack.Screen
                                name='MainDrawerNavigator'
                                component={MainDrawerNavigator}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name='DishForm'
                                component={DishForm}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />
                            <Stack.Screen
                                name='DrinkForm'
                                component={DrinkForm}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />
                            <Stack.Screen
                                name='SettingsPersonalInformationForm'
                                component={SettingsPersonalInformationForm}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />
                            <Stack.Screen
                                name='SettingsAddressForm'
                                component={SettingsAddressForm}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />

                            <Stack.Screen
                                name='OrdersHistory'
                                component={OrdersHistoryStackNavigator}
                                options={{ headerShown: false, headerTitle: all_constants.go_back }}
                            />
                            <Stack.Screen name='OrderView' component={OrderView} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </AutocompleteDropdownContextProvider>
        );
    }
}

registerRootComponent(App);
