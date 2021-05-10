import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BalanceListView from "../listviews/BalanceListView";
import all_constants from "../constants";

const Tab = createMaterialTopTabNavigator();

export default function BalanceTab () {
    return(
        <Tab.Navigator
            initialRouteName='PendingBalance'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
            }}
        >
            <Tab.Screen
                name="PendingBalance"
                component={BalanceListView}
                options={{ title: 'EN ATTENTE' }}
                initialParams={{tag: all_constants.tag.balance.pending}}
            />
            <Tab.Screen
                name="HistoryBalance"
                component={BalanceListView}
                options={{ title: 'HISTORIQUE' }}
                initialParams={{tag: all_constants.tag.balance.history}}
            />
        </Tab.Navigator>
    )
}