import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DishFlatList from "../flatlist/DishFlatList";
import DishForm from "../forms/DishForm";

const Stack = createStackNavigator();

export default function DishFlatlistStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='DishFlatlistStackNavigatorHome'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='DishFlatlistStackNavigatorHome' component={DishFlatList} />
            <Stack.Screen name='DishFlatlistStackNavigatorDishFormView' component={DishForm} />
        </Stack.Navigator>
    );
}
