import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import {
  DashboardHeader,
  StatCard,
  WelcomeSection,
  RevenueChart,
  ReviewsSection,
  PopularItems,
  QuickActions,
} from "./components";
import { SafeAreaView } from "react-native-safe-area-context";

const DashboardScreen: React.FC = () => {
  const [selectedPeriod] = useState("Today");

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
      <DashboardHeader />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-6">
          <WelcomeSection />
          <View className="flex-row gap-3 mb-4">
            <StatCard
              iconName="shopping-bag"
              value="20"
              label="Active Orders"
              trend="+12%"
              bgColor="bg-orange-50"
              iconColor="#f97316"
            />
            <StatCard
              iconName="clock"
              value="5"
              label="Pending"
              bgColor="bg-blue-50"
              iconColor="#3b82f6"
            />
          </View>

          {/* Stats Grid - Row 2 */}
          <View className="flex-row gap-3 mb-6">
            <StatCard
              iconName="dollar-sign"
              value="€2,241"
              label="Today's Revenue"
              trend="+8%"
              bgColor="bg-green-50"
              iconColor="#10b981"
            />
            <StatCard
              iconName="users"
              value="142"
              label="Customers Served"
              bgColor="bg-purple-50"
              iconColor="#8b5cf6"
            />
          </View>
          <RevenueChart selectedPeriod={selectedPeriod} />
          <ReviewsSection />
          <PopularItems />
          <QuickActions />
        </View>
      </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default DashboardScreen;
