import React from "react";
import {ScrollView, Text, View} from "react-native";
import HorizontalLine from "./HorizontalLine";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Setting({...props}) {
    return(
        <View style={{flex: 1, justifyContent: 'center', width: '95%'}}>
            <View style={{flex: 1, flexDirection: 'row', width: '95%'}}>
                <View style={{flex: 1, justifyContent: 'center', margin: '2%'}}>
                    {
                        props.icon_name ?
                            <Ionicons name={props.icon_name} size={30} />
                        :
                            <ScrollView horizontal={true}>
                                <Text numberOfLines={1} style={{fontSize: 20}}>{props.label}</Text>
                            </ScrollView>
                    }
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', margin: '2%'}}>
                    <ScrollView horizontal={true}>
                        <Text numberOfLines={1} style={{fontSize: 20}}>{props.value}</Text>
                    </ScrollView>
                </View>
            </View>
            <HorizontalLine/>
        </View>
    )
}