import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Header } from "@/components/common/header";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  category: string;
  emoji: string;
  available: boolean;
  description: string;
  rating: number;
  reviewCount: number;
}

const MenuScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Burgers", "Pizza", "Salads", "Desserts"];

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Classic Burger",
      price: "€12.90",
      category: "Burgers",
      emoji: "🍔",
      available: true,
      description: "Beef patty, lettuce, tomato, cheese",
      rating: 4.8,
      reviewCount: 156,
    },
    {
      id: "2",
      name: "Margherita Pizza",
      price: "€14.50",
      category: "Pizza",
      emoji: "🍕",
      available: true,
      description: "Tomato sauce, mozzarella, basil",
      rating: 4.9,
      reviewCount: 203,
    },
    {
      id: "3",
      name: "Caesar Salad",
      price: "€9.90",
      category: "Salads",
      emoji: "🥗",
      available: true,
      description: "Romaine lettuce, croutons, parmesan",
      rating: 4.6,
      reviewCount: 89,
    },
    {
      id: "4",
      name: "Chocolate Cake",
      price: "€6.50",
      category: "Desserts",
      emoji: "🍰",
      available: false,
      description: "Rich chocolate layer cake",
      rating: 4.7,
      reviewCount: 124,
    },
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Header
          title="Menu"
          subtitle="Manage your menu items"
          notificationCount={2}
          rightAction={{
            icon: "plus",
            onPress: () => console.log("Add item pressed"),
          }}
          onNotificationPress={() => console.log("Notifications pressed")}
        />

        <View className="px-5 pt-4 pb-4 bg-white border-b border-gray-100">

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="gap-2">
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-5 py-2.5 rounded-xl mr-2 ${
                selectedCategory === category ? "bg-orange-500" : "bg-gray-100"
              }`}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                className={`font-semibold ${
                  selectedCategory === category ? "text-white" : "text-gray-600"
                }`}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>

        {/* Menu Items */}
      <ScrollView className="flex-1 px-5 pt-4" showsVerticalScrollIndicator={false}>
        {filteredItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white rounded-2xl p-5 mb-4 flex-row"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            {/* Item Image */}
            <View
              className="w-20 h-20 rounded-xl items-center justify-center mr-4"
              style={{ backgroundColor: "#fed7aa" }}
            >
              <Text className="text-4xl">{item.emoji}</Text>
            </View>

            {/* Item Details */}
            <View className="flex-1">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-900">{item.name}</Text>
                  <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>

                  {/* Rating */}
                  <View className="flex-row items-center mt-2">
                    <Feather name="star" size={14} color="#f59e0b" fill="#f59e0b" />
                    <Text className="text-sm font-semibold text-gray-900 ml-1">
                      {item.rating}
                    </Text>
                    <Text className="text-xs text-gray-500 ml-1">
                      ({item.reviewCount} reviews)
                    </Text>
                  </View>
                </View>
                <View
                  className={`ml-2 w-3 h-3 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                />
              </View>

              <View className="flex-row justify-between items-center mt-3">
                <Text className="text-lg font-bold text-orange-500">{item.price}</Text>
                <TouchableOpacity className="bg-orange-50 px-4 py-2 rounded-lg">
                  <Text className="text-orange-500 font-semibold text-sm">Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default MenuScreen;
