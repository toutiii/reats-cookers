import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderListView from "../listviews/OrderListView";
import all_constants from "../constants";
import OrderPaidStack from "../stack/OrderPaidStack";
import AllOrderStack from "../stack/AllOrderStack";
import OrderCancelledStack from "../stack/OrderCancelledStack";
import OrderHistoryStack from "../stack/OrderHistoryStack";

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
                name="AllOrder"
                component={AllOrderStack}
                options={{ title: 'TOUTES' }}
            />
            <Tab.Screen
                name="PaidOrder"
                component={OrderPaidStack}
                options={{ title: 'PAYÉES' }}
            />
            <Tab.Screen
                name="CancelledOrder"
                component={OrderCancelledStack}
                options={{ title: 'ANNULÉES' }}
            />
            <Tab.Screen
                name="HistoryOrder"
                component={OrderHistoryStack}
                options={{ title: 'HISTORIQUE' }}
            />
        </Tab.Navigator>
    )
}