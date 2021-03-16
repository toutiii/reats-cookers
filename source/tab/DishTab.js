import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DishListView from "../listviews/DishListView";


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
                    marginTop: '5%'
                },
            }}
        >
            <Tab.Screen
                name="Starters"
                component={DishListView}
                options={{ title: 'ENTRÉES'}}
                initialParams={{ tag: 'starter' }}
            />
            <Tab.Screen
                name="Dishes"
                component={DishListView}
                options={{ title: 'PLATS'}}
                initialParams={{ tag: 'dish' }}
            />
            <Tab.Screen
                name="Desserts"
                component={DishListView}
                options={{ title: 'DÉSSERTS'}}
                initialParams={{ tag: 'dessert' }}
            />
            <Tab.Screen
                name="Drinks"
                component={DishListView}
                options={{ title: 'BOISSONS'}}
                initialParams={{ tag: 'drink' }}
            />
        </Tab.Navigator>
    )
}