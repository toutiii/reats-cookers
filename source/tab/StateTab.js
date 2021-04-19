import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";


const Tab = createMaterialTopTabNavigator();

export default function StateTab ({...props}){
    return(
        <Tab.Navigator
            initialRouteName='EnabledItems'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    marginTop: '1%'
                },
                scrollEnabled: false
            }}
        >
            <Tab.Screen
                name="EnabledItems"
                component={props.route.params.child_component}
                options={{ title: all_constants.tab.state_tab.title.enabled_items}}
                initialParams={{
                    isEnabled: true,
                    tag: props.route.params.tag
                }}
            />
            <Tab.Screen
                name="DisabledItems"
                component={props.route.params.child_component}
                options={{ title: all_constants.tab.state_tab.title.disabled_items}}
                initialParams={{
                    isEnabled: false,
                    tag: props.route.params.tag
                }}
            />
        </Tab.Navigator>
    )
}