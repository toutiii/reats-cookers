import React, {Component} from "react";
import {View} from "react-native";
import DishFlatList from "../button/DishFlatList";
import styles_dish from '../styles/styles-dish'
import { getDishes } from "../helpers/dish_helpers"
import { getData } from "../helpers/global_helpers";


export default class DishListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles_dish.container}>
                <DishFlatList
                    dish_list_data={
                        getData(
                            getDishes(),
                            this.props.route.params.tag,
                            this.props.route.params.isEnabled,
                            'dish_category',
                            'id',
                        )
                    }
                    allProps={this.props}
                />
            </View>

        )
    }
}