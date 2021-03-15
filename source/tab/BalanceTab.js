import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomingCashListView from "../views/IncomingCashListView";
import CashHistoryListView from "../views/CashHistoryListView";

const Tab = createMaterialTopTabNavigator();

export default function BalanceTab () {
    return(
        <Tab.Navigator
            initialRouteName='Incoming'
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
            <Tab.Screen name="IncomingCash" component={IncomingCashListView} options={{ title: 'EN ATTENTE' }}/>
            <Tab.Screen name="CashHistory" component={CashHistoryListView} options={{ title: 'HISTORIQUE' }} />
        </Tab.Navigator>
    )
}