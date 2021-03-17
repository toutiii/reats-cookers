import React from "react";
import {Text, View} from "react-native";
import styles_menu from '../styles/styles-menu'
import all_constants from "../constants";
import HorizontalLine from "./HorizontalLine";


export default function Menu({...props}) {
    return(
        <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                    {props.menu_name ? all_constants.menu.label.menu_name + ' ' + props.menu_name : all_constants.menu.label.menu_name}
                </Text>
                <HorizontalLine/>
            </View>
            <View style={{flex: 5}}>
                {
                    props.menu_starter ?
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles_menu.dish_label}>{all_constants.menu.label.starter}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={styles_menu.menu_element}>{props.menu_starter}</Text>
                            </View>
                        </View>
                    :
                        <View></View>
                }
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flex: 1}}>
                        <Text style={styles_menu.dish_label}>{all_constants.menu.label.dish}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text numberOfLines={1} style={styles_menu.menu_element}>{props.menu_dish}</Text>
                    </View>
                </View>
                {
                    props.menu_dessert ?
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles_menu.dish_label}>{all_constants.menu.label.dessert}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={styles_menu.menu_element}>{props.menu_dessert}</Text>
                            </View>
                        </View>
                    :
                        <View></View>
                }
                {
                    props.menu_drink ?
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{flex: 1}}>
                                <Text style={styles_menu.dish_label}>{all_constants.menu.label.drink}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text numberOfLines={1} style={styles_menu.menu_element}>{props.menu_drink}</Text>
                            </View>
                        </View>
                    :
                        <View></View>
                }
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 18, color: 'black'}}>
                    {props.menu_price}
                </Text>
            </View>
        </View>
    )
}