import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DishFlatList from "../flatlist/DishFlatList";
import DishFormView from "../forms/DishFormView";

const Stack = createStackNavigator();

export default function DishFlatlistStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="DishFlatlistStackNavigatorHome">
      <Stack.Screen
        name="DishFlatlistStackNavigatorHome"
        component={DishFlatList}
        options={{
          headerShown: false,
          headerMode: "none",
        }}
      />
      <Stack.Screen
        name="DishFlatlistStackNavigatorDishFormView"
        component={DishFormView}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
