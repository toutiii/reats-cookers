import React, {Component} from "react";
import {Alert, Modal, Text, TouchableHighlight, View} from "react-native";
import styles_order_view from "../styles/styles-order-view"
import HorizontalLine from "../components/HorizontalLine";
import all_constants from "../constants";
import Order from "../components/Order";
import CustomButton from "../button/CustomButton";
import DishModal from "../modals/DishModal";

export default class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_order_approved: false,
            nb_reject: 0,  // TO DO: check in data from back if there is no null reject_date. that will be the criteria
            modalVisible: false
        }
        this.order_data = {
            id : '1',
            order_number: '12345',
            order_status: 'En cours de préparation',
            order_owner: 'Toutii',
            order_amount: '50€',
            order_number_of_items: '5',
            order_date: '9 Mars 2021',
            order_cancel_date: '10 Mars 2021',
            order_delivery_date: '13 Mars 2021',
        }
        this.order_dish_data = [
            {
                id: '1',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_rating:'4.8/5',
                dish_unit_price:'10 €',
                dish_style:'styles_dish.dish_price',
                dish_quantity: '5',
                dish_order_date:'9 Mars 2021',
                dish_order_status: this.getOrderStatus()
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
                dish_order_status: this.getOrderStatus()
            },
            {
                id: '3',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_rating:'4.8/5',
                dish_unit_price:'10 €',
                dish_style:'styles_dish.dish_price',
                dish_quantity: '5',
                dish_order_date:'9 Mars 2021',
                dish_order_status: this.getOrderStatus()
            },
            {
                id: '4',
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
                id: '5',
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
                id: '6',
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
    }
    setModalVisible = () => {
        this.setState({modalVisible: ! this.state.modalVisible})
    }
    getOrderStatus = () => {
        return 'En préparation'
    }
    onPressValid = () => {
        Alert.alert('Commande', "Vous avez accepté la commande.")
        this.setState({is_order_approved: ! this.state.is_order_approved})
    }
    onPressReject = () => {
        Alert.alert('Attention', "Vous avez rejeté la commande.")
        this.setState({is_order_approved: ! this.state.is_order_approved})
        this.setState({nb_reject: this.state.nb_reject + 1})
    }
    onPressShowModal = () => {
        this.setState({modalVisible: true })

    }
    onPressCloseModal = () => {
        this.setState({modalVisible: false })
    }
    render() {
        return (
            <View style={styles_order_view.container}>
                <View style={{flex: 2, width: '95%'}}>
                    <Order
                        order_number={this.props.route.params.item.order_number}
                        order_status={this.props.route.params.item.order_status}
                        order_owner={this.props.route.params.item.order_owner}
                        order_amount={this.props.route.params.item.order_amount}
                        order_number_of_items={this.props.route.params.item.order_number_of_items}
                        order_date={this.props.route.params.item.order_date}
                        order_cancel_date={this.props.route.params.item.order_cancel_date}
                        order_delivery_date={this.props.route.params.item.order_delivery_date}
                        order_number_color={this.props.route.params.props.order_number_color}
                    />
                    <HorizontalLine
                        line_width={3}
                    />
                </View>
                <View style={styles_order_view.button_container}>
                    <View style={{flex: 1}}>
                        <CustomButton
                            label={all_constants.modal.dish_modal.show}
                            backgroundColor='#f0ffff'
                            height={50}
                            border_width={3}
                            border_radius={30}
                            font_size={17}
                            onPress={this.onPressShowModal}
                        />
                    </View>
                    {
                        this.state.is_order_approved ?
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 20, color: 'green'}}> Commande acceptée le 09 Mars 2021.</Text>
                            </View>
                        :
                            <View></View>
                    }
                    {
                        this.state.nb_reject > 0 ?
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 20, color: 'red'}}> Commande rejetée le 10 Mars 2021.</Text>
                            </View>
                            :
                            <View></View>
                    }
                    {
                       ! this.state.is_order_approved ?
                           <View style={{flex: 1}}>
                               <CustomButton
                                   label={all_constants.label.order.accept}
                                   backgroundColor='green'
                                   label_color='white'
                                   height={50}
                                   border_width={3}
                                   border_radius={30}
                                   font_size={17}
                                   onPress={this.onPressValid}
                               />
                           </View>
                       :
                           <View style={{flex: 1}}>
                               <CustomButton
                                   label={all_constants.label.order.reject}
                                   backgroundColor='red'
                                   label_color='white'
                                   height={50}
                                   border_width={3}
                                   border_radius={30}
                                   font_size={17}
                                   onPress={this.onPressReject}
                               />
                           </View>
                    }
                </View>
                <DishModal
                    state={this.state.modalVisible}
                    onPressCloseModal={this.onPressCloseModal}
                    modal_data={this.order_dish_data}
                />
            </View>
        )
    }
}