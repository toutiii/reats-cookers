import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance'
import LoginFormView from "./forms/LoginFormView";
import {createStackNavigator} from "@react-navigation/stack";
import MainTabNavigator from "./tab/MainTabNavigator";
import ForgottenPasswordFormView from "./forms/ForgottenPasswordFormView";
import all_constants from "./constants";

const Stack = createStackNavigator();

export default class App extends Component {
    render () {
        return (
            <AppearanceProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: true
                        }}
                        initialRouteName='Signin'
                    >
                        <Stack.Screen
                            name="Signin"
                            component={LoginFormView}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="ForgottenPassword"
                            component={ForgottenPasswordFormView}
                            options={{title: all_constants.label.form.forgotten_password.title}}
                        />
                        <Stack.Screen
                            name="MainTabNavigator"
                            component={MainTabNavigator}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </AppearanceProvider>
        )
    }
}