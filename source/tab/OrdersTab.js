import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";
import HistoryFormView from "../forms/HistoryFormView";
import HistoryStack from "../stack/HistoryStack";
import OrderButton from "../button/OrderButton";

const Tab = createMaterialTopTabNavigator();

export default function OrdersTab () {
    return(
        <Tab.Navigator
            initialRouteName='PaidOrders'
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
                component={OrderButton}
                options={{ title: all_constants.tab.order_tab.title.paid }}
                initialParams={{tag: all_constants.tag.orders.paid,}}
            />
            <Tab.Screen
                name="CancelledOrders"
                component={OrderButton}
                options={{ title: all_constants.tab.order_tab.title.cancelled }}
                initialParams={{tag: all_constants.tag.orders.canceled,}}
            />
            <Tab.Screen
                name="HistoryStack"
                component={HistoryStack}
                options={{ title: all_constants.tab.order_tab.title.history }}
                initialParams={{tag: all_constants.tag.orders.archived}}
            />
        </Tab.Navigator>
    )
}