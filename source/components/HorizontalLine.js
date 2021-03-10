import React, {Component} from "react";
import {View} from "react-native";


export default class HorizontalLine extends Component {
    render () {
        return (
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        )
    }
}