import {StyleSheet} from "react-native";
import React from "react";

let styles_balance;
export default styles_balance = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    sub_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems:'stretch',
    },
    balance_button_container: {
        flex: 1,
        aspectRatio: 5/1,
        margin: '3%',
        width: '95%',
        height: '30%',
    },
    order_balance: {
        flex: 1,
        alignItems:'flex-end',
        justifyContent: 'center',
    },
    order_number: {
        flex: 2,
        justifyContent: 'center',
    },
})