import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";
import StateTab from "./StateTab";
import DishFlatList from "../button/DishFlatList";


const Tab = createMaterialTopTabNavigator();

export default function DishTab () {
    return(
        <Tab.Navigator
            initialRouteName='Dishes'
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'grey',
                labelStyle: {
                    fontSize: 12,
                },
                style: {
                    marginTop: '7%'
                },
                scrollEnabled: true
            }}
        >
            <Tab.Screen
                name="Starters"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.starter}}
                initialParams={{
                    tag: all_constants.tag.dishes.starter,
                    child_component: DishFlatList
                }}
            />
            <Tab.Screen
                name="Dishes"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.main_dish}}
                initialParams={{
                    tag: all_constants.tag.dishes.dish,
                    child_component: DishFlatList
                }}
            />
            <Tab.Screen
                name="Desserts"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.dessert}}
                initialParams={{
                    tag: all_constants.tag.dishes.dessert,
                    child_component: DishFlatList
                }}
            />
            <Tab.Screen
                name="Drinks"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.drinks}}
                initialParams={{
                    tag: all_constants.tag.dishes.drink,
                    child_component: DishFlatList
                }}
            />
        </Tab.Navigator>
    )
}