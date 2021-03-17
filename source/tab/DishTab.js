import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DishListView from "../listviews/DishListView";
import MenuListView from "../listviews/MenuListView";
import all_constants from "../constants";


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
            }}
        >
            <Tab.Screen
                name="Starters"
                component={DishListView}
                options={{ title: 'ENTRÉES'}}
                initialParams={{ tag: all_constants.tag.dishes.starter }}
            />
            <Tab.Screen
                name="Dishes"
                component={DishListView}
                options={{ title: 'PLATS'}}
                initialParams={{ tag: all_constants.tag.dishes.dish }}
            />
            <Tab.Screen
                name="Desserts"
                component={DishListView}
                options={{ title: 'DÉSSERTS'}}
                initialParams={{ tag: all_constants.tag.dishes.dessert }}
            />
            <Tab.Screen
                name="Drinks"
                component={DishListView}
                options={{ title: 'BOISSONS'}}
                initialParams={{ tag: all_constants.tag.dishes.drink}}
            />
            <Tab.Screen
                name="Menus"
                component={MenuListView}
                options={{ title: 'MENUS'}}
            />
        </Tab.Navigator>
    )
}