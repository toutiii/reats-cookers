import {StyleSheet} from "react-native"


let styles_field = '';

export default styles_field=StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '1%',
    },
    label: {
        flex: 3,
        width: '100%',
        alignItems: 'center'
    },
    textinput_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderColor: 'green',
    },
    textinput: {
        flex: 1,
        borderColor: 'tomato',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        textAlign: 'center',
        height: 50,
        marginBottom: 5,
        fontSize: 16,
        elevation: 20,
        width: '100%',
    },
    picker_container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: '#fff',
        elevation: 20,
        width: '100%',
        height: 50,
        borderColor: 'tomato',
        borderBottomWidth: 1,
    },
    error: {
        textAlign: 'center',
        color: 'red'
    },
    button: {
        flex: 1,
        margin: '2%',
        width: '50%'
    },
    button_container: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'tomato',
    },
    no_image: {
        width: 200,
        height: 150,
        borderWidth:1,
        borderColor: 'tomato',
        justifyContent: 'center',
        alignItems: 'center'
    }
})