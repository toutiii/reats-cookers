import React, {Component} from "react";
import {View} from "react-native";
import OrderButton from "../button/OrderButton"
import styles_order from "../styles/styles-order"
import all_constants from "../constants";


export default class OrderListView extends Component {
    constructor(props) {
        super(props);
        this.order_list_data = [
            {
                id :'1',
                order_number: '123365',
                order_status: 'En attente de prise en charge',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'green',
                order_tag: 'paid'
            },
            {
                id :'2',
                order_number: '123365',
                order_status: 'En attente de prise en charge',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'green',
                order_tag: 'paid'
            },
            {
                id :'3',
                order_number: '123365',
                order_status: 'En attente de prise en charge',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'green',
                order_tag: 'paid'
            },
            {
                id :'4',
                order_number: '123365',
                order_status: 'Annulée',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'red',
                order_tag: 'cancelled'
            },
            {
                id :'5',
                order_number: '123365',
                order_status: 'Annulée',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'red',
                order_tag: 'cancelled'
            },
            {
                id :'6',
                order_number: '123365',
                order_status: 'Annulée',
                order_owner: 'Toutii',
                order_amount: '50€',
                order_number_of_items: '5',
                order_date: '9 Mars 2021',
                order_cancel_date: '11 Mars 2021',
                order_delivery_date: '13 Mars 2021',
                order_number_color: 'red',
                order_tag: 'cancelled'
            },
        ]
    }
    getData = () => {
        if (this.props.route.params.tag === all_constants.tag.orders.all) {
            return this.order_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.orders.paid) {
            return this.order_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.orders.canceled) {
            return this.order_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.orders.history) {
            return this.order_list_data
        }
    }

    render() {
        return(
            <View style={styles_order.container}>
                <OrderButton
                    order_list_data={this.getData()}
                    order_number_color={this.props.route.params.order_number_color}
                    allProps={this.props}
                />
            </View>
        )
    }
}