import { Component } from "react";
import CustomImageButton from "../button/CustomImageButton";
import { Text, View} from "react-native";
import styles_home_view from '../styles/styles-home-view'
import all_constants from "../constants";
class SplitStatsView extends Component{
    constructor(props){
        super(props);
        this.arrow_uri = 'https://pics.freeicons.io/uploads/icons/png/6448667931600321999-512.png'
        this.average_response_time = '15min'
        this.average_rating = "4.4/5"
    }
    onPressNavigateToTab= (tab_name, screen_name) => {
        this.props.navigation.navigate(tab_name, { screen: screen_name });
    }

    render(){
        return(
            <><View style={styles_home_view.label_view}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>
                    {all_constants.label.home.global_stats}
                </Text>
            </View><View style={styles_home_view.order_view_style}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18 }}>
                            {all_constants.label.home.average_response_time}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            {this.average_response_time}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <CustomImageButton
                            onPress={() => this.onPressNavigateToTab('StatsView')}
                            uri={this.arrow_uri} />
                    </View>
                </View><View style={styles_home_view.order_view_style}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18 }}>
                            {all_constants.label.home.average_rating}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>
                            {this.average_rating}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }}>
                        <CustomImageButton
                            onPress={() => this.onPressNavigateToTab('StatsView')}
                            uri={this.arrow_uri} />
                    </View>
                </View></>
        )
    }
}
export default SplitStatsView