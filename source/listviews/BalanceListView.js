import React, {Component} from "react";
import {View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import {getBalanceData} from "../helpers/balance_helpers";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_balance.container}>
                <BalanceButton
                    balance_list_data={getBalanceData()}
                    allProps={this.props}
                />
            </View>
        )
    }
}