import React from "react";
import { View } from "react-native";
import Form from "./Form";
import all_constants from "../constants";
import { checkValueIsDefined } from "../validators/global_validators";
import fetch_order_history from "../api/fetch_order_history";

export default function HistoryFormView({ ...props }) {
  const handleResult = async (result) => {
    if (result.ok) {
      if (props.route.params.tag === all_constants.tag.balance.history) {
        props.navigation.navigate("BalanceHistory", {
          item: result.json,
          tag: props.route.params.tag,
        });
      } else if (props.route.params.tag === all_constants.tag.orders.archived) {
        props.navigation.navigate("OrderHistory", {
          item: result.json,
          tag: props.route.params.tag,
        });
      }
    } else {
      throw new Error("Failed to fetch order history.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, marginTop: "10%" }}>
        <Form
          action={fetch_order_history}
          navigation={props.navigation}
          afterSubmit={handleResult}
          item={{}}
          fields={{
            start_date: {
              fieldIsMandatory: true,
              type: all_constants.field_type.date_picker,
              label: all_constants.label.form.order.start_date,
              placeholder: all_constants.placeholders.form.order.start_date,
              validators: [checkValueIsDefined],
            },
            end_date: {
              fieldIsMandatory: true,
              type: all_constants.field_type.date_picker,
              label: all_constants.label.form.order.end_date,
              placeholder: all_constants.placeholders.form.order.end_date,
              validators: [checkValueIsDefined],
            },
          }}
        />
      </View>
    </View>
  );
}
