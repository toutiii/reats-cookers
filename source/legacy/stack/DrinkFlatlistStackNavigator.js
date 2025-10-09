import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrinkFlatlist from "../flatlist/DrinkFlatList";
import DrinkForm from "../forms/DrinkForm";
import all_constants from "../constants";

const Stack = createStackNavigator();

export default function DrinkFlatlistStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='DrinkFlatlistStackNavigatorHome'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='DrinkFlatlistStackNavigatorHome' component={DrinkFlatlist} />
            <Stack.Screen
                name='DrinkFlatlistStackNavigatorDrinkFormView'
                component={DrinkForm}
                options={{ headerShown: true, headerTitle: all_constants.go_back }}
            />
        </Stack.Navigator>
    );
}
