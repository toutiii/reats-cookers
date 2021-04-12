import React, {Component} from "react";
import {Alert, View} from "react-native";
import MenuButton from "../button/MenuButton"
import styles_menu from "../styles/styles-balance"
import {getMenus} from "../helpers/menu_helpers";


export default class BalanceListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_menu.container}>
                <MenuButton
                    menu_list_data={getMenus()}
                />
            </View>
        )
    }
}