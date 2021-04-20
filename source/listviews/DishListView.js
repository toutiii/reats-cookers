import React, {Component} from "react";
import {View} from "react-native";
import DishButton from "../button/DishButton";
import styles_dish from '../styles/styles-dish'
import { getDishes } from "../helpers/dish_helpers"


export default class DishListView extends Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        const allDishes = getDishes()
        let dishData = []
        const indexes = Object.keys(allDishes)
        for (let i = 1; i <= indexes.length; i++) {
            const dishObject = allDishes[i]
            if (
                dishObject['dish_category'] === this.props.route.params.tag
                &&
                dishObject['isEnabled'] === this.props.route.params.isEnabled
            ){
                dishData.push(dishObject)
            }
        }
        return dishData
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