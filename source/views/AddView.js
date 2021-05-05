import React, {Component} from "react";
import {View} from "react-native";
import CustomButton from "../button/CustomButton";
import all_constants from "../constants";


export default class  DishAddView extends Component {
    constructor(props) {
        super(props);
    }
    onSubmitDish = () => {
        this.props.navigation.navigate('DishFormView', {item: {}})
    }
    onSubmitMenu = () => {
        this.props.navigation.navigate('MenuFormView', {item: {}})
    }
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', paddingTop: '65%'}}>
                    <CustomButton
                        label={all_constants.label.dishes.add_dish}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={'tomato'}
                        label_color={'white'}
                        onPress={this.onSubmitDish}
                    />
                </View>
                <View style={{flex: 1, alignItems: 'center', paddingBottom: '65%'}}>
                    <CustomButton
                        label={all_constants.label.dishes.add_menu}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={'tomato'}
                        label_color={'white'}
                        onPress={this.onSubmitMenu}
                    />
                </View>
            </View>
        )
    }
}