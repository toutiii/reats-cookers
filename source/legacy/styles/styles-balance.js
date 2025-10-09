import { StyleSheet } from "react-native";

let styles_balance = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    sub_container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
    },
    balance_button_container: {
        flex: 1,
        aspectRatio: 5 / 1,
        margin: "3%",
        width: "94%",
        height: "30%",
    },
    order_balance: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: "2%",
    },
    order_number: {
        flex: 3,
        justifyContent: "center",
        paddingLeft: "15%",
    },
    order_date: {
        flex: 2,
        justifyContent: "center",
    },
});

export default styles_balance;
