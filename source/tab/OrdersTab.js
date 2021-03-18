import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderListView from "../listviews/OrderListView";
import all_constants from "../constants";
import OrderStack from "../stack/OrderStack";

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
                component={OrderStack}
                options={{ title: 'TOUTES' }}
                initialParams={{tag: all_constants.tag.orders.all}}
            />
            <Tab.Screen
                name="PaidOrders"
                component={OrderStack}
                options={{ title: 'PAYÉES' }}
                initialParams={{tag: all_constants.tag.orders.paid, order_number_color: 'green'}}
            />
            <Tab.Screen
                name="CanceledOrders"
                component={OrderStack}
                options={{ title: 'ANNULÉES' }}
                initialParams={{tag: all_constants.tag.orders.canceled, order_number_color: 'red'}}
            />
            <Tab.Screen
                name="HistoryOrders"
                component={OrderStack}
                options={{ title: 'HISTORIQUE' }}
                initialParams={{tag: all_constants.tag.orders.history}}
            />
        </Tab.Navigator>
    )
}