import React, {Component} from "react";
import {View} from "react-native";
import DishButton from "../button/DishButton";
import styles_dish from '../styles/styles-dish'
import { getDishes } from "../helpers/dish_helpers"


export default class DishListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles_dish.container}>
                <DishButton
                    dish_list_data={this.getData()}
                    allProps={this.props}
                />
            </View>

        )
    }
}