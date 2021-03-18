import React, {Component} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import HomeView from "../views/HomeView";
import OrdersTab from "../tab/OrdersTab";
import BalanceTab from "../tab/BalanceTab";

const Stack = createStackNavigator();


export default class HomeStack extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={HomeView} />
                <Stack.Screen name="OrdersTab" component={OrdersTab} />
                <Stack.Screen name="BalanceTab" component={BalanceTab} />
            </Stack.Navigator>
        )
    }
}