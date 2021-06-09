import React, {Component} from "react";
import {View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import {getData} from "../helpers/global_helpers";
import {getOrders} from "../helpers/order_helpers";
import all_constants from "../constants";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    }

    getOrderList = () => {
        if (this.props.route.params.tag === all_constants.tag.balance.history){
            return this.props.route.params.item;
        }
        return getOrders();
    }

    render() {
        return(
            <View style={styles_balance.container}>
                <BalanceButton
                    balance_list_data={getData(
                        this.getOrderList(),
                        undefined,
                        undefined,
                        undefined,
                        "order_number",
                        [ "order_number", "order_amount", "order_date"]
                    )}
                    allProps={this.props}
                />
            </View>
        )
    }
}