import React, {Component} from "react";
import { createStackNavigator } from '@react-navigation/stack';
import all_constants from "../constants";
import HistoryFormView from "../forms/HistoryFormView";
import BalanceFlatList from "../flatlist/BalanceFlatList";
import OrderFlatList from "../flatlist/OrderFlatList";

const Stack = createStackNavigator();


export default class HistoryStack extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Stack.Navigator initialRouteName='HistoryOrdersForm'>
                <Stack.Screen
                    name="HistoryOrdersForm"
                    component={HistoryFormView}
                    options={{
                        headerShown: false,
                        title: all_constants.tab.order_tab.title.history
                    }}
                    initialParams={{tag: this.props.route.params.tag}}
                />
                <Stack.Screen
                    name="OrderHistory"
                    component={OrderFlatList}
                    options={{
                        headerShown: true,
                        title: all_constants.tab.order_tab.title.history_order,
                        headerStyle: {
                            height: 60,
                        },
                    }}
                />
                <Stack.Screen
                    name="BalanceHistory"
                    component={BalanceFlatList}
                    options={{
                        headerShown: true,
                        title: all_constants.tab.balance_tab.title.history_balance,
                        headerStyle: {
                            height: 60,
                        },
                    }}
                />
            </Stack.Navigator>
        )
    }
}