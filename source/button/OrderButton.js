import React, {useState} from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_order from '../styles/styles-order.js'
import all_constants from "../constants";
import Order from "../components/Order"
import CustomButton from "./CustomButton";
import OrderModal from "../modals/OrderModal";


export default function OrderButton({...props}) {
    const [modalState, setModalState] = useState(false);
    const onPressShowModal = () => {
        setModalState(true)
    }
    const onPressCloseModal = () => {
        setModalState(false)
    }
    return (
        <View style={{flex: 1}}>
            {
                props.allProps.route.params.tag === all_constants.tag.orders.paid ?
                    <View style={{flex: 1, marginTop: '2%', alignItems: 'center'}}>
                        <CustomButton
                            label={all_constants.modal.order_modal.show}
                            backgroundColor='tomato'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={onPressShowModal}
                        />
                    </View>

                    :
                    <View></View>
            }
            <OrderModal
                state={modalState}
                onPressCloseModal={onPressCloseModal}
            />
            <View style={{flex: props.allProps.route.params.tag === all_constants.tag.orders.paid ? 10 : 1}}>
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
                                onPress={() => { props.allProps.navigation.navigate('OrderView', { item, props })}}
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
                                    order_number_color={item.order_number_color}
                                    order_dishes={item.dishes}
                                    use_horizontal_line={true}
                                    line_width={1}
                                />
                            </TouchableHighlight>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}