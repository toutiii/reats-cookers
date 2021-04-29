import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MenuListView from "../listviews/MenuListView";
import all_constants from "../constants";
import StateTab from "./StateTab";
import MenuFormView from "../forms/MenuFormView";


const Tab = createMaterialTopTabNavigator();

export default function MenuTab () {
    return(
        <Tab.Navigator
            initialRouteName='Menus'
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
                name="Menus"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.menu}}
                initialParams={{
                    tag: all_constants.tag.dishes.menu,
                    child_component: MenuListView
                }}
            />
            <Tab.Screen
                name="Add"
                component={MenuFormView}
                options={{ title: all_constants.tab.dish_tab.title.add_item}}
                initialParams={{item: {}}}
            />
        </Tab.Navigator>
    )
}