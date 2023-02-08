import { Component } from "react";
import all_constants from "../constants";
import { Image, Switch, Text, View} from "react-native";
import styles_home_view from '../styles/styles-home-view'
class ToggleView extends Component{

    constructor(props) {
        super(props);
        this.state = {
            is_online: false,
            showAlert: false,
            willLogout: false,
        }
        this.offline_icon_uri = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH-AEN1kYTBtKWdVTnIblOQzv3GR1qa4oI5A&usqp=CAU'
        this.online_icon_uri = 'https://pics.freeicons.io/uploads/icons/png/11875166141558096434-512.png'
    }
    render(){
        return(
            <View style={[styles_home_view.order_view_style, {marginTop: '10%'}]}>
                    <View style={{flex: 1}}>
                            <Image
                                source={{uri: this.state.is_online ? this.offline_icon_uri : this.online_icon_uri}}
                                style={{width: 30, height: 30}}
                            />
                        </View>
                        <View style={{flex: 1,}}>
                            <Text style={
                                [
                                    styles_home_view.text,
                                    {color: this.state.is_online ? 'red' : 'green'},
                                    {textAlign: 'center'}
                                ]
                            }>
                                {this.state.is_online ? all_constants.label.home.status.offline : all_constants.label.home.status.online}
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Switch
                                onValueChange={() => {this.setState({showAlert: true})}}
                                value={!this.state.is_online}
                            />
                    </View>
            </View>
        )
    }
}
export default ToggleView