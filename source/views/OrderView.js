import React, {Component} from "react";
import {Alert, Text, View} from "react-native";
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
                        order_number_color={this.props.route.params.item.order_number_color}
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
                    modal_data={this.props.route.params.item.dishes}
                />
            </View>
        )
    }
}