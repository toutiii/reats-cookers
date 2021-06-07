import React, {Component} from "react";
import {Alert, Text, View} from "react-native";
import styles_order_view from "../styles/styles-order-view"
import HorizontalLine from "../components/HorizontalLine";
import all_constants from "../constants";
import Order from "../components/Order";
import CustomButton from "../button/CustomButton";
import DishModal from "../modals/DishModal";
import CustomAlert from "../components/CustomAlert";

export default class OrderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            showAlert: false,
            acceptOrder: false,
            declineOrder: false
        }
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
                {
                    this.state.showAlert && this.state.acceptOrder && (
                        <CustomAlert
                            show={this.state.showAlert}
                            title={all_constants.custom_alert.orderview.accept_order_title}
                            message={all_constants.custom_alert.orderview.accept_order_message}
                            confirmButtonColor='green'
                            showCancelButton={true}
                            cancelButtonColor='red'
                            cancelText={all_constants.custom_alert.homeview.cancel_text}
                            onConfirmPressed={() => {
                                this.setState({showAlert: false});
                                this.setState({acceptOrder: false});
                            }}
                            onCancelPressed={() => {
                                this.setState({showAlert: false});
                                this.setState({acceptOrder: false});
                            }}
                        />
                    )
                }
                {
                    this.state.showAlert && this.state.declineOrder && (
                        <CustomAlert
                            show={this.state.showAlert}
                            title={all_constants.custom_alert.orderview.decline_order_title}
                            message={all_constants.custom_alert.orderview.decline_order_message}
                            confirmButtonColor='green'
                            showCancelButton={true}
                            cancelButtonColor='red'
                            cancelText={all_constants.custom_alert.homeview.cancel_text}
                            onConfirmPressed={() => {
                                this.setState({showAlert: false});
                                this.setState({declineOrder: false});
                            }}
                            onCancelPressed={() => {
                                this.setState({showAlert: false});
                                this.setState({declineOrder: false});
                            }}
                        />
                    )
                }
                <View>
                    <View style={{flex: 2}}>
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
                        {
                            this.props.route.params.item.order_status === all_constants.order.status.pending ?
                                <View style={{flex: 1}}>
                                    <CustomButton
                                        label={all_constants.label.order.accept}
                                        backgroundColor='green'
                                        label_color='white'
                                        height={50}
                                        border_width={3}
                                        border_radius={30}
                                        font_size={17}
                                        onPress={() => {
                                            this.setState({showAlert: true});
                                            this.setState({acceptOrder: true});
                                        }}
                                    />
                                </View>
                                :
                                <View></View>
                        }
                        {
                            this.props.route.params.item.order_status === all_constants.order.status.approved?
                                <View style={{flex: 1}}>
                                    <CustomButton
                                        label={all_constants.label.order.reject}
                                        backgroundColor='red'
                                        label_color='white'
                                        height={50}
                                        border_width={3}
                                        border_radius={30}
                                        font_size={17}
                                        onPress={() => {
                                            this.setState({showAlert: true});
                                            this.setState({declineOrder: true});
                                        }}
                                    />
                                </View>
                                :
                                <View></View>
                        }
                        <View style={{flex: 1}}>
                            <CustomButton
                                label={all_constants.modal.dish_modal.show}
                                backgroundColor='darkgrey'
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={17}
                                onPress={this.onPressShowModal}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <CustomButton
                                label={all_constants.messages.cancel}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={18}
                                backgroundColor={'tomato'}
                                label_color='white'
                                onPress={() => {this.props.navigation.goBack(null)}}
                            />
                        </View>
                    </View>
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