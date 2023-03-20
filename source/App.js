import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginFormView from "./forms/LoginFormView";
import { createStackNavigator } from "@react-navigation/stack";
import ForgottenPasswordFormView from "./forms/ForgottenPasswordFormView";
import all_constants from "./constants";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import MainTabNavigator from "./tab/MainTabNavigator";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainDrawerNavigator">
          <Stack.Screen
            name="Signin"
            component={LoginFormView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgottenPassword"
            component={ForgottenPasswordFormView}
            options={{
              title: all_constants.label.form.forgotten_password.title,
            }}
          />
          <Stack.Screen
            name="MainDrawerNavigator"
            component={MainDrawerNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
