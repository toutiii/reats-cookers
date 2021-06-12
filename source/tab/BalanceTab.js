import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";
import HistoryStack from "../stack/HistoryStack";
import BalanceButton from "../button/BalanceButton";

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
                component={BalanceButton}
                options={{ title: all_constants.tab.balance_tab.title.pending }}
                initialParams={{tag: all_constants.tag.balance.pending}}
            />
            <Tab.Screen
                name="HistoryStack"
                component={HistoryStack}
                options={{ title: all_constants.tab.balance_tab.title.history }}
                initialParams={{tag: all_constants.tag.balance.history}}
            />
        </Tab.Navigator>
    )
}