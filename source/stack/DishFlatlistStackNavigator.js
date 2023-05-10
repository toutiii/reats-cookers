import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DishFlatList from "../flatlist/DishFlatList";
import DishFormView from "../forms/DishFormView";

const Stack = createStackNavigator();

export default function DishFlatlistStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="DishFlatlistStackNavigatorHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="DishFlatlistStackNavigatorHome"
        component={DishFlatList}
      />
      <Stack.Screen
        name="DishFlatlistStackNavigatorDishFormView"
        component={DishFormView}
      />
    </Stack.Navigator>
  );
}
