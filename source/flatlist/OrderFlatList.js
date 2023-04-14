import React from "react";
import { FlatList, Text, TouchableHighlight, View } from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import { getData } from "../helpers/global_helpers";
import { getOrders } from "../helpers/order_helpers";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchFilterModal from "../modals/SearchFilterModal.js";

export default function OrderFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [selectedStates, setselectedStates] = React.useState([]);
  const [selectedOrderStates, setselectedOrderStates] = React.useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const toggleSearchFilterModal = () => {
    setSearchFilterModalVisible(!isSearchFilterModalVisible);
  };

  const getOrderList = () => {
    if (props.route.params.tag === all_constants.tag.orders.archived) {
      return props.route.params.item;
    }
    return getOrders();
  };
  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const onPressClearFilters = () => {
    setselectedStates([]);
    setselectedOrderStates([]);
    toggleSearchFilterModal();
  };

  const fetchData = () => {
    console.log(selectedStates);
    console.log(selectedOrderStates);
    console.log(startDate);
    console.log(endDate);
    toggleSearchFilterModal();
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop:
          props.route.params.tag === all_constants.tag.orders.archived
            ? "10%"
            : "0%",
      }}
    >
      {isSearchFilterModalVisible ? (
        <SearchFilterModal
          enableActiveFilter={false}
          enableOrderStateFilter={true}
          enableStartDateFilter={true}
          enableEndDateFilter={true}
          pickStartDate={setStartDate}
          pickEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          isModalVisible={isSearchFilterModalVisible}
          toggleModal={toggleSearchFilterModal}
          stateSearchData={setselectedStates}
          stateOrderData={setselectedOrderStates}
          onPressClear={onPressClearFilters}
          onPressFilter={fetchData}
          buttonLabel={all_constants.search_modal.search_button_label}
        />
      ) : (
        ""
      )}
      <View style={{ flex: 1, flexDirection: "row", backgroundColor: "white" }}>
        <View style={{ flex: 4 }}>
          <Searchbar
            placeholder="Écrivez pour lancer la recherche"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableRipple
            onPress={toggleSearchFilterModal}
            rippleColor="rgba(0, 0, 0, .32)"
          >
            <MaterialCommunityIcons
              name="filter-variant"
              color={"black"}
              size={40}
            />
          </TouchableRipple>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          flex:
            props.route.params.tag === all_constants.tag.orders.paid ? 10 : 1,
        }}
      >
        <FlatList
          data={getData(
            getOrderList(),
            props.route.params.tag,
            undefined,
            "order_tag",
            "id"
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
                {all_constants.order.no_order_found}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles_order.order_button_container}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("OrderView", { item: item });
                }}
                style={{ flex: 1 }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <Order
                  order_amount={item.order_amount}
                  order_number_color={item.order_number_color}
                  order_number={item.order_number}
                  order_status={item.order_status}
                  order_delivery_date={item.order_delivery_date}
                  order_delivery_hour={item.order_delivery_hour}
                ></Order>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </View>
  );
}
