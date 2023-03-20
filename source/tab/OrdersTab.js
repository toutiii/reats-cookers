import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import all_constants from "../constants";
import OrderFlatList from "../flatlist/OrderFlatList";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTab() {
  return (
    <Tab.Navigator
      initialRouteName="PaidOrders"
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "grey",
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="PaidOrders"
        component={OrderFlatList}
        options={{ title: all_constants.tab.order_tab.title.paid }}
        initialParams={{ tag: all_constants.tag.orders.paid }}
      />
      <Tab.Screen
        name="CancelledOrders"
        component={OrderFlatList}
        options={{ title: all_constants.tab.order_tab.title.cancelled }}
        initialParams={{ tag: all_constants.tag.orders.canceled }}
      />
    </Tab.Navigator>
  );
}
