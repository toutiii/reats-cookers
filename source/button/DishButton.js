import React from "react";
import {TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";


export default function DishButton({...props}) {
    return (
        <View style={styles_dish.dish_button_container}>
            <TouchableHighlight
                onPress={props.onPress}
                style={{flex: 1}}
                underlayColor={all_constants.colors.inputBorderColor}
            >
                <Dish
                    dish_photo={this.getDishPhoto()}
                    dish_name={this.getDishName()}
                    dish_category={this.getDishCategory()}
                    dish_rating={this.getDishRating()}
                    dish_price={this.getDishPrice()}
                    dish_description={this.getDishDescription()}
                    onPress={this.onPress}
                />
            </TouchableHighlight>
           <HorizontalLine/>
        </View>

    )
}