import React, {Component} from "react";
import {Text, View} from "react-native";


export default class CanceledOrdersView extends Component{
    render() {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text> CanceledOrders coming soon. </Text>
            </View>
        )
    }
}