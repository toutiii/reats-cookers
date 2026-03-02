import React, { useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  View,
  FlatList,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import {
  StatCard,
  CategoryItem,
  SearchBar,
  PageHeader,
  MenuItemCard,
  type MenuItem
} from "../../components/menu";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text as UIText } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

interface DashboardStats {
  totalItems: number;
  availableItems: number;
  lowStock: number;
  revenue: number;
  ordersToday: number;
}

type MenuTab = "dishes" | "drinks";

const MenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation("menu");
  const [activeTab, setActiveTab] = useState<MenuTab>("dishes");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const dishCategories = [
    { id: "all", name: t("categories.all"), count: 24 },
    { id: "burgers", name: t("categories.burgers"), count: 8 },
    { id: "pizza", name: t("categories.pizza"), count: 6 },
    { id: "salads", name: t("categories.salads"), count: 5 },
    { id: "desserts", name: t("categories.desserts"), count: 5 },
  ];

  const drinkCategories = [
    { id: "all", name: t("categories.all"), count: 4 },
    { id: "jus", name: "Jus", count: 1 },
    { id: "limonades", name: "Limonades", count: 1 },
    { id: "smoothies", name: "Smoothies", count: 1 },
    { id: "thés", name: "Thés", count: 1 },
  ];

  const categories = activeTab === "dishes" ? dishCategories : drinkCategories;

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Burger Signature",
      price: 18.90,
      cost: 6.30,
      category: "burgers",
      type: "dish",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop",
      sku: "BRG-001",
      maxConcurrentOrders: 10,
      currentOrders: 3,
      available: true,
      description: "Bœuf premium, sauce maison",
      allergens: ["gluten", "lactose", "œufs"],
      preparationTime: 15,
      lastModified: "2025-01-15T10:30:00",
      soldToday: 23,
      revenue: 434.70
    },
    {
      id: "2",
      name: "Pizza Margherita",
      price: 24.50,
      cost: 7.80,
      category: "pizza",
      type: "dish",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop",
      sku: "PZA-001",
      maxConcurrentOrders: 5,
      currentOrders: 5,
      available: true,
      description: "Tomate, mozzarella, basilic",
      allergens: ["gluten", "lactose"],
      preparationTime: 20,
      lastModified: "2025-01-14T15:45:00",
      soldToday: 18,
      revenue: 441.00
    },
    {
      id: "3",
      name: "Salade César",
      price: 14.90,
      cost: 4.50,
      category: "salads",
      type: "dish",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop",
      sku: "SLD-001",
      maxConcurrentOrders: 8,
      currentOrders: 2,
      available: true,
      description: "Romaine, parmesan, croûtons",
      allergens: ["gluten", "lactose", "poisson"],
      preparationTime: 10,
      lastModified: "2025-01-15T09:00:00",
      soldToday: 8,
      revenue: 119.20
    },
    {
      id: "4",
      name: "Fondant Chocolat",
      price: 12.50,
      cost: 3.20,
      category: "desserts",
      type: "dish",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop",
      sku: "DST-001",
      maxConcurrentOrders: 6,
      currentOrders: 0,
      available: false,
      description: "Chocolat noir 70%, glace vanille",
      allergens: ["gluten", "lactose", "œufs"],
      preparationTime: 8,
      lastModified: "2025-01-13T14:20:00",
      soldToday: 0,
      revenue: 0
    },
    {
      id: "5",
      name: "Pizza Quattro Formaggi",
      price: 26.90,
      cost: 8.40,
      category: "pizza",
      type: "dish",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&h=300&fit=crop",
      sku: "PZA-002",
      maxConcurrentOrders: 8,
      currentOrders: 4,
      available: true,
      description: "4 fromages italiens, crème fraîche",
      allergens: ["gluten", "lactose"],
      preparationTime: 22,
      lastModified: "2025-01-15T11:00:00",
      soldToday: 12,
      revenue: 322.80
    },
    {
      id: "6",
      name: "Burger Végétarien",
      price: 16.50,
      cost: 5.20,
      category: "burgers",
      type: "dish",
      image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300&h=300&fit=crop",
      sku: "BRG-002",
      maxConcurrentOrders: 12,
      currentOrders: 1,
      available: true,
      description: "Galette de légumes, avocat, fromage",
      allergens: ["gluten", "lactose", "soja"],
      preparationTime: 12,
      lastModified: "2025-01-14T16:30:00",
      soldToday: 9,
      revenue: 148.50
    },
    {
      id: "7",
      name: "Jus d'Orange Frais",
      price: 5.50,
      cost: 1.80,
      category: "jus",
      type: "drink",
      image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop",
      sku: "DRK-001",
      maxConcurrentOrders: 20,
      currentOrders: 5,
      available: true,
      description: "Orange pressée, sans sucre ajouté",
      allergens: [],
      preparationTime: 3,
      lastModified: "2025-01-15T08:00:00",
      soldToday: 31,
      revenue: 170.50
    },
    {
      id: "8",
      name: "Limonade Maison",
      price: 4.90,
      cost: 1.20,
      category: "limonades",
      type: "drink",
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&h=300&fit=crop",
      sku: "DRK-002",
      maxConcurrentOrders: 25,
      currentOrders: 8,
      available: true,
      description: "Citron, menthe, sucre de canne",
      allergens: [],
      preparationTime: 2,
      lastModified: "2025-01-15T09:30:00",
      soldToday: 22,
      revenue: 107.80
    },
    {
      id: "9",
      name: "Smoothie Mangue-Passion",
      price: 7.50,
      cost: 2.80,
      category: "smoothies",
      type: "drink",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&h=300&fit=crop",
      sku: "DRK-003",
      maxConcurrentOrders: 15,
      currentOrders: 3,
      available: true,
      description: "Mangue, fruit de la passion, banane",
      allergens: [],
      preparationTime: 5,
      lastModified: "2025-01-14T14:00:00",
      soldToday: 14,
      revenue: 105.00
    },
    {
      id: "10",
      name: "Thé Glacé Pêche",
      price: 4.50,
      cost: 1.00,
      category: "thés",
      type: "drink",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop",
      sku: "DRK-004",
      maxConcurrentOrders: 30,
      currentOrders: 0,
      available: false,
      description: "Thé noir, pêche, miel",
      allergens: [],
      preparationTime: 2,
      lastModified: "2025-01-13T11:00:00",
      soldToday: 0,
      revenue: 0
    },
  ];

  const itemsByTab = useMemo(() => {
    const tabType = activeTab === "dishes" ? "dish" : "drink";
    return menuItems.filter(item => item.type === tabType);
  }, [activeTab, menuItems]);

  // Calcul des statistiques
  const stats: DashboardStats = useMemo(() => ({
    totalItems: itemsByTab.length,
    availableItems: itemsByTab.filter(item => item.available).length,
    lowStock: itemsByTab.filter(item => item.currentOrders >= item.maxConcurrentOrders).length,
    revenue: itemsByTab.reduce((sum, item) => sum + item.revenue, 0),
    ordersToday: itemsByTab.reduce((sum, item) => sum + item.soldToday, 0)
  }), [itemsByTab]);

  const filteredItems = useMemo(() => {
    return itemsByTab.filter(item => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [itemsByTab, selectedCategory, searchQuery]);

  const handleToggleAvailability = useCallback((itemId: string) => {
    Alert.alert(
      t("actions.toggleAvailability"),
      t("deleteConfirm.message"),
      [
        { text: t("common:buttons.cancel"), style: "cancel" },
        { text: t("common:buttons.confirm"), onPress: () => console.log("Toggle availability for", itemId) }
      ]
    );
  }, [t]);

  const handleEditItem = useCallback((item: MenuItem) => {
    navigation.navigate("FoodDetails", { item });
  }, [navigation]);

  const handleDeleteItem = useCallback((itemId: string) => {
    Alert.alert(
      t("deleteConfirm.title"),
      t("deleteConfirm.message"),
      [
        { text: t("deleteConfirm.cancel"), style: "cancel" },
        { text: t("deleteConfirm.confirm"), style: "destructive", onPress: () => console.log("Delete", itemId) }
      ]
    );
  }, [t]);


  const renderMenuItem = useCallback(({ item, index }: any) => (
    <MenuItemCard
      item={item}
      index={index}
      onToggleAvailability={handleToggleAvailability}
      onEdit={handleEditItem}
      onDelete={handleDeleteItem}
    />
  ), [handleToggleAvailability, handleEditItem, handleDeleteItem]);

  const handleToggleViewMode = useCallback(() => {
    setViewMode(prev => (prev === "grid"
? "list"
: "grid"));
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

          {/* Menu Items */}
          <FlatList
            data={filteredItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            scrollEnabled={false}
          />

          <View className="h-10" />
          </VStack>
            </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default MenuScreen;