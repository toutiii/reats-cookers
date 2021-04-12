import React, {Component} from "react";
import {View} from "react-native";
import DishButton from "../button/DishButton";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import { getDishes } from "../helpers/dish_helpers"


export default class DishListView extends Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        if (this.props.route.params.tag === all_constants.tag.dishes.starter) {
            return getDishes()
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.dish) {
            return getDishes()
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.dessert) {
            return getDishes()
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.drink) {
            return getDishes()
        }
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