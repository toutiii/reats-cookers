import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_order from '../styles/styles-order.js'
import all_constants from "../constants";
import Order from "../components/Order"


export default function OrderButton({...props}) {
    return (
        <View>
            <FlatList
                data={props.order_list_data}
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View><Text style={{fontSize: 20}}>{all_constants.order.no_order_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_order.order_button_container}>
                        <TouchableHighlight
                            onPress={props.onPress}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Order
                                key={item.key}
                                order_number={item.order_number}
                                order_status={item.order_status}
                                order_owner={item.order_owner}
                                order_amount={item.order_amount}
                                order_number_of_items={item.order_number_of_items}
                                order_date={item.order_date}
                                order_cancel_date={item.order_cancel_date}
                                order_delivery_date={item.order_delivery_date}
                                order_number_color={props.order_number_color}
                                use_horizontal_line={true}
                                line_width={1}
                            />
                        </TouchableHighlight>
                    </View>
                )}
            />
        </View>
    )
}