import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DrinkFlatlist from "../flatlist/DrinkFlatList";
import DrinkForm from "../forms/DrinkForm";

const Stack = createStackNavigator();

export default function DrinkFlatlistStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='DrinkFlatlistStackNavigatorHome'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='DrinkFlatlistStackNavigatorHome' component={DrinkFlatlist} />
            <Stack.Screen name='DrinkFlatlistStackNavigatorDrinkFormView' component={DrinkForm} />
        </Stack.Navigator>
    );
}
