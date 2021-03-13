import React from "react";
import {TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";


export default function DishButton({...props}) {
    return (
        <View style={styles_dish.dish_button_container}>
            <TouchableHighlight
                onPress={props.onPress}
                style={{flex: 1}}
                underlayColor={all_constants.colors.inputBorderColor}
            >
                <Dish
                    dish_photo={props.dish_photo}
                    dish_name={props.dish_name}
                    dish_category={props.dish_category}
                    dish_rating={props.dish_rating}
                    dish_price={props.dish_price}
                    dish_description={props.dish_description}
                    onPress={props.onPress}
                />
            </TouchableHighlight>
            <HorizontalLine/>
        </View>

    )
}