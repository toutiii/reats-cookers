import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

interface RatingBarProps {
  stars: number;
  percent: number;
}

/**
 * Rating Bar Component
 * Displays a single rating bar with stars and percentage
 */
const RatingBar: React.FC<RatingBarProps> = ({ stars, percent }) => (
  <View className="flex-row items-center gap-3">
    <View className="flex-row items-center gap-1 w-12">
      <Feather name="star" size={14} color="#ffffff" />
      <Text className="text-white text-sm font-semibold">{stars}</Text>
    </View>
    <View
      className="flex-1 rounded-full h-2 overflow-hidden"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
    >
      <View className="bg-white h-full rounded-full" style={{ width: `${percent}%` }} />
    </View>
    <Text className="text-white text-xs font-medium w-10 text-right">{percent}%</Text>
  </View>
);

/**
 * Reviews Section Component
 * Displays customer reviews with rating breakdown
 */
export const ReviewsSection: React.FC = () => {
  const ratingData = [
    { stars: 5, percent: 85 },
    { stars: 4, percent: 12 },
    { stars: 3, percent: 3 },
  ];

  return (
    <View
      className="rounded-3xl p-6 mb-4"
      style={{
        backgroundColor: "#f97316",
        shadowColor: "#f97316",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white font-bold text-lg">Customer Reviews</Text>
        <TouchableOpacity>
          <Text className="text-orange-100 font-semibold text-sm">View all</Text>
        </TouchableOpacity>
      </View>

      {/* Rating Summary */}
      <View className="flex-row items-center mb-6">
        <View
          className="rounded-2xl p-4 mr-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        >
          <Feather name="star" size={36} color="#ffffff" />
        </View>
        <View>
          <View className="flex-row items-baseline">
            <Text className="text-white font-bold text-5xl">4.9</Text>
            <Text className="text-orange-100 text-lg ml-2">/5</Text>
          </View>
          <Text className="text-orange-100 text-sm mt-1">Based on 247 reviews</Text>
        </View>
      </View>

      {/* Rating Breakdown */}
      <View className="gap-3">
        {ratingData.map((rating) => (
          <RatingBar key={rating.stars} stars={rating.stars} percent={rating.percent} />
        ))}
      </View>
    </View>
  );
};
