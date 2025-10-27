import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";

interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  orderNumber: string;
  dish: string;
}

const reviews: Review[] = [
  {
    id: "1",
    customerName: "John Doe",
    customerAvatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment: "Excellent service! La nourriture était délicieuse et la livraison rapide.",
    date: "15 Oct 2025",
    orderNumber: "#1234",
    dish: "Pizza Margherita",
  },
  {
    id: "2",
    customerName: "Jane Smith",
    customerAvatar: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    comment: "Très bon plat, mais la livraison aurait pu être plus rapide.",
    date: "14 Oct 2025",
    orderNumber: "#1235",
    dish: "Burger Classic",
  },
  {
    id: "3",
    customerName: "Bob Wilson",
    customerAvatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "Parfait ! Je recommande vivement ce restaurant.",
    date: "13 Oct 2025",
    orderNumber: "#1236",
    dish: "Pasta Carbonara",
  },
  {
    id: "4",
    customerName: "Alice Johnson",
    customerAvatar: "https://i.pravatar.cc/150?img=4",
    rating: 3,
    comment: "Correct mais rien d'exceptionnel. Le prix est un peu élevé.",
    date: "12 Oct 2025",
    orderNumber: "#1237",
    dish: "Salade César",
  },
  {
    id: "5",
    customerName: "Mike Brown",
    customerAvatar: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    comment: "Incroyable ! Meilleur restaurant de la ville sans hésitation.",
    date: "11 Oct 2025",
    orderNumber: "#1238",
    dish: "Steak Frites",
  },
];

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <View
      className="bg-white rounded-2xl p-5 mb-4"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* Header */}
      <View className="flex-row items-center mb-3">
        <Image
          source={{ uri: review.customerAvatar }}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View className="flex-1">
          <Text className="text-base font-bold text-gray-900 mb-0.5">
            {review.customerName}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="receipt-outline" size={12} color="#9CA3AF" />
            <Text className="text-xs text-gray-500 ml-1">{review.orderNumber}</Text>
            <Text className="text-xs text-gray-400 mx-1.5">•</Text>
            <Text className="text-xs text-gray-500">{review.date}</Text>
          </View>
        </View>
        {/* Rating */}
        <View className="bg-amber-50 px-3 py-1.5 rounded-full flex-row items-center">
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text className="text-sm font-bold text-amber-600 ml-1">
            {review.rating}.0
          </Text>
        </View>
      </View>

      {/* Dish */}
      <View className="bg-gray-50 px-3 py-2 rounded-lg mb-3">
        <Text className="text-xs text-gray-500 mb-0.5">Plat commandé</Text>
        <Text className="text-sm font-semibold text-gray-900">{review.dish}</Text>
      </View>

      {/* Comment */}
      <Text className="text-sm text-gray-700 leading-5">{review.comment}</Text>

      {/* Stars */}
      <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= review.rating
? "star"
: "star-outline"}
            size={16}
            color={star <= review.rating
? "#F59E0B"
: "#D1D5DB"}
            style={{ marginRight: 4 }}
          />
        ))}
      </View>
    </View>
  );
};

const UserReviewsScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "5" | "4" | "3">("all");

  const filteredReviews = reviews.filter((r) => {
    if (selectedFilter === "all") return true;
    return r.rating === parseInt(selectedFilter);
  });

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">User Reviews</Text>
            <Text className="text-sm text-gray-500">Avis de vos clients</Text>
          </View>
        </View>

        {/* Stats Card */}
        <View className="px-5 pb-4">
          <View
            className="bg-white rounded-2xl p-5 mb-4"
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
                <Text className="text-sm text-gray-500 mb-1">Note moyenne</Text>
                <View className="flex-row items-center">
                  <Text className="text-4xl font-bold text-gray-900 mr-2">
                    {averageRating}
                  </Text>
                  <Ionicons name="star" size={32} color="#F59E0B" />
                </View>
                <Text className="text-xs text-gray-500 mt-1">
                  Basé sur {reviews.length} avis
                </Text>
              </View>
              <View className="items-end">
                <View className="flex-row items-center mb-1">
                  <Text className="text-xs text-gray-600 mr-2">5★</Text>
                  <View className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-amber-400"
                      style={{ width: `${(ratingCounts[5] / reviews.length) * 100}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-600 ml-2 w-6">
                    {ratingCounts[5]}
                  </Text>
                </View>
                <View className="flex-row items-center mb-1">
                  <Text className="text-xs text-gray-600 mr-2">4★</Text>
                  <View className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-amber-400"
                      style={{ width: `${(ratingCounts[4] / reviews.length) * 100}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-600 ml-2 w-6">
                    {ratingCounts[4]}
                  </Text>
                </View>
                <View className="flex-row items-center">
                  <Text className="text-xs text-gray-600 mr-2">3★</Text>
                  <View className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-amber-400"
                      style={{ width: `${(ratingCounts[3] / reviews.length) * 100}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-600 ml-2 w-6">
                    {ratingCounts[3]}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
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
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "all"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedFilter("all")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "all"
? "text-white"
: "text-gray-600"
                }`}
              >
                Tous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "5"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedFilter("5")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "5"
? "text-white"
: "text-gray-600"
                }`}
              >
                5★
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "4"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedFilter("4")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "4"
? "text-white"
: "text-gray-600"
                }`}
              >
                4★
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "3"
? "bg-primary-500"
: ""
              }`}
              onPress={() => setSelectedFilter("3")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "3"
? "text-white"
: "text-gray-600"
                }`}
              >
                3★
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Reviews List */}
        <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false}>
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default UserReviewsScreen;
