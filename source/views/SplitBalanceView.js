import { Component } from "react";
import styles_home_view from '../styles/styles-home-view';
import all_constants from "../constants";
import CustomImageButton from "../button/CustomImageButton";
import {Text, View} from "react-native";
export default class SplitBalanceView extends Component {
    constructor(props){
        super(props);
        this.current_balance = 150 + ' €'
        this.arrow_uri = 'https://pics.freeicons.io/uploads/icons/png/6448667931600321999-512.png'
    }
    
    onPressNavigateToTab= (tab_name, screen_name) => {
        this.props.navigation.navigate(tab_name, { screen: screen_name });
    }

    render(){
        return(

            <><View style={styles_home_view.label_view}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    {all_constants.label.home.balance}
                </Text>
            </View><View style={styles_home_view.order_view_style}>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'left', fontSize: 18 }}>
                            {all_constants.label.home.pending}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'center', fontSize: 20 }}>
                            {this.current_balance}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <CustomImageButton
                            onPress={() => this.onPressNavigateToTab('BalanceTab', 'PendingBalance')}
                            uri={this.arrow_uri} />
                    </View>
                </View></>
        )
    }
}