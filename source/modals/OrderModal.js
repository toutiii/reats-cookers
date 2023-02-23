import { Modal, ScrollView, Text, View } from "react-native";
import React from "react";
import all_constants from "../constants";
import CustomButton from "../button/CustomButton";
import HorizontalLine from "../components/HorizontalLine";

export default function OrderModal({ ...props }) {
  return (
    <Modal animationType="slide" transparent={false} visible={props.state}>
      <ScrollView style={{ flex: 1, margin: "2%" }}>
        <View style={{ flex: 1, alignItems: "center", marginTop: "10%" }}>
          <CustomButton
            label={all_constants.modal.dish_modal.hide}
            backgroundColor="tomato"
            label_color="white"
            height={50}
            border_width={3}
            border_radius={30}
            font_size={17}
            onPress={props.onPressCloseModal}
          />
        </View>

        <View style={{ flex: 8, marginTop: "5%" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              {all_constants.modal.order_modal.intro}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 18 }}>
                {all_constants.modal.order_modal.received_order}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>{props.numberOfOrders}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 3 }}>
              <Text style={{ fontSize: 18 }}>
                {all_constants.modal.order_modal.received_dishes}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>{props.data["Total"][0]}</Text>
            </View>
          </View>
          <View style={{ height: "3%" }}></View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              {all_constants.modal.order_modal.detail}
            </Text>
            <HorizontalLine line_width={3} line_color={"tomato"} />
          </View>
          <View style={{ flex: 5 }}>
            {Object.keys(props.data).map((key) => {
              return (
                <View key={key} style={{ flex: 1, margin: "1%" }}>
                  {key.toLowerCase().includes("total") ? (
                    <HorizontalLine line_width={1} line_color={"tomato"} />
                  ) : (
                    <View></View>
                  )}
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18 }}>{props.data[key][0]}</Text>
                    </View>
                    <View style={{ flex: 3 }}>
                      <Text
                        numberOfLines={1}
                        style={[
                          { fontSize: 18 },
                          {
                            textAlign: key.toLowerCase().includes("total")
                              ? "center"
                              : "left",
                          },
                        ]}
                      >
                        {key}
                      </Text>
                    </View>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      {key.toLowerCase().includes("total") ? (
                        <Text style={{ fontSize: 18 }}>
                          {props.data[key][1]}
                          {all_constants.currency_symbol}
                        </Text>
                      ) : (
                        <Text style={{ fontSize: 18 }}>
                          {props.data[key][0]} x {props.data[key][1]}
                        </Text>
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 18, alignItems: "center" }}>
                        {key.toLowerCase().includes("total") ? (
                          <Text />
                        ) : (
                          <Text style={{ fontSize: 18 }}>
                            ={props.data[key][0] * props.data[key][1]}
                            {all_constants.currency_symbol}
                          </Text>
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
            <View style={{ height: "3%" }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>
                {" "}
                {all_constants.modal.order_modal.delivery_schedule}{" "}
              </Text>
            </View>
            <HorizontalLine line_width={3} line_color={"tomato"} />
            {Object.keys(props.deliveryData).map((dateKey) => {
              let arrayOfArrays = props.deliveryData[dateKey];
              return (
                <View
                  key={dateKey}
                  style={{ flex: 1, alignItems: "center", margin: "2%" }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {" "}
                    {dateKey}
                  </Text>
                  {Object.keys(arrayOfArrays).map((arrayKey) => {
                    let currentArray = arrayOfArrays[arrayKey];
                    return (
                      <View key={arrayKey} style={{ flex: 1 }}>
                        <Text style={{ fontSize: 18 }}>
                          {currentArray[0]} {currentArray[1]}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
}
