import React, {Component} from "react";
import {View} from "react-native";
import styles_menu from "../styles/styles-balance"
import {getOffers} from "../helpers/offer_helpers";
import {getData} from "../helpers/global_helpers";
import OfferButton from "../button/OfferButton";


export default class OfferListView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={styles_menu.container}>
                <OfferButton
                    offer_list_data={
                        getData(
                            getOffers(),
                            this.props.route.params.tag,
                            this.props.route.params.isEnabled,
                            'offer_tag'
                        )
                    }
                    allProps={this.props}
                />
            </View>
        )
    }
}