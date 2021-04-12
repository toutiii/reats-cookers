import React, {Component} from "react";
import {Alert, View} from "react-native";
import MenuButton from "../button/MenuButton"
import styles_menu from "../styles/styles-balance"


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
        this.menu_list_data = [
            {
                id :'1',
                menu_name: 'JOJO',
                menu_starter: 'Avocats & crevettes',
                menu_dish: 'Poulet Yassa',
                menu_dessert: 'Part de moelleux chocolat',
                menu_price: '13€',
                menu_comment: 'Menu en promotion !',
                menu_drink: null,
            },
            {
                id :'2',
                menu_name: null,
                menu_starter: null,
                menu_dish: 'Poulet Yassa',
                menu_dessert: 'Part de moelleux chocolat',
                menu_price: '13€',
                menu_comment: 'Menu en promotion !',
                menu_drink: null
            },
            {
                id :'3',
                menu_name: null,
                menu_starter: 'Avocats & crevettes',
                menu_dish: 'Poulet Yassa',
                menu_dessert: null,
                menu_price: '13€',
                menu_comment: 'Menu en promotion !',
                menu_drink: 'Fanta',
            },
            {
                id :'4',
                menu_name: null,
                menu_starter: 'Avocats & crevettes',
                menu_dish: 'Poulet Yassa',
                menu_dessert: 'Part de moelleux chocolat',
                menu_price: '13€',
                menu_comment: 'Menu en promotion !',
                menu_drink: null,
            },
            {
                id :'5',
                menu_name: null,
                menu_starter: 'Avocats & crevettes',
                menu_dish: 'Poulet Yassa',
                menu_dessert: 'Part de moelleux chocolat',
                menu_price: '13€',
                menu_comment: 'Menu en promotion !',
                menu_drink: 'Coca',
            },
        ]
    }

    getMenus = () => {
        return this.menu_list_data
    }
    onPress = () => {
        Alert.alert('ZA WARUDO')
    }
    render() {
        return(
            <View style={styles_menu.container}>
                <MenuButton
                    menu_list_data={this.getMenus()}
                    onPress={this.onPress}
                />
            </View>
        )
    }
}