import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { useGetDishQuery, useDeleteDishMutation } from "@/store/api/dishApi";
import { useGetDrinkQuery, useDeleteDrinkMutation } from "@/store/api/drinkApi";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

const resolveImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}/${path}`;
};

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 400;

const FoodDetailsScreen: React.FC<any> = ({ navigation, route }) => {
  // Accept new params (itemId/itemType) and fall back to legacy dishId
  const { itemId, itemType, dishId } = route.params || {};
  const resolvedId = itemId ?? dishId;
  const isDrink = itemType === "drink";

  const dishQuery = useGetDishQuery(resolvedId, { skip: !resolvedId || isDrink });
  const drinkQuery = useGetDrinkQuery(resolvedId, { skip: !resolvedId || !isDrink });

  const [deleteDish, { isLoading: isDeletingDish }] = useDeleteDishMutation();
  const [deleteDrink, { isLoading: isDeletingDrink }] = useDeleteDrinkMutation();
  const isDeleting = isDeletingDish || isDeletingDrink;

  const handleEdit = () => {
    if (!resolvedId) return;
    if (isDrink) {
      navigation.navigate("AddDrinksScreen", { drinkId: resolvedId });
      return;
    }
    navigation.navigate("AddMenuItemScreen", { dishId: resolvedId });
  };

  const handleDelete = () => {
    if (!resolvedId) return;
    Alert.alert(
      "Supprimer",
      isDrink
        ? "Voulez-vous vraiment supprimer cette boisson ?"
        : "Voulez-vous vraiment supprimer ce plat ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              if (isDrink) {
                await deleteDrink(resolvedId).unwrap();
              } else {
                await deleteDish(resolvedId).unwrap();
              }
              navigation.goBack();
            } catch {
              Alert.alert("Erreur", "Suppression impossible. Réessayez.");
            }
          },
        },
      ],
    );
  };

  const isLoading = isDrink ? drinkQuery.isLoading : dishQuery.isLoading;
  const isError = isDrink ? drinkQuery.isError : dishQuery.isError;
  const dish = isDrink ? undefined : dishQuery.data;
  const drink = isDrink ? drinkQuery.data : undefined;
  const item = (dish ?? drink) as
    | (typeof dish & typeof drink)
    | undefined;

  const scrollY = useSharedValue(0);
  const [selectedTab, setSelectedTab] = useState<"info" | "ingredients" | "allergens">("info");

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_HEIGHT - 150, HEADER_HEIGHT - 80],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-150, 0],
      [1.4, 1],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT * 0.3],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY }, { scale }],
    };
  });

  if (isLoading) {
    return (
      <ThemedView>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#FF6347" />
        </View>
      </ThemedView>
    );
  }

  if (isError || !item) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1 items-center justify-center px-5">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="text-gray-600 mt-3 text-center">
            {isDrink ? "Failed to load drink details." : "Failed to load dish details."}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 bg-primary-500 px-6 py-3 rounded-xl">
            <Text className="text-white font-bold">Go back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const price = item.price ?? 0;
  const cost = isDrink ? 0 : (dish?.cost ?? 0);
  const profit = !isDrink && price > 0 ? (((price - cost) / price) * 100).toFixed(0) : "0";
  const imageUrl = Array.isArray(item.images) && item.images.length > 0
    ? resolveImageUrl(item.images[0].url)
    : resolveImageUrl(item.image ?? "");
  // For drinks we derive allergens from ingredients (filter is_allergen)
  const drinkAllergens = isDrink && Array.isArray(drink?.ingredients)
    ? drink!.ingredients.filter((i) => i.is_allergen).map((i) => i.name)
    : [];
  const allergensList: readonly string[] = isDrink
    ? drinkAllergens
    : (Array.isArray(dish?.allergens) ? dish!.allergens : []);

  return (
    <ThemedView>
      <StatusBar barStyle="light-content" />

      {/* Animated Header */}
      <Animated.View
        style={[headerAnimatedStyle]}
        className="absolute top-0 left-0 right-0 z-50"
        pointerEvents="box-none"
      >
        <BlurView
          intensity={95}
          tint="light"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "rgba(0,0,0,0.05)",
          }}
        >
          <SafeAreaView edges={["top"]}>
            <View className="flex-row items-center justify-between px-5 py-3">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="w-10 h-10 items-center justify-center"
              >
                <Ionicons name="arrow-back" size={24} color="#1F2937" />
              </TouchableOpacity>
              <Text className="text-gray-900 text-base font-bold flex-1 text-center" numberOfLines={1}>
                {item.name}
              </Text>
              <TouchableOpacity className="w-10 h-10 items-center justify-center">
                <Ionicons name="heart-outline" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={{ height: HEADER_HEIGHT }}>
          <Animated.View style={[imageAnimatedStyle, { height: HEADER_HEIGHT }]}>
            <Image
              source={{ uri: imageUrl }}
              style={{ width, height: HEADER_HEIGHT }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={[
                "transparent",
                "rgba(0,0,0,0.1)",
                "rgba(0,0,0,0.5)",
                "rgba(0,0,0,0.8)"
              ]}
              locations={[0, 0.3, 0.7, 1]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 180,
              }}
            />
          </Animated.View>

          {/* Floating Action Buttons */}
          <View className="absolute top-0 left-0 right-0 px-4">
            <SafeAreaView edges={["top"]}>
              <View className="flex-row items-center justify-between pt-2">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="w-11 h-11 bg-white/95 rounded-full items-center justify-center"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.15,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                >
                  <Ionicons name="arrow-back" size={22} color="#1F2937" />
                </TouchableOpacity>
                <View className="flex-row gap-3">
                  <TouchableOpacity
                    className="w-11 h-11 bg-white/95 rounded-full items-center justify-center"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                  >
                    <Ionicons name="share-outline" size={21} color="#1F2937" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="w-11 h-11 bg-white/95 rounded-full items-center justify-center"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: 0.15,
                      shadowRadius: 8,
                      elevation: 5,
                    }}
                  >
                    <Ionicons name="heart-outline" size={21} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>

          {/* Status Badge */}
          <Animated.View
            entering={FadeIn.delay(300)}
            className="absolute bottom-12 left-5"
          >
            <View
              className={`px-4 py-2.5 rounded-full flex-row items-center ${item.is_enabled
? "bg-green-500"
: "bg-red-500"}`}
              style={{
                shadowColor: item.is_enabled
? "#10B981"
: "#EF4444",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <View className="w-2 h-2 rounded-full mr-2 bg-white" />
              <Text className="text-white font-bold text-xs tracking-wide">
                {item.is_enabled
? "DISPONIBLE"
: "INDISPONIBLE"}
              </Text>
            </View>
          </Animated.View>
        </View>

        {/* Content */}
        <View className="bg-gray-50 rounded-t-3xl -mt-6 pt-8">
          {/* Header Info */}
          <Animated.View entering={FadeInDown.delay(100)} className="px-5 mb-5">
            <View className="mb-4">
              <Heading className="text-3xl font-bold mb-2 text-gray-900">{item.name}</Heading>
              <Text className="text-base text-gray-600 leading-6 mb-3">{item.description}</Text>
              <View className="flex-row items-center gap-2">
                <View className="bg-gray-200 px-3 py-1.5 rounded-lg">
                  <Text className="text-xs font-semibold text-gray-700">
                    {isDrink ? "Boisson" : dish?.category}
                  </Text>
                </View>
                {isDrink ? (
                  <View className="bg-purple-50 px-3 py-1.5 rounded-lg flex-row items-center">
                    <Ionicons name="cafe-outline" size={14} color="#9333EA" />
                    <Text className="text-xs font-semibold text-purple-600 ml-1">{drink?.capacity} cl</Text>
                  </View>
                ) : (
                  <View className="bg-orange-50 px-3 py-1.5 rounded-lg flex-row items-center">
                    <Ionicons name="time-outline" size={14} color="#FF6347" />
                    <Text className="text-xs font-semibold text-orange-600 ml-1">{dish?.preparation_time} min</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Price Card */}
            <View
              className="bg-white rounded-2xl p-5 mb-5"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Prix de vente</Text>
                  <Heading className="text-3xl font-bold text-primary-500">
                    €{price.toFixed(2)}
                  </Heading>
                </View>
                {!isDrink && (
                  <>
                    <View className="h-14 w-px bg-gray-100 mx-4" />
                    <View className="flex-1">
                      <Text className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Coût</Text>
                      <Text className="text-2xl font-bold text-gray-900">
                        €{cost.toFixed(2)}
                      </Text>
                    </View>
                    <View className="h-14 w-px bg-gray-100 mx-4" />
                    <View className="flex-1">
                      <Text className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">Marge</Text>
                      <Text className="text-2xl font-bold text-green-600">
                        {profit}%
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* Metrics Grid */}
            <View className="flex-row gap-3 mb-5">
              {isDrink ? (
                <>
                  <Animated.View
                    entering={SlideInRight.delay(200)}
                    className="flex-1 bg-white rounded-2xl p-4"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Ionicons name="flash-outline" size={20} color="#10B981" />
                      <Text className="text-base font-bold text-green-600">
                        {drink?.is_suitable_for_quick_delivery ? "Oui" : "Non"}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-600">Livraison rapide</Text>
                  </Animated.View>

                  <Animated.View
                    entering={SlideInRight.delay(300)}
                    className="flex-1 bg-white rounded-2xl p-4"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Ionicons name="calendar-outline" size={20} color="#3B82F6" />
                      <Text className="text-base font-bold text-blue-600">
                        {drink?.is_suitable_for_scheduled_delivery ? "Oui" : "Non"}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-600">Livraison programmée</Text>
                  </Animated.View>
                </>
              ) : (
                <>
                  <Animated.View
                    entering={SlideInRight.delay(200)}
                    className="flex-1 bg-white rounded-2xl p-4"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Ionicons name="restaurant-outline" size={20} color="#FF6347" />
                      <Text className="text-2xl font-bold text-primary-500">
                        {dish?.max_concurrent_orders}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-600">Commandes max</Text>
                  </Animated.View>

                  <Animated.View
                    entering={SlideInRight.delay(300)}
                    className="flex-1 bg-white rounded-2xl p-4"
                    style={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 8,
                      elevation: 2,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Ionicons name="time-outline" size={20} color="#3B82F6" />
                      <Text className="text-2xl font-bold text-blue-600">
                        {dish?.preparation_time}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-600">Temps de préparation (min)</Text>
                  </Animated.View>
                </>
              )}
            </View>
          </Animated.View>

          {/* Tabs */}
          <View className="px-5 mb-5">
            <View
              className="bg-white rounded-2xl p-1.5 flex-row"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <TouchableOpacity
                onPress={() => setSelectedTab("info")}
                className={`flex-1 py-3 rounded-lg ${selectedTab === "info"
? "bg-primary-500"
: ""}`}
              >
                <Text className={`text-center font-semibold text-sm ${selectedTab === "info"
? "text-white"
: ""}`}>
                  Informations
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("ingredients")}
                className={`flex-1 py-3 rounded-lg ${selectedTab === "ingredients"
? "bg-primary-500"
: ""}`}
              >
                <Text className={`text-center font-semibold text-sm ${selectedTab === "ingredients"
? "text-white"
: ""}`}>
                  Ingrédients
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedTab("allergens")}
                className={`flex-1 py-3 rounded-lg ${selectedTab === "allergens"
? "bg-primary-500"
: ""}`}
              >
                <Text className={`text-center font-semibold text-sm ${selectedTab === "allergens"
? "text-white"
: ""}`}>
                  Allergènes
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Tab Content */}
          <View className="px-5 pb-32">
            {selectedTab === "info" && (
              <Animated.View entering={FadeIn} className="bg-white rounded-2xl p-5">
                <View className="mb-4">
                  <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                    Description complète
                  </Text>
                  <Text className="text-sm leading-6">
                    {item.description || (isDrink
                      ? "Aucune description disponible pour cette boisson."
                      : "Aucune description disponible pour ce plat.")}
                  </Text>
                </View>

                <View className="h-px bg-gray-200 my-4" />

                <View className="mb-4">
                  <Text className="text-xs font-semibold mb-3 uppercase tracking-wide">
                    Détails techniques
                  </Text>
                  <View className="gap-3">
                    {isDrink ? (
                      <>
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="cafe-outline" size={18} color="#9333EA" />
                            </View>
                            <Text className="text-sm">Volume</Text>
                          </View>
                          <Text className="font-semibold">{drink?.capacity} cl</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="flash-outline" size={18} color="#10B981" />
                            </View>
                            <Text className="text-sm">Livraison rapide</Text>
                          </View>
                          <Text className="font-semibold">
                            {drink?.is_suitable_for_quick_delivery ? "Oui" : "Non"}
                          </Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="calendar-outline" size={18} color="#3B82F6" />
                            </View>
                            <Text className="text-sm">Livraison programmée</Text>
                          </View>
                          <Text className="font-semibold">
                            {drink?.is_suitable_for_scheduled_delivery ? "Oui" : "Non"}
                          </Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="time-outline" size={18} color="#FF6347" />
                            </View>
                            <Text className="text-sm">Temps de préparation</Text>
                          </View>
                          <Text className="font-semibold">{dish?.preparation_time} min</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="restaurant-outline" size={18} color="#3B82F6" />
                            </View>
                            <Text className="text-sm">Capacité max</Text>
                          </View>
                          <Text className="font-semibold">{dish?.max_concurrent_orders} commandes</Text>
                        </View>

                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-3">
                              <Ionicons name="pricetag-outline" size={18} color="#9333EA" />
                            </View>
                            <Text className="text-sm">Catégorie</Text>
                          </View>
                          <Text className="font-semibold capitalize">{dish?.category}</Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>

                <View className="h-px bg-gray-200 my-4" />

                <View>
                  <Text className="text-xs font-semibold mb-3 uppercase tracking-wide">
                    Dernière modification
                  </Text>
                  <Text className="text-sm">
                    {item.updated_at
                      ? new Date(item.updated_at).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </Text>
                </View>
              </Animated.View>
            )}

            {selectedTab === "ingredients" && (
              <Animated.View entering={FadeIn} className="bg-white rounded-2xl p-5">
                <Text className="text-xs font-semibold mb-4 uppercase tracking-wide">
                  Liste des ingrédients
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {Array.isArray(item.ingredients) && item.ingredients.length > 0
                    ? item.ingredients.map((ingredient: any, index: number) => (
                        <View key={index} className="bg-gray-100 px-4 py-2 rounded-full">
                          <Text className="text-sm">
                            {typeof ingredient === "string" ? ingredient : ingredient.name}
                            {!isDrink && ingredient?.quantity ? ` (${ingredient.quantity})` : ""}
                          </Text>
                        </View>
                      ))
                    : (
                        <Text className="text-sm text-gray-400">Aucun ingrédient renseigné.</Text>
                      )}
                </View>
              </Animated.View>
            )}

            {selectedTab === "allergens" && (
              <Animated.View entering={FadeIn} className="bg-white rounded-2xl p-5">
                <Text className="text-xs font-semibold mb-4 uppercase tracking-wide">
                  Allergènes présents
                </Text>
                <View className="gap-3">
                  {allergensList.length > 0
                    ? allergensList.map((allergen: string, index: number) => (
                        <View key={index} className="flex-row items-center bg-red-50 p-3 rounded-xl">
                          <View className="w-8 h-8 bg-red-100 rounded-full items-center justify-center mr-3">
                            <MaterialIcons name="warning" size={18} color="#EF4444" />
                          </View>
                          <Text className="text-sm font-medium capitalize">{allergen}</Text>
                        </View>
                      ))
                    : (
                        <Text className="text-sm text-gray-400">Aucun allergène renseigné.</Text>
                      )}
                </View>
              </Animated.View>
            )}
          </View>
        </View>
      </Animated.ScrollView>

      {/* Bottom Action Bar */}
      <Animated.View
        entering={FadeInDown.delay(400)}
        className="absolute bottom-0 left-0 right-0"
      >
        <BlurView intensity={80} tint="light">
          <SafeAreaView edges={["bottom"]}>
            <View className="px-5 py-4 flex-row gap-3">
              <TouchableOpacity
                onPress={handleDelete}
                disabled={isDeleting}
                className="bg-white border border-red-200 rounded-2xl px-6 py-4 flex-row items-center justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  opacity: isDeleting ? 0.6 : 1,
                }}
              >
                {isDeleting ? (
                  <ActivityIndicator size="small" color="#EF4444" />
                ) : (
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                )}
                <Text className="font-bold ml-2 text-red-500">Supprimer</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleEdit}
                className="flex-1 bg-primary-500 rounded-2xl py-4 flex-row items-center justify-center"
                style={{
                  shadowColor: "#FF6347",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="create-outline" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">Modifier</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      </Animated.View>
    </ThemedView>
  );
};

export default FoodDetailsScreen;
