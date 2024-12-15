import React from "react";
import { Text, View } from "react-native";
import styles_balance from "../styles/styles-balance";
import all_constants from "../constants";

export default function Balance({ ...props }) {
    return (
        <View style={styles_balance.sub_container}>
            <View style={styles_balance.order_date}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>{props.order_date}</Text>
            </View>
            <View style={styles_balance.order_number}>
                <Text style={{ fontSize: 18 }}>
                    {all_constants.order.infos.number}
                    {props.order_number}
                </Text>
            </View>
            <View style={styles_balance.order_balance}>
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                    {props.order_balance}
                    {all_constants.currency_symbol}
                </Text>
            </View>
        </View>
    );
}
