import React, {Component} from "react";
import {View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import {getData} from "../helpers/global_helpers";
import {getOrders} from "../helpers/order_helpers";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_balance.container}>
                <BalanceButton
                    balance_list_data={getData(
                        getOrders(),
                        undefined,
                        undefined,
                        undefined,
                        "order_number",
                        [ "order_number", "order_amount"]
                    )}
                    allProps={this.props}
                />
            </View>
        )
    }
}