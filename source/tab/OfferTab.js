import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import all_constants from "../constants";
import StateTab from "./StateTab";
import OfferFormView from "../forms/OfferFormView";
import OfferFlatList from "../flatlist/OfferFlatList";


const Tab = createMaterialTopTabNavigator();

export default function OfferTab () {
    return(
        <Tab.Navigator
            initialRouteName='Offers'
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
                name="Offers"
                component={StateTab}
                options={{ title: all_constants.tab.offer_tab.title.offer}}
                initialParams={{
                    tag: all_constants.tag.offer.promotion,
                    child_component: OfferFlatList
                }}
            />
        </Tab.Navigator>
    )
}