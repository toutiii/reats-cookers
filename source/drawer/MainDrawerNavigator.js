import React from "react";
import HomeView from "../views/HomeView";
import SimpleView from "../views/SimpleView";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home"
            screenOptions={{ drawerPosition: 'left', headerShown: false, drawerStyle: { right: 0 } }}>
            <Drawer.Screen name="Home" component={HomeView} />
            <Drawer.Screen name="Mes Commandes" component={SimpleView} />
            <Drawer.Screen name="Paramètres" component={SimpleView} />
            <Drawer.Screen name="soldes" component={SimpleView} />
            <Drawer.Screen name="Statistiques" component={SimpleView} />
            <Drawer.Screen name="Déconnexion" component={SimpleView} />
        </Drawer.Navigator>
    );
}