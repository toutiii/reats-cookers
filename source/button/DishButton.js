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
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View><Text style={{fontSize: 20}}>{all_constants.dishes.no_dishes_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_dish.dish_button_container}>
                        <TouchableHighlight
                            onPress={() => {props.allProps.navigation.navigate('DishFormView', { item: item });}}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Dish
                                key={item.id}
                                dish_photo={item.photo}
                                dish_name={item.dish_name}
                                dish_category={item.dish_category}
                                dish_rating={item.dish_rating}
                                dish_price={item.dish_price + all_constants.currency_symbol}
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