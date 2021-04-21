import React, {Component} from "react";
import {View} from "react-native";
import MenuButton from "../button/MenuButton"
import styles_menu from "../styles/styles-balance"
import {getMenus} from "../helpers/menu_helpers";


export default class MenuListView extends Component {
    constructor(props) {
        super(props);
    }

    getData = () => {
        const allMenus = getMenus()
        let menuData = []
        const indexes = Object.keys(allMenus)
        for (let i = 1; i <= indexes.length; i++) {
            const menuObject = allMenus[i]
            if (
                menuObject['dish_category'] === this.props.route.params.tag
                &&
                menuObject['isEnabled'] === this.props.route.params.isEnabled
            ){
                menuData.push(menuObject)
            }
        }
        return menuData
    }
    render() {
        return(
            <View style={styles_menu.container}>
                <MenuButton
                    menu_list_data={this.getData()}
                    allProps={this.props}
                />
            </View>
        )
    }
}