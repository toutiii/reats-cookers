import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PaidOrdersView from "../views/PaidOrdersView";
import CanceledOrdersView from "../views/CanceledOrdersView";
import HistoryOrdersView from "../views/HistoryOrdersView";
import OrderListView from "../views/OrderListView";

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
            <Tab.Screen name="Orders" component={OrderListView} options={{ title: 'TOUTES' }}/>
            <Tab.Screen name="PaidOrders" component={PaidOrdersView} options={{ title: 'PAYÉES' }} />
            <Tab.Screen name="CanceledOrders" component={CanceledOrdersView} options={{ title: 'ANNULÉES' }} />
            <Tab.Screen name="HistoryOrders" component={HistoryOrdersView} options={{ title: 'HISTORIQUE' }} />
        </Tab.Navigator>
    )
}