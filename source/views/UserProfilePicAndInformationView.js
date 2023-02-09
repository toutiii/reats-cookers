
import { Component } from "react";
import { Image, Text, View} from "react-native";
import styles_home_view from '../styles/styles-home-view'


export default class UserProfilePicAndInformationView extends Component{
    constructor(props){
        super(props);
        this.firstname = 'Irene'
        this.lastname = 'Janten'
        this.email = 'toulevi@yahoo.fr'
    }
    render(){
        return(
        <View style={[styles_home_view.sub_container, { marginTop: '30%'}]}>
        <View style={{flex: 1, aspectRatio: 1}}>
            <Image
                source={require('../images/mum_test.jpg')}
                style={styles_home_view.profile_pic}
            />
        </View>
        <View style={{flex: 1, alignItems: 'stretch'}}>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{fontSize: 30}}>
                {this.lastname + ' ' + this.firstname}
            </Text>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={{ fontSize: 17,color: 'grey'}}>
                {this.email}
            </Text>
        </View>
    </View>
    )
    }
}