import React from "react";
import SimpleView from "../views/SimpleView";
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function MainDrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{ drawerPosition: 'left', headerShown: false,}}>
            <Drawer.Screen name="Mes Commandes" component={SimpleView} />
            <Drawer.Screen name="Paramètres" component={SimpleView} />
            <Drawer.Screen name="soldes" component={SimpleView} />
            <Drawer.Screen name="Statistiques" component={SimpleView} />
            <Drawer.Screen name="Déconnexion" component={SimpleView} />
        </Drawer.Navigator>
    );
}