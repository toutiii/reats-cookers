import { StyleSheet } from "react-native";
import all_constants from "../constants";


let styles_home_view;

export default styles_home_view = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '10%',
    },
    button_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
    sub_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        width: '95%',
        borderRadius: 20,
        flexDirection: 'row'
    },
    text:{
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    online_button:{
        borderWidth: 2,
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    online_button_text:{
        alignItems: 'center',
        fontSize: 17,
        justifyContent:'center',
        color: 'white'
    },
    profile_pic: {
        flex: 1,
        aspectRatio: 1,
        borderRadius: 100,
    },
   home_button: {
       flex: 1,
       width: '100%',
       borderRadius:30,
       justifyContent: 'center'
   },
    label_view: {
        flex:1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 10,
        backgroundColor: '#d3d3d3'
    },
    order_view_style: {
        flex: 1,
        flexDirection: 'row',
        width: '95%',
        alignItems: 'center',
        borderBottomWidth: 1
    }
})