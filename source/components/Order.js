import {Text, View} from "react-native";
import styles_order from "../styles/styles-order";
import all_constants from "../constants";
import React from "react";
import HorizontalLine from "./HorizontalLine";


export default function Order({...props}) {
    return(
        <View style={{flex: 1,}}>
            <View style={styles_order.order_number}>
                <Text
                    style={{fontSize: 26, color: props.order_number_color}}>{all_constants.order.infos.number} {props.order_number}
                </Text>
            </View>
            {
                props.use_horizontal_line && props.line_width ?
                    <View style={{flex: 1}}>
                        <HorizontalLine
                            line_width={props.line_width}
                        />
                    </View>
                    :
                    <View style={{flex: 1}}></View>
            }
            <View style={styles_order.order_element}>
                <Text style={{fontSize: 16,}}>{all_constants.order.infos.owner} {props.order_owner} {all_constants.order.infos.ordered_label} {props.order_date} </Text>
            </View>

            <View style={styles_order.order_element}>
                <Text style={{fontSize: 16,}}>{all_constants.order.infos.delivered_label} {props.order_delivery_date} </Text>
            </View>

            <View style={styles_order.order_element}>
                <Text style={{fontSize: 16,}}>{all_constants.order.infos.status} {props.order_status} </Text>
            </View>

            {
                props.order_status === all_constants.order.status.canceled ?
                    <View style={styles_order.order_element}>
                        <Text style={{fontSize: 16, color: 'red'}}>{all_constants.order.infos.canceled_label} {props.order_cancel_date} </Text>
                    </View>
                    :
                    <View></View>
            }
            <View style={styles_order.order_element}>
                <Text style={{fontSize: 16,}}>{all_constants.order.infos.amount} {props.order_amount}{all_constants.currency_symbol} </Text>
            </View>
        </View>
    )
}