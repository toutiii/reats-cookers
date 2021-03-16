import React from "react";
import {Text, View} from "react-native";
import styles_balance from '../styles/styles-balance'
import all_constants from "../constants";


export default function Balance({...props}) {
    return(
        <View style={styles_balance.sub_container}>
            <View style={styles_balance.order_number}>
                <Text style={{fontSize: 20}}>{all_constants.order.infos.number}{props.order_number}</Text>
            </View>
            <View style={styles_balance.order_balance}>
                <Text style={{fontSize: 20}}>{props.order_balance}</Text>
            </View>
        </View>
    )
}