import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderPaidStack from "../stack/OrderPaidStack";
import AllOrderStack from "../stack/AllOrderStack";
import OrderCancelledStack from "../stack/OrderCancelledStack";
import OrderHistoryStack from "../stack/OrderHistoryStack";
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
                name="AllOrders"
                component={OrderListView}
                options={{ title: 'TOUTES' }}
                initialParams={{tag: all_constants.tag.orders.all,}}
            />
            <Tab.Screen
                name="PaidOrders"
                component={OrderListView}
                options={{ title: 'PAYÉES' }}
                initialParams={{
                    tag: all_constants.tag.orders.paid,
                    order_number_color: 'green',
                }}
            />
            <Tab.Screen
                name="CancelledOrders"
                component={OrderListView}
                options={{ title: 'ANNULÉES' }}
                initialParams={{
                    tag: all_constants.tag.orders.canceled,
                    order_number_color: 'red',
                }}
            />
            <Tab.Screen
                name="HistoryOrders"
                component={OrderListView}
                options={{ title: 'ARCHIVÉES' }}
                initialParams={{
                    tag: all_constants.tag.orders.archived,
                    order_number_color: 'grey',
                }}
            />
        </Tab.Navigator>
    )
}