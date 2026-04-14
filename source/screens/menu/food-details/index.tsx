import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Image,
  ActivityIndicator,
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
import { useGetDishQuery } from "@/store/api/dishApi";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

const resolveImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}/${path}`;
};

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 400;

const FoodDetailsScreen: React.FC<any> = ({ navigation, route }) => {
  const { dishId } = route.params || {};
  const { data: dish, isLoading, isError } = useGetDishQuery(dishId, { skip: !dishId });

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

  if (isError || !dish) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1 items-center justify-center px-5">
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text className="text-gray-600 mt-3 text-center">Failed to load dish details.</Text>
          <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4 bg-primary-500 px-6 py-3 rounded-xl">
            <Text className="text-white font-bold">Go back</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const price = dish.price ?? 0;
  const cost = dish.cost ?? 0;
  const profit = price > 0 ? (((price - cost) / price) * 100).toFixed(0) : "0";
  const imageUrl = Array.isArray(dish.images) && dish.images.length > 0
    ? resolveImageUrl(dish.images[0].url)
    : resolveImageUrl(dish.image ?? "");

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
                {dish.name}
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
              className={`px-4 py-2.5 rounded-full flex-row items-center ${dish.is_enabled
? "bg-green-500"
: "bg-red-500"}`}
              style={{
                shadowColor: dish.is_enabled
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
                {dish.is_enabled
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
              <Heading className="text-3xl font-bold mb-2 text-gray-900">{dish.name}</Heading>
              <Text className="text-base text-gray-600 leading-6 mb-3">{dish.description}</Text>
              <View className="flex-row items-center gap-2">
                <View className="bg-gray-200 px-3 py-1.5 rounded-lg">
                  <Text className="text-xs font-semibold text-gray-700">{dish.category}</Text>
                </View>
                <View className="bg-orange-50 px-3 py-1.5 rounded-lg flex-row items-center">
                  <Ionicons name="time-outline" size={14} color="#FF6347" />
                  <Text className="text-xs font-semibold text-orange-600 ml-1">{dish.preparation_time} min</Text>
                </View>
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
              </View>
            </View>

            {/* Metrics Grid */}
            <View className="flex-row gap-3 mb-5">
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
                    {dish.max_concurrent_orders}
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
                    {dish.preparation_time}
                  </Text>
                </View>
                <Text className="text-xs text-gray-600">Temps de préparation (min)</Text>
              </Animated.View>
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
                    {dish.description || "Aucune description disponible pour ce plat."}
                  </Text>
                </View>

                <View className="h-px bg-gray-200 my-4" />

                <View className="mb-4">
                  <Text className="text-xs font-semibold mb-3 uppercase tracking-wide">
                    Détails techniques
                  </Text>
                  <View className="gap-3">
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-orange-100 rounded-lg items-center justify-center mr-3">
                          <Ionicons name="time-outline" size={18} color="#FF6347" />
                        </View>
                        <Text className="text-sm">Temps de préparation</Text>
                      </View>
                      <Text className="font-semibold">{dish.preparation_time} min</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
                          <Ionicons name="restaurant-outline" size={18} color="#3B82F6" />
                        </View>
                        <Text className="text-sm">Capacité max</Text>
                      </View>
                      <Text className="font-semibold">{dish.max_concurrent_orders} commandes</Text>
                    </View>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-3">
                          <Ionicons name="pricetag-outline" size={18} color="#9333EA" />
                        </View>
                        <Text className="text-sm">Catégorie</Text>
                      </View>
                      <Text className="font-semibold capitalize">{dish.category}</Text>
                    </View>
                  </View>
                </View>

                <View className="h-px bg-gray-200 my-4" />

                <View>
                  <Text className="text-xs font-semibold mb-3 uppercase tracking-wide">
                    Dernière modification
                  </Text>
                  <Text className="text-sm">
                    {dish.updated_at
                      ? new Date(dish.updated_at).toLocaleDateString("fr-FR", {
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
                  {Array.isArray(dish.ingredients) && dish.ingredients.length > 0
                    ? dish.ingredients.map((ingredient, index) => (
                        <View key={index} className="bg-gray-100 px-4 py-2 rounded-full">
                          <Text className="text-sm">
                            {ingredient.name}
                            {ingredient.quantity ? ` (${ingredient.quantity})` : ""}
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
                  {Array.isArray(dish.allergens) && dish.allergens.length > 0
                    ? dish.allergens.map((allergen: string, index: number) => (
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
                className="bg-white border border-gray-300 rounded-2xl px-6 py-4 flex-row items-center justify-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="create-outline" size={20} color="#374151" />
                <Text className="font-bold ml-2">Modifier</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-primary-500 rounded-2xl py-4 flex-row items-center justify-center"
                style={{
                  shadowColor: "#FF6347",
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                }}
              >
                <Ionicons name="analytics-outline" size={20} color="white" />
                <Text className="text-white font-bold text-base ml-2">Voir Analytics</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </BlurView>
      </Animated.View>
    </ThemedView>
  );
};

export default FoodDetailsScreen;
