import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DishListView from "../views/DishListView";
import DessertsListView from "../views/DessertsListView";
import StartersListView from "../views/StartersListView";
import DrinksListView from "../views/DrinksListView";

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
                    marginTop: '10%'
                },
            }}
        >
            <Tab.Screen name="Starters" component={StartersListView} options={{ title: 'ENTRÉES' }}/>
            <Tab.Screen name="Dishes" component={DishListView} options={{ title: 'PLATS' }} />
            <Tab.Screen name="Desserts" component={DessertsListView} options={{ title: 'DÉSSERTS' }} />
            <Tab.Screen name="Drinks" component={DrinksListView} options={{ title: 'BOISSONS' }} />
        </Tab.Navigator>
    )
}