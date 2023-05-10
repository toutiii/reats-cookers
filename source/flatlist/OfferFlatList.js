import React from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import styles_dish from "../styles/styles-dish";
import all_constants from "../constants";
import Offer from "../components/Offer";
import { getOffers } from "../helpers/offer_helpers";
import { Searchbar } from "react-native-paper";
import { TouchableRipple } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchFilterModal from "../modals/SearchFilterModal.js";

export default function OfferFlatList({ ...props }) {
  const [isSearchFilterModalVisible, setSearchFilterModalVisible] =
    React.useState(false);

  const [selectedStates, setSelectedStates] = React.useState([]);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [isFetchingData, setIsFetchingData] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [runSearchByTextInput, setRunSearchByTextInput] = React.useState(false);

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
          const results = await getOffers();
          setData(results.data);
        }
        fetchDataFromBackend();
        updateSearchingStatus();
        resetFilters();
        setRunSearchByTextInput(false);
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

    if (selectedStates.length !== 0) {
      console.log(selectedStates);
      console.log(searchQuery);
      updateSearchingStatus();
    }
  };

  const resetFilters = () => {
    setSelectedStates([]);
  };

  return (
    <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
      {isSearchFilterModalVisible && (
        <SearchFilterModal
          enableActiveFilter={true}
          isModalVisible={isSearchFilterModalVisible}
          toggleModal={toggleSearchFilterModal}
          stateSearchData={setSelectedStates}
          onPressFilter={onPressFilter}
          onPressClear={resetFilters}
          buttonLabel={all_constants.search_modal.search_button_label}
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

      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        {isFetchingData && <ActivityIndicator size="large" color="tomato" />}
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
                {all_constants.order.no_results}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles_dish.dish_button_container}>
              <TouchableHighlight
                onPress={() => {
                  props.navigation.navigate(
                    "OfferFlatlistStackNavigatorOfferFormView",
                    {
                      item: item,
                    }
                  );
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
            </View>
          )}
        />
      </View>
    </Animated.View>
  );
}
