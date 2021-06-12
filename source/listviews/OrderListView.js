import React, {Component} from "react";
import {View} from "react-native";
import OrderFlatList from "../button/OrderFlatList"
import styles_order from "../styles/styles-order"
import {getOrders} from "../helpers/order_helpers";
import {getData} from "../helpers/global_helpers";
import all_constants from "../constants";


export default class OrderListView extends Component {
    constructor(props) {
        super(props);
    }

    getOrderList = () => {
        if (this.props.route.params.tag === all_constants.tag.orders.archived){
            return this.props.route.params.item;
        }
        return getOrders();
    }

    render() {
        return(
            <View style={styles_order.container}>
                <OrderFlatList
                    order_list_data={getData(
                        this.getOrderList(),
                        this.props.route.params.tag,
                        undefined,
                        'order_tag',
                        'id',
                    )}
                    allProps={this.props}
                />
            </View>
        )
    }
}