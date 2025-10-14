import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

interface PopularItem {
  name: string;
  price: string;
  rating: string;
  emoji: string;
  colors: [string, string];
}

interface PopularItemCardProps {
  item: PopularItem;
}

const PopularItemCard: React.FC<PopularItemCardProps> = ({ item }) => (
  <View className="flex-1">
    {/* Item Image */}
    <View
      className="rounded-2xl h-48 mb-3 items-center justify-center"
      style={{ backgroundColor: item.colors[0] }}
    >
      <View
        className="bg-white rounded-full w-16 h-16 items-center justify-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <Text className="text-4xl">{item.emoji}</Text>
      </View>
    </View>

    {/* Item Info */}
    <Text className="text-gray-900 font-semibold text-sm mb-2">{item.name}</Text>
    <View className="flex-row items-center justify-between">
      <Text className="text-orange-500 font-bold text-base">{item.price}</Text>
      <View className="flex-row items-center">
        <Feather name="star" size={12} color="#f59e0b" />
        <Text className="text-xs ml-1">{item.rating}</Text>
      </View>
    </View>
  </View>
);

export const PopularItems: React.FC = () => {
  const popularItems: PopularItem[] = [
    {
      name: "Pizza Margherita",
      price: "€12.90",
      rating: "4.8",
      emoji: "🍕",
      colors: ["#fed7aa", "#ffedd5"],
    },
    {
      name: "Burger Classic",
      price: "€15.90",
      rating: "4.9",
      emoji: "🍔",
      colors: ["#bbf7d0", "#dcfce7"],
    },
  ];

  return (
    <View
      className="bg-white rounded-3xl p-6 mb-6"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-5">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="fire" size={24} color="#f97316" />
          <Heading className="font-bold text-lg ml-2">Popular Dishes</Heading>
        </View>
        <TouchableOpacity>
          <Text className="text-orange-500 font-semibold text-sm">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Items Grid */}
      <View className="flex-row gap-3">
        {popularItems.map((item, index) => (
          <PopularItemCard key={index} item={item} />
        ))}
      </View>
    </View>
  );
};
