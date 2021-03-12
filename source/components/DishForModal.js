import {Image, Text, View} from "react-native";
import all_constants from "../constants";
import React from "react";
import styles_dish_for_modal from '../styles/styles-dish-for-modal'
import HorizontalLine from "./HorizontalLine";


export default function DishForModal({...props}) {
    return(
        <View style={{flex: 1,}}>
            <View style={styles_dish_for_modal.container}>
                <View style={{flex: 1, aspectRatio: 1,}}>
                    <Image
                        source={{uri: props.dish_photo}}
                        style={{flex: 1}}
                    />
                </View>
                <View style={{flex: 1, aspectRatio: 1}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text numberOfLines={1} style={{fontSize: 24}}> {props.dish_name} </Text>
                    </View>
                    <View style={{flex: 4,}}>
                        <View style={{flex: 1,}}>
                            <Text style={{fontSize: 16}}> {'\u2022'} {props.dish_order_date}</Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{fontSize: 16}}> {'\u2022'} {all_constants.order.infos.number_of_items} {props.dish_quantity}</Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{fontSize: 16}}> {'\u2022'} {all_constants.order.infos.unit_price} {props.dish_unit_price}</Text>
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={{fontSize: 16}}> {'\u2022'} {all_constants.order.infos.total} 50€</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text numberOfLines={1} style={{fontSize: 16}}> {'\u2022'} {props.dish_order_status}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <HorizontalLine/>
        </View>

    )
}
