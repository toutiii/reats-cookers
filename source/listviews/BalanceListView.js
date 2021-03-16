import React, {Component} from "react";
import {Alert, View} from "react-native";
import BalanceButton from "../button/BalanceButton"
import styles_balance from "../styles/styles-balance"
import all_constants from "../constants";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
        this.balance_list_data = [
            {
                id :'1',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'2',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'3',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'4',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'5',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'6',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'7',
                order_number: '123365',
                order_amount: '50€',
            },
            {
                id :'8',
                order_number: '123365',
                order_amount: '50€',
            },
        ]
    }

    getData = () => {
        if (this.props.route.params.tag === all_constants.tag.balance.pending) {
            return this.balance_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.balance.history) {
            return this.balance_list_data
        }
    }
    onPress = () => {
        Alert.alert('ZA WARUDO')
    }
    render() {
        return(
            <View style={styles_balance.container}>
                <BalanceButton
                    balance_list_data={this.getData()}
                    onPress={this.onPress}
                />
            </View>
        )
    }
}