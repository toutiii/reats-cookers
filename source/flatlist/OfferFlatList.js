import React from "react";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import styles_dish from "../styles/styles-dish";
import Offer from "../components/Offer";
import { getData } from "../helpers/global_helpers";
import { getOffers } from "../helpers/offer_helpers";

export default function OfferFlatList({ ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={getData(
          getOffers(),
          props.route.params.tag,
          props.route.params.isEnabled,
          "offer_tag"
        )}
        ListFooterComponent={<View></View>}
        ListFooterComponentStyle={{
          borderWidth: 5,
          borderColor: "red",
          borderRadius: 50,
        }}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {all_constants.offer.no_offer_found}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles_dish.dish_button_container}>
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("OfferFormView", { item: item });
              }}
              style={{ flex: 1 }}
              underlayColor={all_constants.colors.inputBorderColor}
            >
              <Offer
                key={item.id}
                dish_id={item.dish_id}
                dish_photo={item.dish_photo}
                dish_name={item.dish_name}
                offer_quantity={item.offer_quantity}
                offer_rate={item.offer_rate}
                offer_price={item.offer_price}
              />
            </TouchableHighlight>
            <HorizontalLine />
          </View>
        )}
      />
    </View>
  );
}
