import React, {Component} from "react";
import {View} from "react-native";
import OrderButton from "../button/OrderButton"
import styles_order from "../styles/styles-order"
import all_constants from "../constants";
import {getOrders} from "../helpers/order_helpers";


export default class OrderListView extends Component {
    constructor(props) {
        super(props);
    }
    getData = () => {
        const order_list_data = getOrders()
        let data = []
        const indexes = Object.keys(order_list_data)
        for (let i = 1; i <= indexes.length; i++) {
            let itemObject = order_list_data[i]
            if (itemObject['order_tag'] === this.props.route.params.tag) {
                data.push(itemObject)
            }
        }
        if (data.length > 0){
            return data
        }
        else {
            if (this.props.route.params.tag !== all_constants.tag.orders.archived){
                for (let i = 1; i <= indexes.length; i++) {
                    let itemObject = order_list_data[i]
                        data.push(itemObject)
                    }
                }
            return data
        }
    }
    render() {
        return(
            <View style={styles_order.container}>
                <OrderButton
                    order_list_data={this.getData()}
                    allProps={this.props}
                />
            </View>
        )
    }
}