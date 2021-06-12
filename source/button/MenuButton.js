import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_menu from '../styles/styles-menu.js'
import all_constants from "../constants";
import Menu from "../components/Menu"
import HorizontalLine from "../components/HorizontalLine";


export default function OrderButton({...props}) {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={props.menu_list_data}
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View><Text style={{fontSize: 20}}>{all_constants.menu.no_menu_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_menu.menu_button_container}>
                        <TouchableHighlight
                            onPress={() => {props.allProps.navigation.navigate('MenuFormView', { item: item });}}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Menu
                                key={item.key}
                                menu_name={item.menu_name}
                                menu_starter={item.menu_starter}
                                menu_dish={item.menu_main_dish}
                                menu_dessert={item.menu_dessert}
                                menu_drink={item.menu_drink}
                                menu_price={item.menu_price + all_constants.currency_symbol}
                                menu_comment={item.menu_comment}
                            />
                        </TouchableHighlight>
                        <HorizontalLine/>
                    </View>
                )}
            />
        </View>
    )
}