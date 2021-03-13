import React, {Component} from "react";
import {Alert, View} from "react-native";
import DishButton from "../button/DishButton";
import styles_dish from '../styles/styles-dish'


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

    onPress = () => {
        Alert.alert('ZA WARUDO')
    }

    render() {
        return (
            <View style={styles_dish.container}>
                <DishButton
                    dish_list_data={this.dish_list_data}
                    onPress={this.onPress}
                />
            </View>

        )
    }
}