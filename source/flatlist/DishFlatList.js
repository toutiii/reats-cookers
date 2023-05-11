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
import { getDishes } from "../helpers/dish_helpers";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchFilterModal from "../modals/SearchFilterModal.js";

export default function DishFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [selectedStates, setSelectedStates] = React.useState([]);
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
    if (isFetchingData) {
      fadeOut();

      setTimeout(() => {
        async function fetchDataFromBackend() {
          const results = await getDishes();
          setData(results.data);
        }
        fetchDataFromBackend();
        updateSearchingStatus();
        resetFilters();
        setRunSearchByTextInput(false);
        setOneSearchHasBeenRun(true);
        fadeIn();
      }, 5000);
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

  const onPressFilter = () => {
    toggleSearchFilterModal();

    if (selectedStates.length !== 0 || selectedDishCategories.length !== 0) {
      console.log(selectedStates);
      console.log(selectedDishCategories);
      console.log(searchQuery);
      updateSearchingStatus();
    }
  };

  const resetFilters = () => {
    setSelectedStates([]);
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
          stateSearchData={setSelectedStates}
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
                    dish_name={item.dish_name}
                    dish_category={item.dish_category}
                    dish_rating={item.dish_rating}
                    dish_price={item.dish_price + all_constants.currency_symbol}
                    dish_description={item.dish_description}
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
