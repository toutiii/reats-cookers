import AwesomeAlert from "react-native-awesome-alerts";
import React from "react";
import {View} from "react-native";

export default function CustomAlert ({...props}){
    console.log(props)
    return(
        <View style={{flex: 1}}>
            <AwesomeAlert
                show={props.show}
                title={props.title}
                message={props.message ? props.message : ''}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor={props.confirmButtonColor}
                onConfirmPressed={props.onConfirmPressed}
            />
        </View>
    )
}