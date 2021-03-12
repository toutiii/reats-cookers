import React from "react";
import {TouchableHighlight, View} from "react-native";
import styles_order from '../styles/styles-order.js'
import all_constants from "../constants";
import Order from "../components/Order"


export default function OrderButton({...props}) {
    return (
        <View style={
            [
                styles_order.order_container,
                {borderColor: props.order_status === all_constants.order.status.canceled ? 'red': 'green'}
            ]}>
            <TouchableHighlight
                onPress={props.onPress}
                style={{flex: 1}}
                underlayColor={all_constants.colors.inputBorderColor}
            >
                <Order
                    order_number={props.order_number}
                    order_status={props.order_status}
                    order_owner={props.order_owner}
                    order_amount={props.order_amount}
                    order_number_of_items={props.order_number_of_items}
                    order_date={props.order_date}
                    order_cancel_date={props.order_cancel_date}
                    order_delivery_date={props.order_delivery_date}
                />
            </TouchableHighlight>
        </View>

    )
}