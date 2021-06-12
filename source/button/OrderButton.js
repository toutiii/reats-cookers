import React, {useState} from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_order from '../styles/styles-order.js'
import all_constants from "../constants";
import Order from "../components/Order"
import CustomButton from "./CustomButton";
import OrderModal from "../modals/OrderModal";
import {getData} from "../helpers/global_helpers";
import {getOrders} from "../helpers/order_helpers";


export default function OrderButton({...props}) {
    const [modalState, setModalState] = useState(false);
    const onPressShowModal = () => {
        setModalState(true)
    }
    const onPressCloseModal = () => {
        setModalState(false)
    }
    const buildDishDataForOrderModal = () => {
        // We do this only for paid orders
        if (props.allProps.route.params.tag === all_constants.tag.orders.paid) {
            const orders_data = props.order_list_data;
            const indexes = Object.keys(orders_data)
            let orderModalData = {};
            let orderTotalAmount = 0;
            let totalNumberOfDishes = 0;
            for (let i = 0; i < indexes.length; i++) {
                const orderItemObject = orders_data[i];
                const dishIndexes = Object.keys(orderItemObject['dishes']);
                for (let j = 0; j < dishIndexes.length; j++) {
                    const dishItemObject = orderItemObject['dishes'][j];
                    totalNumberOfDishes += parseInt(dishItemObject['dish_quantity']);
                    orderTotalAmount += ((parseInt(dishItemObject['dish_quantity'])) * parseInt(dishItemObject['dish_unit_price']));
                    for (let dishKey in dishItemObject){
                        if (dishKey === 'dish_name') {
                            const dishName = dishItemObject[dishKey]
                            if (Object.keys(orderModalData).includes(dishName)){
                                orderModalData[dishName][0] += parseInt(dishItemObject['dish_quantity']);
                            }
                            else{
                                orderModalData[dishName] = [
                                    parseInt(dishItemObject['dish_quantity']),
                                    parseInt(dishItemObject['dish_unit_price'])
                                ];
                            }
                        }
                    }
                }
            }
            orderModalData['Total'] = [totalNumberOfDishes, orderTotalAmount];
            return orderModalData;
        }
    }
    const buildDeliveryDataForOrderModal = () => {
        if (props.allProps.route.params.tag === all_constants.tag.orders.paid) {
            const orders_data = props.order_list_data;
            const indexes = Object.keys(orders_data);
            let orderDeliveryData = {};
            for (let i = 0; i < indexes.length; i++) {
                const orderItemObject = orders_data[i];
                let deliveryDate = orderItemObject['order_delivery_date'] + ' à ' + orderItemObject['order_picking_hour'];
                if (!Object.keys(orderDeliveryData).includes(deliveryDate)){
                    orderDeliveryData[deliveryDate] = []
                }
                const dishIndexes = Object.keys(orderItemObject['dishes']);
                let tempArray = [];
                for (let j = 0; j < dishIndexes.length; j++) {
                    const dishItemObject = orderItemObject['dishes'][j];
                    let dishQuantity =  dishItemObject['dish_quantity'];
                    let dishName = dishItemObject['dish_name'];
                    tempArray.push([dishQuantity, dishName]);
                }
                orderDeliveryData[deliveryDate] = tempArray;
            }
            return orderDeliveryData;
        }
    }

    const getOrderList = () => {
        if (props.route.params.tag === all_constants.tag.orders.archived){
            return props.route.params.item;
        }
        return getOrders();
    }

    return (
        <View style={{flex: 1 , marginTop: props.allProps.route.params.tag === all_constants.tag.orders.archived ? '10%' : '0%'}}>
            {
                props.allProps.route.params.tag === all_constants.tag.orders.paid ?
                    <View style={{flex: 1, marginTop: '5%', alignItems: 'center'}}>
                        <CustomButton
                            label={all_constants.modal.order_modal.show}
                            backgroundColor='#228b22'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            label_color='white'
                            onPress={onPressShowModal}
                        />
                    </View>
                    :
                    <View></View>
            }
            {
                props.allProps.route.params.tag === all_constants.tag.orders.paid ?
                    <OrderModal
                        state={modalState}
                        onPressCloseModal={onPressCloseModal}
                        data={buildDishDataForOrderModal()}
                        deliveryData={buildDeliveryDataForOrderModal()}
                        numberOfOrders={Object.keys(props.order_list_data).length}
                    />
                :
                    <View></View>
            }
            <View style={{
                flex: props.allProps.route.params.tag === all_constants.tag.orders.paid ? 10 : 1,
            }}>
                <FlatList
                    data={
                        getData(
                            getOrderList(),
                            props.route.params.tag,
                            undefined,
                            'order_tag',
                            'id',
                        )
                    }
                    ListFooterComponent={<View></View>}
                    ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                    ListEmptyComponent={
                        <View style={{flex: 1, alignItems: 'center'}}><Text style={{fontSize: 20}}>{all_constants.order.no_order_found}</Text></View>
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
                                    order_hour={item.order_hour}
                                    order_cancel_date={item.order_cancel_date}
                                    order_cancel_hour={item.order_cancel_hour}
                                    order_accept_date={item.order_accept_date}
                                    order_accept_hour={item.order_accept_hour}
                                    order_delivery_date={item.order_delivery_date}
                                    order_delivery_hour={item.order_delivery_hour}
                                    order_picking_hour={item.order_picking_hour}
                                    order_number_color={item.order_number_color}
                                    order_is_menu={item.order_is_menu}
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