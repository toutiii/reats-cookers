import {StyleSheet} from "react-native";
import React from "react";

let styles_order;

export default styles_order = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    order_button_container: {
        flex: 1,
        aspectRatio: 16/9,
        margin: '3%',
        width: '95%',
    },
    order_number: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    order_element: {
        flex: 1,
        paddingLeft: '5%',
    },
})