import React from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Order from "../components/Order";
import { getOrders } from "../helpers/order_helpers";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import SearchFilterModal from "../modals/SearchFilterModal.js";
import CustomAlert from "../components/CustomAlert.js";

export default function OrdersHistoryFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [runSearchByTextInput, setRunSearchByTextInput] = React.useState(false);
  const [dateCheckingOk, setIsDateCheckingOk] = React.useState(true);
  const [showAlert, setShowAlert] = React.useState(false);
  const [selectedOrderStates, setSelectedOrderStates] = React.useState([]);

  const minLengthToTriggerSearch = 3;
  const maxInputLength = 100;
  const delaySearch = 2000;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const toggleSearchFilterModal = () => {
    setSearchFilterModalVisible(!isSearchFilterModalVisible);
  };

  const [searchQuery, setSearchQuery] = React.useState("");

  const onChangeSearch = (query) => {
    console.log(query);
    if (query.length === 0) {
      setSearchQuery("");
    }

    if (
      query.length > 0 &&
      query.length <= maxInputLength &&
      query.charCodeAt(query.slice(-1)) <= 127
    ) {
      setSearchQuery(query.replace("  ", ""));
    }

    if (
      query.replace("  ", "").replace(" ", "").length >=
      minLengthToTriggerSearch
    ) {
      setRunSearchByTextInput(true);
    }
  };

  const updateSearchingStatus = () => {
    setIsFetchingData(!isFetchingData);
  };

  React.useEffect(() => {
    setIsFetchingData(true);
    fadeOut();

    setTimeout(() => {
      async function fetchDataFromBackend() {
        const results = await getOrders();
        setData(results.data);
      }
      fetchDataFromBackend();
      setIsFetchingData(false);
      fadeIn();
    }, 500);
  }, []);

  React.useEffect(() => {
    if (isFetchingData && dateCheckingOk) {
      fadeOut();

      setTimeout(() => {
        async function fetchDataFromBackend() {
          const results = await getOrders();
          setData(results.data);
        }
        fetchDataFromBackend();
        updateSearchingStatus();
        resetFilters();
        setRunSearchByTextInput(false);
        fadeIn();
      }, 1000);
    }
  }, [isFetchingData]);

  React.useEffect(() => {
    if (runSearchByTextInput) {
      const delayDebounceFn = setTimeout(() => {
        updateSearchingStatus();
      }, delaySearch);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [runSearchByTextInput]);

  const checkDates = () => {
    if (startDate !== null && endDate !== null && startDate > endDate) {
      setShowAlert(true);
      setIsDateCheckingOk(false);
    }
  };

  const onPressFilter = () => {
    checkDates();
    toggleSearchFilterModal();

    if (
      selectedOrderStates.length !== 0 ||
      startDate !== null ||
      endDate !== null
    ) {
      console.log(startDate);
      console.log(endDate);
      console.log(selectedOrderStates);
      updateSearchingStatus();
    }
  };

  const resetFilters = () => {
    setSelectedOrderStates([]);
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Animated.View
      style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
    >
      {isSearchFilterModalVisible && (
        <SearchFilterModal
          enableOrderStateFilter={true}
          enableStartDateFilter={true}
          enableEndDateFilter={true}
          pickStartDate={setStartDate}
          pickEndDate={setEndDate}
          startDate={startDate}
          endDate={endDate}
          stateOrderData={setSelectedOrderStates}
          isModalVisible={isSearchFilterModalVisible}
          toggleModal={toggleSearchFilterModal}
          onPressFilter={onPressFilter}
          onPressClear={resetFilters}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 4 }}>
          <Searchbar
            placeholder={all_constants.search_bar.placeholder}
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
            <Image
              source={require("../images/filtre.png")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableRipple>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {!dateCheckingOk && (
          <CustomAlert
            show={showAlert}
            title={all_constants.search_modal.alert.date.title}
            message={all_constants.search_modal.alert.date.message}
            confirmButtonColor="red"
            onConfirmPressed={() => {
              setShowAlert(false);
              setIsDateCheckingOk(true);
              setIsFetchingData(false);
            }}
          />
        )}
        {isFetchingData && dateCheckingOk && (
          <ActivityIndicator size="large" color="tomato" />
        )}
        <FlatList
          data={data}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                marginTop: "5%",
              }}
            >
              <Text style={{ fontSize: 20 }}>
                {all_constants.order.no_results.no_results}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles_order.order_button_container}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate("OrderHistoryiew", {
                    item: item,
                  });
                }}
                style={{ flex: 1 }}
                underlayColor={all_constants.colors.inputBorderColor}
              >
                <Order
                  order_amount={item.order_amount}
                  order_number={item.order_number}
                  order_status={item.order_status}
                  order_delivery_date={item.order_delivery_date}
                  dishes_number={item.dishes.length}
                ></Order>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
}
