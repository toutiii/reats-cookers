import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/common/header";
import { useTranslation } from "@/hooks/useTranslation";
import {
  StatCard,
  WelcomeSection,
  RevenueChart,
  ReviewsSection,
  PopularItems,
  QuickActions,
} from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import type { RootState } from "@/store";
import type { DashboardPeriod } from "@/store/api/types";
import {
  useGetDashboardStatsQuery,
  useGetPopularItemsQuery,
  useGetRecentReviewsQuery,
} from "@/store/api/dashboardApi";

const PERIOD_MAP: Record<string, DashboardPeriod> = {
  Today: "today",
  Week: "week",
  Month: "month",
  Year: "year",
};

const DashboardScreen: React.FC = () => {
  const { t } = useTranslation("dashboard");
  const [selectedPeriod] = useState("Today");
  const cooker = useSelector((state: RootState) => state.auth.cooker);

  const apiPeriod = PERIOD_MAP[selectedPeriod] ?? "today";
  const { data: statsData } = useGetDashboardStatsQuery({ period: apiPeriod });
  const { data: popularData } = useGetPopularItemsQuery();
  const { data: reviewsData } = useGetRecentReviewsQuery();
  const stats = statsData?.data?.stats ?? [];
  const revenueChart = statsData?.data?.revenue_chart;
  const popularItems = popularData?.data?.results ?? [];
  const reviews = reviewsData?.data?.results?.map((r) => ({ stars: r.stars, percent: r.percent })) ?? [];
  const averageRating = reviewsData?.data?.average_rating ?? 0;
  const totalReviews = reviewsData?.data?.total_reviews ?? 0;

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        <Header
          title={t("header.title")}
          subtitle={t("header.subtitle")}
          notificationCount={3}
          onNotificationPress={() => console.log("Notifications pressed")}
        />
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-5 pt-6">
            <WelcomeSection name={cooker?.firstname} />

            {/* Stats Grid - Row 1 */}
            <View className="flex-row gap-3 mb-4">
              {stats.length >= 2 ? (
                <>
                  <StatCard
                    iconName={stats[0].icon}
                    value={stats[0].value}
                    label={stats[0].label}
                    trend={stats[0].trend}
                    bgColor={stats[0].bg_color}
                    iconColor={stats[0].icon_color}
                  />
                  <StatCard
                    iconName={stats[1].icon}
                    value={stats[1].value}
                    label={stats[1].label}
                    trend={stats[1].trend}
                    bgColor={stats[1].bg_color}
                    iconColor={stats[1].icon_color}
                  />
                </>
              ) : (
                <>
                  <StatCard
                    iconName="shopping-bag"
                    value="--"
                    label={t("stats.activeOrders")}
                    bgColor="bg-orange-50"
                    iconColor="#f97316"
                  />
                  <StatCard
                    iconName="clock"
                    value="--"
                    label={t("stats.pending")}
                    bgColor="bg-blue-50"
                    iconColor="#3b82f6"
                  />
                </>
              )}
            </View>

            {/* Stats Grid - Row 2 */}
            <View className="flex-row gap-3 mb-6">
              {stats.length >= 4 ? (
                <>
                  <StatCard
                    iconName={stats[2].icon}
                    value={stats[2].value}
                    label={stats[2].label}
                    trend={stats[2].trend}
                    bgColor={stats[2].bg_color}
                    iconColor={stats[2].icon_color}
                  />
                  <StatCard
                    iconName={stats[3].icon}
                    value={stats[3].value}
                    label={stats[3].label}
                    trend={stats[3].trend}
                    bgColor={stats[3].bg_color}
                    iconColor={stats[3].icon_color}
                  />
                </>
              ) : (
                <>
                  <StatCard
                    iconName="dollar-sign"
                    value="--"
                    label={t("stats.todayRevenue")}
                    bgColor="bg-green-50"
                    iconColor="#10b981"
                  />
                  <StatCard
                    iconName="users"
                    value="--"
                    label={t("stats.customersServed")}
                    bgColor="bg-purple-50"
                    iconColor="#8b5cf6"
                  />
                </>
              )}
            </View>

            <RevenueChart
              selectedPeriod={selectedPeriod}
              labels={revenueChart?.labels}
              data={revenueChart?.data}
              totalRevenue={revenueChart?.total_revenue}
              trend={revenueChart?.trend}
            />
            <ReviewsSection
              reviews={reviews}
              averageRating={averageRating}
              totalReviews={totalReviews}
            />
            <PopularItems items={popularItems} />
            <QuickActions />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default DashboardScreen;
