import React, { Component } from "react";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./legacy/forms/LoginForm";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./legacy/drawer/MainDrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from "./legacy/forms/SignupForm";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import OTPView from "./legacy/views/OTPView";
import DishForm from "./legacy/forms/DishForm";
import DrinkForm from "./legacy/forms/DrinkForm";
import SettingsPersonalInformationForm from "./legacy/forms/SettingsPersonalInformationForm";
import SettingsAddressForm from "./legacy/forms/SettingsAddressForm";
import OrdersHistoryStackNavigator from "./legacy/stack/OrdersHistoryStackNavigator";
import all_constants from "./legacy/constants";
import OrderView from "./legacy/components/OrderView";
import AcceptanceRateInfosView from "./legacy/views/AcceptanceRateInfosView";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (

    <GluestackUIProvider mode="dark">
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
                            <Stack.Screen
                                name='AcceptanceRateInfosView'
                                component={AcceptanceRateInfosView}
                                options={{ headerShown: true, headerTitle: all_constants.go_back }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </AutocompleteDropdownContextProvider>
    </GluestackUIProvider>

        );
    }
}

registerRootComponent(App);
