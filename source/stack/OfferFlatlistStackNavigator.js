import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OfferFlatList from "../flatlist/OfferFlatList";
import OfferForm from "../forms/OfferForm";

const Stack = createStackNavigator();

export default function OfferFlatlistStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OfferFlatlistStackNavigatorHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="OfferFlatlistStackNavigatorHome"
        component={OfferFlatList}
      />
      <Stack.Screen
        name="OfferFlatlistStackNavigatorOfferFormView"
        component={OfferForm}
      />
    </Stack.Navigator>
  );
}
