import React, { useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  View,
  FlatList,
  StatusBar,
  Alert
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
import { ThemedView } from "@/components/themed-view";
import { VStack } from "@/components/ui/vstack";

interface DashboardStats {
  totalItems: number;
  availableItems: number;
  lowStock: number;
  revenue: number;
  ordersToday: number;
}

const MenuScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation("menu");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const categories = [
    { id: "all", name: t("categories.all"), count: 24 },
    { id: "burgers", name: t("categories.burgers"), count: 8 },
    { id: "pizza", name: t("categories.pizza"), count: 6 },
    { id: "salads", name: t("categories.salads"), count: 5 },
    { id: "desserts", name: t("categories.desserts"), count: 5 },
  ];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Burger Signature",
      price: 18.90,
      cost: 6.30,
      category: "burgers",
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
  ];

  // Calcul des statistiques
  const stats: DashboardStats = useMemo(() => ({
    totalItems: menuItems.length,
    availableItems: menuItems.filter(item => item.available).length,
    lowStock: menuItems.filter(item => item.currentOrders >= item.maxConcurrentOrders).length,
    revenue: menuItems.reduce((sum, item) => sum + item.revenue, 0),
    ordersToday: menuItems.reduce((sum, item) => sum + item.soldToday, 0)
  }), [menuItems]);

  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={"xl"}>
          {/* Statistics */}
          <View className="px-5 py-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <StatCard
                title={t("stats.revenue")}
                value={`€${stats.revenue.toFixed(0)}`}
                subtitle={t("stats.ordersToday")}
                color="#FF6347"
                icon="cash-outline"
              />
              <StatCard
                title={t("stats.availableItems")}
                value={`${stats.availableItems}/${stats.totalItems}`}
                subtitle={t("status.available")}
                color="#FF6347"
                icon="restaurant-outline"
              />
              <StatCard
                title={t("stats.lowStock")}
                value={stats.lowStock.toString()}
                subtitle={t("status.lowStock")}
                color="#EF4444"
                icon="alert-circle-outline"
              />
            </ScrollView>
          </View>

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