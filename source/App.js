import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginForm from "./forms/LoginForm";
import { createStackNavigator } from "@react-navigation/stack";
import ForgottenPasswordForm from "./forms/ForgottenPasswordForm";
import all_constants from "./constants";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import SignupForm from "./forms/SignupForm";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginForm">
            <Stack.Screen
              name="LoginForm"
              component={LoginForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignupForm"
              component={SignupForm}
              options={{ headerShown: true, headerTitle: "" }}
            />
            <Stack.Screen
              name="Signin"
              component={LoginForm}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgottenPassword"
              component={ForgottenPasswordForm}
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
      </SafeAreaView>
    );
  }
}
