import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import all_constants from "../constants";
import OrdersHistoryFlatList from "../flatlist/OrdersHistoryFlatlist";
import OrderView from "../components/OrderView";

const Stack = createStackNavigator();

export default class OrdersHistoryStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName='OrdersHistoryHome'>
                <Stack.Screen
                    name='OrdersHistoryHome'
                    component={OrdersHistoryFlatList}
                    options={{
                        headerShown: true,
                        title: all_constants.go_back,
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
