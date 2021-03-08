import React from "react";
import {Image, Text, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import {useColorScheme} from 'react-native-appearance';


export default function Dish({...props}) {
    const colorScheme = useColorScheme();
    return (
        <View style={[
            styles_dish.dish_container,
            {borderColor: colorScheme === 'light' ? 'black': 'white'}
        ]}>
            <TouchableHighlight
                onPress={props.onPress}
                style={{flex: 1}}
                underlayColor={all_constants.colors.inputBorderColor}
            >
                <View style={{flex: 1,}}>
                    <View style={{flex: 2,}}>
                        <Image
                            source={{uri: props.dish_photo}}
                            style={styles_dish.images}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <View style={styles_dish.dish_price}>
                            <Text style={{fontSize: 20}}> {props.dish_price} </Text>
                        </View>
                        <View style={styles_dish.dish_name}>
                            <Text numberOfLines={1} style={{fontSize: 20}}> {props.dish_name} </Text>
                        </View>
                        <View style={styles_dish.dish_rating}>
                            <Image
                                source={{uri: all_constants.uri.rating_star}}
                                style={styles_dish.rating_star}
                            />
                            <Text style={{fontSize: 14}}> {props.dish_rating} </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        </View>

    )
}