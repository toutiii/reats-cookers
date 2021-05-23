import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import LoginFormView from "./forms/LoginFormView";
import {createStackNavigator} from "@react-navigation/stack";
import MainTabNavigator from "./tab/MainTabNavigator";
import ForgottenPasswordFormView from "./forms/ForgottenPasswordFormView";

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
                        <Stack.Screen name="ForgottenPassword" component={ForgottenPasswordFormView} />
                        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        )
    }
}