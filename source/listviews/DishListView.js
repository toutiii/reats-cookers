import React, {Component} from "react";
import {Alert, View} from "react-native";
import DishButton from "../button/DishButton";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";


export default class DishListView extends Component {
    constructor(props) {
        super(props);
        this.dish_list_data = [
            {
                id: '1',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
            {
                id: '2',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
            {
                id: '3',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
            {
                id: '4',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
            {
                id: '5',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
            {
                id: '6',
                dish_photo: 'https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg',
                dish_name: 'Poulet Yassa',
                dish_category: 'Plat principal',
                dish_rating: '4.8/5',
                dish_price: '10 €',
                dish_description: 'Un succulent poulet Yassa',
            },
        ]
    }

    getData = () => {
        if (this.props.route.params.tag === all_constants.tag.dishes.starter) {
            return this.dish_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.dish) {
            return this.dish_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.dessert) {
            return this.dish_list_data
        }
        else if (this.props.route.params.tag === all_constants.tag.dishes.drink) {
            return this.dish_list_data
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