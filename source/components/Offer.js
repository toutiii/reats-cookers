import {Image, Text, View} from "react-native";
import React from "react";
import all_constants from "../constants";


export default function Offer ({...props}) {
    return(
        <View style={{flex: 1}}>
            <View style={{flex: 2,}}>
                <Image
                    source={{uri: props.dish_photo}}
                    style={{flex: 1}}
                />
            </View>
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 20}}> {props.dish_name} </Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Text numberOfLines={1} style={{fontSize: 16}}>
                        {all_constants.offer.offer_message_start} {}
                        {props.offer_quantity} {props.dish_name} {}
                        {all_constants.offer.offer_message_end} {}
                        {props.offer_price} {}
                        {all_constants.currency_symbol}
                    </Text>
                </View>
            </View>
        </View>
    )
}