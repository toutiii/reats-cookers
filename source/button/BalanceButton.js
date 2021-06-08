import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_balance from '../styles/styles-balance.js'
import all_constants from "../constants";
import Balance from "../components/Balance"
import HorizontalLine from "../components/HorizontalLine";
import {getDataFromUniqueField} from "../helpers/global_helpers";
import {getOrders} from "../helpers/order_helpers";


export default function BalanceButton({...props}) {
    return (
        <View style={{marginTop: props.allProps.route.params.tag === all_constants.tag.balance.history ? '15%' : '0%'}}>
            {
                props.allProps.route.params.tag === all_constants.tag.balance.history && (
                    <Text style={{fontSize: 18, textAlign: 'center'}}> {all_constants.tab.balance_tab.title.history_balance} </Text>
                )
            }
            <FlatList
                data={props.balance_list_data}
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View><Text style={{fontSize: 20}}>{all_constants.order.no_balance_found}</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_balance.balance_button_container}>
                        <TouchableHighlight
                            onPress={() => {
                                props.allProps.navigation.navigate('OrderView', {item: getDataFromUniqueField(getOrders(), item.order_number)})
                            }}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Balance
                                key={item.key}
                                order_number={item.order_number}
                                order_balance={item.order_amount}
                                use_horizontal_line={true}
                                line_width={1}
                            />
                        </TouchableHighlight>
                        <HorizontalLine/>
                    </View>
                )}
            />
        </View>
    )
}