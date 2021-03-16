import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PaidOrdersView from "../views/PaidOrdersView";
import CanceledOrdersView from "../views/CanceledOrdersView";
import HistoryOrdersView from "../views/HistoryOrdersView";
import OrderListView from "../listviews/OrderListView";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTab () {
    return(
        <Tab.Navigator
            initialRouteName='Orders'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    marginTop: '5%'
                },
            }}
        >
            <Tab.Screen
                name="AllOrders"
                component={OrderListView}
                options={{ title: 'TOUTES' }}
                initialParams={{tag: 'all'}}
            />
            <Tab.Screen
                name="PaidOrders"
                component={OrderListView}
                options={{ title: 'PAYÉES' }}
                initialParams={{tag: 'paid'}}
            />
            <Tab.Screen
                name="CanceledOrders"
                component={OrderListView}
                options={{ title: 'ANNULÉES' }}
                initialParams={{tag: 'canceled'}}
            />
            <Tab.Screen
                name="HistoryOrders"
                component={OrderListView}
                options={{ title: 'HISTORIQUE' }}
                initialParams={{tag: 'history'}}
            />
        </Tab.Navigator>
    )
}