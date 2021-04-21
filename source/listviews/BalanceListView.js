import React, {Component} from "react";
import {View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import all_constants from "../constants";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_balance.container}>
                <BalanceButton
                    balance_list_data={this.getData()}
                    allProps={this.props}
                />
            </View>
        )
    }
}