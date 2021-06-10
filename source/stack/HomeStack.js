import React, {Component} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "../views/HomeView";
import OrdersTab from "../tab/OrdersTab";
import BalanceTab from "../tab/BalanceTab";
import SettingsView from "../views/SettingsView";
import all_constants from "../constants";

const Stack = createStackNavigator();


export default class HomeStack extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: true
                }}
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={HomeView} options={{headerShown: false}} />
                <Stack.Screen name="OrdersTab" component={OrdersTab} options={{headerShown: false}} />
                <Stack.Screen
                    name="BalanceTab"
                    component={BalanceTab}
                    options={{title: all_constants.label.balance.title}}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsView}
                    options={{ title: all_constants.label.settings.my_account}}
                />
            </Stack.Navigator>
        )
    }
}