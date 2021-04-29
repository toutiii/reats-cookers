import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DishListView from "../listviews/DishListView";
import MenuListView from "../listviews/MenuListView";
import DishAddView from "../views/DishAddView"
import all_constants from "../constants";
import StateTab from "./StateTab";


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
                    child_component: DishListView
                }}
            />
            <Tab.Screen
                name="Dishes"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.main_dish}}
                initialParams={{
                    tag: all_constants.tag.dishes.dish,
                    child_component: DishListView
                }}
            />
            <Tab.Screen
                name="Desserts"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.dessert}}
                initialParams={{
                    tag: all_constants.tag.dishes.dessert,
                    child_component: DishListView
                }}
            />
            <Tab.Screen
                name="Drinks"
                component={StateTab}
                options={{ title: all_constants.tab.dish_tab.title.drinks}}
                initialParams={{
                    tag: all_constants.tag.dishes.drink,
                    child_component: DishListView
                }}
            />
            <Tab.Screen
                name="Add"
                component={DishAddView}
                options={{ title: all_constants.tab.dish_tab.title.add_item}}
            />
        </Tab.Navigator>
    )
}