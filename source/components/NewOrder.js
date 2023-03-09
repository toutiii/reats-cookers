import { Image, Text, View } from "react-native";
import { Divider } from "react-native-paper";
import all_constants from "../constants";
export default function NewOrder({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          marginTop: "8%",
        }}
      >
        <View
          style={{
            borderColor: "red",
            borderWidth: 2,
            flex: 1,
            margin: "1%",
            aspectRatio: 1,
          }}
        >
          <Image
            source={{
              uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
            }}
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            borderColor: "green",
            borderWidth: 2,
            borderRadius: 20,
            flex: 2,
            margin: "1%",
            aspectRatio: 2,
          }}
        >
          <View style={{ padding: 10, alignItems: "flex-start" }}>
            <Text
              style={{
                fontSize: 20,
                color: props.order_number_color,
              }}
            >
              {all_constants.order.infos.number} {props.order_number}
            </Text>
            <Text style={{ fontSize: 13 }}>
              {props.order_delivery_date} à {props.order_delivery_hour}{" "}
            </Text>
            <Text style={{ fontSize: 13 }}>{props.order_status} </Text>
            <Text style={{ fontSize: 13 }}>
              {props.order_amount}
              {all_constants.currency_symbol}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
    </View>
  );
}
