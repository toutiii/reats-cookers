import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderListView from "../listviews/OrderListView";
import all_constants from "../constants";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTab () {
    return(
        <Tab.Navigator
            initialRouteName='AllOrders'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    marginTop: '7%'
                },
            }}
        >
            <Tab.Screen
                name="PaidOrders"
                component={OrderListView}
                options={{ title: 'PAYÉES' }}
                initialParams={{tag: all_constants.tag.orders.paid,}}
            />
            <Tab.Screen
                name="CancelledOrders"
                component={OrderListView}
                options={{ title: 'ANNULÉES' }}
                initialParams={{tag: all_constants.tag.orders.canceled,}}
            />
            <Tab.Screen
                name="HistoryOrders"
                component={OrderListView}
                options={{ title: 'ARCHIVÉES' }}
                initialParams={{tag: all_constants.tag.orders.archived,}}
            />
        </Tab.Navigator>
    )
}