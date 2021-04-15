import React from "react";
import {ScrollView, Text, View} from "react-native";
import HorizontalLine from "./HorizontalLine";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Setting({...props}) {
    return(
        <View style={{flex: 1, justifyContent: 'center', width: '95%'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 1, justifyContent: 'center', marginTop: '5%'}}>
                    {
                        props.icon_name ?
                            <Ionicons name={props.icon_name} size={30} />
                        :
                            <ScrollView horizontal={true}>
                                <Text numberOfLines={1} style={{fontSize: 18}}>{props.label}</Text>
                            </ScrollView>
                    }
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginTop: '5%'}}>
                    <ScrollView horizontal={true}>
                        <Text numberOfLines={1} style={{fontSize: 18}}>{props.value}</Text>
                        <HorizontalLine/>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}