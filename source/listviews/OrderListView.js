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
                order_tag: 'paid',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
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
                order_tag: 'paid',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
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
                order_tag: 'paid',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
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
                order_tag: 'cancelled',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
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
                order_tag: 'cancelled',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
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
                order_tag: 'cancelled',
                dishes:[
                    {
                        id: '1',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                    {
                        id: '2',
                        dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                        dish_name: 'Poulet Yassa',
                        dish_rating:'4.8/5',
                        dish_unit_price:'10 €',
                        dish_style:'styles_dish.dish_price',
                        dish_quantity: '5',
                        dish_order_date:'9 Mars 2021',
                        dish_order_status: 'En préparation'
                    },
                ]
            },
        ]
    }
    getData = () => {
        let data = []
        for (let key in this.order_list_data) {
            if (this.order_list_data[key]['order_tag'] === this.props.route.params.tag) {
                data.push(this.order_list_data[key])
            }
        }
        if (data.length > 0){
            return data
        }
        else {
            if (this.props.route.params.tag !== all_constants.tag.orders.archived){
                return this.order_list_data
            }
        }

    }
    render() {
        return(
            <View style={styles_order.container}>
                <OrderButton
                    order_list_data={this.getData()}
                    allProps={this.props}
                    order_number_color={this.props.route.params.order_number_color}
                />
            </View>
        )
    }
}