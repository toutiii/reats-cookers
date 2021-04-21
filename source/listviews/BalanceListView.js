import React, {Component} from "react";
import {View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import all_constants from "../constants";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    getData = () => {
        if (this.props.route.params.tag === all_constants.tag.balance.pending) {
            return this.balance_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.balance.history) {
            return this.balance_list_data
        }
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