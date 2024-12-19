import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import all_constants from "../constants";
import OrdersTopTab from "../toptabs/OrdersTopTab";
import OrderView from "../components/OrderView";

const Stack = createStackNavigator();

export default class OrdersStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name={"Home"}
                    component={OrdersTopTab}
                    options={{
                        headerShown: true,
                        title: all_constants.pending_orders_view.main_title,
                    }}
                />
                <Stack.Screen
                    name='OrderDetailView'
                    component={OrderView}
                    options={{
                        headerShown: true,
                        title: all_constants.pending_orders_view.stack_navigator.order_item_detail
                            .title,
                    }}
                />
            </Stack.Navigator>
        );
    }
}
