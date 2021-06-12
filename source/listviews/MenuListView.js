import React, {Component} from "react";
import {View} from "react-native";
import MenuFlatList from "../flatlist/MenuFlatList"
import styles_menu from "../styles/styles-balance"
import {getMenus} from "../helpers/menu_helpers";
import {getData} from "../helpers/global_helpers";


export default class MenuListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_menu.container}>
                <MenuFlatList
                    menu_list_data={
                        getData(
                            getMenus(),
                            this.props.route.params.tag,
                            this.props.route.params.isEnabled,
                            'menu_tag'
                        )
                    }
                    allProps={this.props}
                />
            </View>
        )
    }
}