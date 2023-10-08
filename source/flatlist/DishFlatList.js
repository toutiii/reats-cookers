import React from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import styles_order from "../styles/styles-order.js";
import all_constants from "../constants";
import Dish from "../components/Dish";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchFilterModal from "../modals/SearchFilterModal.js";
import { callBackEndGET } from "../api/callBackend";

export default function DishFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [selectedState, setSelectedState] = React.useState(null);
  const [selectedDishCategories, setSelectedDishCategories] = React.useState(
    []
  );
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [runSearchByTextInput, setRunSearchByTextInput] = React.useState(false);
  const [oneSearchHasBeenRun, setOneSearchHasBeenRun] = React.useState(false);

  const minLengthToTriggerSearch = 3;
  const maxInputLength = 100;
  const delaySearch = 2000;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  const toggleSearchFilterModal = () => {
    setSearchFilterModalVisible(!isSearchFilterModalVisible);
  };

  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchURL, setSearchURL] = React.useState("");

  const onChangeSearch = (query) => {
    console.log(query);
    if (query.length === 0) {
      setSearchQuery("");
    }

    if (query.length > 0 && query.length <= maxInputLength) {
      setSearchQuery(query.replace("  ", ""));
    }

    if (
      query.replace("  ", "").replace(" ", "").length >=
      minLengthToTriggerSearch
    ) {
      setRunSearchByTextInput(true);
    }
  };

  React.useEffect(() => {
    if (isFetchingData) {
      fadeOut();
      setTimeout(() => {
        async function fetchDataFromBackend() {
          console.log(searchURL);
          const results = await callBackEndGET(searchURL);
          console.log(results);
          setData(results.data);
        }
        fetchDataFromBackend();
        setIsFetchingData(false);
        resetFilters();
        setRunSearchByTextInput(false);
        setOneSearchHasBeenRun(true);
        fadeIn();
      }, 200);
    }
  }, [searchURL]);

  React.useEffect(() => {
    if (runSearchByTextInput) {
      const delayDebounceFn = setTimeout(() => {
        setIsFetchingData(true);
        buildSearchUrl();
      }, delaySearch);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchQuery]);

  const onPressFilter = () => {
    toggleSearchFilterModal();

    if (selectedState !== null || selectedDishCategories.length !== 0) {
      console.log(selectedState);
      console.log(selectedDishCategories);
      console.log(searchQuery);
      setIsFetchingData(true);
      buildSearchUrl();
    }
  };

  const buildSearchUrl = () => {
    let queryParams = "";
    let baseURL = "http://192.168.1.82:8000/api/v1/dishes?";

    if (searchQuery.length > 0) {
      queryParams += `name=${searchQuery}`;
    }

    if (selectedDishCategories.length !== 0) {
      queryParams += `&category=${selectedDishCategories}`;
    }

    if (selectedState !== null) {
      queryParams += `&is_enabled=${selectedState}`;
    }
    let searchURL = baseURL + queryParams;
    setSearchURL(searchURL.replace("?&", "?"));
  };

  const resetFilters = () => {
    setSelectedState(null);
    setSelectedDishCategories([]);
  };

  return (
    <Animated.View
      style={{ flex: 1, opacity: fadeAnim, backgroundColor: "white" }}
    >
      {isSearchFilterModalVisible && (
        <SearchFilterModal
          enableActiveFilter={true}
          enableDishCategories={true}
          isModalVisible={isSearchFilterModalVisible}
          toggleModal={toggleSearchFilterModal}
          stateSearchData={setSelectedState}
          dishCategoriesData={setSelectedDishCategories}
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
            <MaterialCommunityIcons
              name="filter-variant"
              color={"black"}
              size={40}
            />
          </TouchableRipple>
        </View>
      </View>

      {!oneSearchHasBeenRun && (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <Text
            style={{ fontSize: 16, textAlign: "center", fontStyle: "italic" }}
          >
            {all_constants.search_bar.search_bar_dishes}
          </Text>
        </View>
      )}

      {isFetchingData && (
        <View
          style={{
            backgroundColor: "white",
            alignItems: "center",
            marginTop: "5%",
          }}
        >
          <ActivityIndicator size="large" color="tomato" />
        </View>
      )}

      {oneSearchHasBeenRun && (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
          }}
        >
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
                  {all_constants.dishes.no_dishes_found}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <View style={styles_order.order_button_container}>
                <TouchableHighlight
                  onPress={() => {
                    props.navigation.navigate(
                      "DishFlatlistStackNavigatorDishFormView",
                      {
                        item: item,
                      }
                    );
                  }}
                  style={{ flex: 1 }}
                  underlayColor={all_constants.colors.inputBorderColor}
                >
                  <Dish
                    key={item.id}
                    dish_photo={item.photo}
                    dish_name={item.name}
                    dish_category={item.category}
                    dish_rating={item.rating ? item.rating : "-/-"}
                    dish_price={item.price + all_constants.currency_symbol}
                    dish_description={item.description}
                    onPress={item.onPress}
                  />
                </TouchableHighlight>
              </View>
            )}
          />
        </View>
      )}
    </Animated.View>
  );
}
