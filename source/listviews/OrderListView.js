import React, {Component} from "react";
import {View} from "react-native";
import OrderButton from "../button/OrderButton"
import styles_order from "../styles/styles-order"
import all_constants from "../constants";


export default class OrderListView extends Component {
    constructor(props) {
        super(props);
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
                />
            </View>
        )
    }
}