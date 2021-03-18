import {StyleSheet} from "react-native";


let styles_settings;

export default styles_settings = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%'
    },
    title: {
        flex: 1,
        backgroundColor:'lightgrey',
        justifyContent: 'center',
        width: '100%',
    },
    title_text: {
        fontSize: 20,
        color: 'grey'
    },
    button_first_label: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    button_second_label: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: '2%',
    },
    button_container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        width: '100%',
        borderBottomWidth: 1,
    },
})