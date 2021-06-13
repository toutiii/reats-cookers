import {StyleSheet} from "react-native";
import React from "react";

let styles_dish;
export default styles_dish = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    dish_button_container: {
        flex: 1,
        aspectRatio: 16/9,
        paddingTop: '3%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    images: {
        flex: 1,
    },
    dish_infos:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '5%',
    },
    dish_price:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: '5%',
    },
    dish_name:{
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: '1%',
    },
    dish_rating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        marginBottom: '5%',
    },
    rating_star:{
        width: 20,
        height: 20,
    },
})