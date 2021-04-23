import React, {Component} from "react";
import {View} from "react-native";
import OrderButton from "../button/OrderButton"
import styles_order from "../styles/styles-order"
import {getOrders} from "../helpers/order_helpers";
import {getData} from "../helpers/global_helpers";


export default class OrderListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_order.container}>
                <OrderButton
                    order_list_data={getData(
                        getOrders(),
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