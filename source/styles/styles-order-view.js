import { StyleSheet } from "react-native";

let styles_order_view = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    button_container: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center",
        width: "95%",
    },
    orderview: {
        width: "90%",
        flex: 1,
        alignItems: "center",
        flexDirection: "row",

        margin: "5%",
    },
    icons: {
        marginLeft: "3%",
    },
    icon_text: {
        width: "80%",
        marginLeft: "5%",
    },
});

export default styles_order_view;
