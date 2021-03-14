import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";


export default function DishButton({...props}) {
    return (
        <View>
            <FlatList
                data={props.dish_list_data}
                ListEmptyComponent={
                    <View><Text style={{fontSize: 20}}>{all_constants.dishes.no_dishes_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_dish.dish_button_container}>
                        <TouchableHighlight
                            onPress={props.onPress}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Dish
                                key={item.key}
                                dish_photo={item.dish_photo}
                                dish_name={item.dish_name}
                                dish_category={item.dish_category}
                                dish_rating={item.dish_rating}
                                dish_price={item.dish_price}
                                dish_description={item.dish_description}
                                onPress={item.onPress}
                            />
                        </TouchableHighlight>
                        <HorizontalLine/>
                    </View>
                )}
            />
        </View>
    )
}