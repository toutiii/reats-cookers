import React, { useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  View,
  FlatList,
  StatusBar,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import {
  CategoryItem,
  SearchBar,
  PageHeader,
  MenuItemCard,
  type MenuItem,
} from "../../components/menu";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text as UIText } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  useListDishesQuery,
  useToggleDishAvailabilityMutation,
  useDeleteDishMutation,
} from "@/store/api/dishApi";
import type { Dish } from "@/types/dish";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

// Resolve image path: return as-is if already absolute, otherwise prefix with API base
const resolveImageUrl = (path: string): string => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${API_BASE_URL}/${path}`;
};

type MenuTab = "dishes" | "drinks";

// Map API dish to the existing MenuItem shape used by components
const mapDishToMenuItem = (dish: Dish): MenuItem => {
  return {
    id: String(dish.id),
    name: dish.name ?? "",
    price: dish.price ?? 0,
    cost: dish.cost ?? 0,
    category: dish.category ?? "dish",
    type: "dish",
    image: resolveImageUrl(dish.image ?? ""),
    sku: `DSH-${String(dish.id).padStart(3, "0")}`,
    maxConcurrentOrders: dish.max_concurrent_orders ?? 0,
    currentOrders: dish.current_orders ?? 0,
    available: dish.is_enabled ?? false,
    description: dish.description ?? "",
    allergens: Array.isArray(dish.allergens) ? [...dish.allergens] : [],
    preparationTime: dish.preparation_time ?? 0,
    lastModified: dish.updated_at ?? "",
    soldToday: 0,
    revenue: 0,
  };
};

const DISH_CATEGORIES: readonly { id: string; name: string }[] = [
  { id: "all", name: "all" },
  { id: "dish", name: "mains" },
  { id: "starter", name: "appetizers" },
  { id: "dessert", name: "desserts" },
] as const;

const MenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation("menu");
  const [activeTab, setActiveTab] = useState<MenuTab>("dishes");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [page] = useState(1);

  // RTK Query hooks for dishes
  const {
    data: dishesData,
    isLoading: isDishesLoading,
  } = useListDishesQuery({
    page,
    page_size: 20,
    search: searchQuery.length > 0 ? searchQuery : undefined,
    is_enabled: selectedCategory === "all" ? undefined : undefined,
  });

  console.log("Fetched dishes:", dishesData);

  const [toggleAvailability] = useToggleDishAvailabilityMutation();
  const [deleteDish] = useDeleteDishMutation();

  // Map API dishes to MenuItem format
  const dishMenuItems: MenuItem[] = useMemo(() => {
    if (!dishesData?.results) return [];
    return dishesData.results.map(mapDishToMenuItem);
  }, [dishesData]);

  // Category counts from API data
  const dishCategories = useMemo(() => {
    const items = dishesData?.results ?? [];
    return DISH_CATEGORIES.map((cat) => ({
      id: cat.id,
      name: t(`categories.${cat.name}`),
      count: cat.id === "all"
        ? items.length
        : items.filter((d) => d.category === cat.id).length,
    }));
  }, [dishesData, t]);

  const drinkCategories = [
    { id: "all", name: t("categories.all"), count: 0 },
  ];

  const categories = activeTab === "dishes" ? dishCategories : drinkCategories;

  const filteredItems = useMemo(() => {
    const items = activeTab === "dishes" ? dishMenuItems : [];
    return items.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesCategory;
    });
  }, [activeTab, dishMenuItems, selectedCategory]);

  const handleToggleAvailability = useCallback((itemId: string) => {
    Alert.alert(
      t("actions.toggleAvailability"),
      t("deleteConfirm.message"),
      [
        { text: t("common:buttons.cancel"), style: "cancel" },
        {
          text: t("common:buttons.confirm"),
          onPress: async () => {
            try {
              await toggleAvailability(Number(itemId)).unwrap();
            } catch {
              Alert.alert(t("alerts.errorTitle"), t("alerts.errorMessage"));
            }
          },
        },
      ]
    );
  }, [t, toggleAvailability]);

  const handleEditItem = useCallback((item: MenuItem) => {
    navigation.navigate("FoodDetails", { dishId: Number(item.id) });
  }, [navigation]);

  const handleDeleteItem = useCallback((itemId: string) => {
    Alert.alert(
      t("deleteConfirm.title"),
      t("deleteConfirm.message"),
      [
        { text: t("deleteConfirm.cancel"), style: "cancel" },
        {
          text: t("deleteConfirm.confirm"),
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDish(Number(itemId)).unwrap();
            } catch {
              Alert.alert(t("alerts.errorTitle"), t("alerts.errorMessage"));
            }
          },
        },
      ]
    );
  }, [t, deleteDish]);

  const renderMenuItem = useCallback(({ item, index }: { item: MenuItem; index: number }) => (
    <MenuItemCard
      item={item}
      index={index}
      onToggleAvailability={handleToggleAvailability}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
    />
  ), [handleToggleAvailability, handleEditItem, handleDeleteItem]);

  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  }, []);

  const handleAddPress = useCallback(() => {
    navigation.navigate("AddMenuItemScreen");
  }, [navigation]);

  const handleAddDrinksPress = useCallback(() => {
    navigation.navigate("AddDrinksScreen");
  }, [navigation]);

  return (
    <ThemedView>
      <StatusBar barStyle="dark-content" />

      <SafeAreaView edges={["top"]} className="flex-1">
        {/* Header */}
        <View className="bg-white px-5 pt-4 pb-3 border-b border-gray-100">
          <PageHeader
            onBack={() => navigation.goBack()}
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
            onAddPress={handleAddPress}
          />
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

          {/* Tabs Plats / Boissons */}
          <View className="mt-3 flex-row bg-gray-100 rounded-xl p-1">
            <TouchableOpacity
              onPress={() => { setActiveTab("dishes"); setSelectedCategory("all"); }}
              className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${
                activeTab === "dishes" ? "bg-white" : ""
              }`}
              style={activeTab === "dishes" ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              } : undefined}
            >
              <Ionicons
                name="restaurant-outline"
                size={18}
                color={activeTab === "dishes" ? "#EA580C" : "#6B7280"}
              />
              <UIText className={`ml-2 text-sm font-semibold ${
                activeTab === "dishes" ? "text-orange-700" : "text-gray-500"
              }`}>
                Plats
              </UIText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { setActiveTab("drinks"); setSelectedCategory("all"); }}
              className={`flex-1 flex-row items-center justify-center py-2.5 rounded-lg ${
                activeTab === "drinks" ? "bg-white" : ""
              }`}
              style={activeTab === "drinks" ? {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              } : undefined}
            >
              <Ionicons
                name="cafe-outline"
                size={18}
                color={activeTab === "drinks" ? "#9333EA" : "#6B7280"}
              />
              <UIText className={`ml-2 text-sm font-semibold ${
                activeTab === "drinks" ? "text-purple-700" : "text-gray-500"
              }`}>
                Boissons
              </UIText>
            </TouchableOpacity>
          </View>

          {/* Add Dish & Drinks Buttons */}
          <View className="mt-3 flex-row items-center gap-2">
            <TouchableOpacity
              onPress={handleAddPress}
              className="flex-row items-center bg-orange-50 border border-orange-200 rounded-xl px-4 py-2.5"
            >
              <Ionicons name="restaurant-outline" size={18} color="#EA580C" />
              <UIText className="ml-2 text-sm font-semibold text-orange-700">
                Ajouter un plat
              </UIText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleAddDrinksPress}
              className="flex-row items-center bg-purple-50 border border-purple-200 rounded-xl px-4 py-2.5"
            >
              <Ionicons name="cafe-outline" size={18} color="#9333EA" />
              <UIText className="ml-2 text-sm font-semibold text-purple-700">
                Ajouter une boisson
              </UIText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={"xl"} className="px-5 py-4">
          {/* Categories */}
          <View className="px-5 mb-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onPress={setSelectedCategory}
                />
              ))}
            </ScrollView>
          </View>

          {/* Loading state */}
          {isDishesLoading && activeTab === "dishes" && (
            <View className="py-12 items-center">
              <ActivityIndicator size="large" color="#FF6347" />
            </View>
          )}

          {/* Menu Items */}
          {!isDishesLoading && (
            <FlatList
              data={filteredItems}
              renderItem={renderMenuItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              scrollEnabled={false}
              ListEmptyComponent={
                <View className="py-12 items-center">
                  <UIText className="text-gray-400">{t("search.noResults")}</UIText>
                </View>
              }
            />
          )}

          <View className="h-10" />
          </VStack>
            </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default MenuScreen;