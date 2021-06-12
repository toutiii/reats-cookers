import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";
import {getData} from "../helpers/global_helpers";
import {getDishes} from "../helpers/dish_helpers";


export default function DishButton({...props}) {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={
                    getData(
                        getDishes(),
                        props.route.params.tag,
                        props.route.params.isEnabled,
                        'dish_category',
                        'id',
                    )
                }
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View style={{flex: 1, alignItems: 'center'}}><Text style={{fontSize: 20}}>{all_constants.dishes.no_dishes_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_dish.dish_button_container}>
                        <TouchableHighlight
                            onPress={() => {props.navigation.navigate('DishFormView', { item: item });}}
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