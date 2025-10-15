import React from "react";
import { ScrollView, View } from "react-native";
import { Skeleton } from "@/components/ui/skeleton";


export const OrderDetailsSkeleton: React.FC = () => {
  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Status Card Skeleton */}
      <View className="px-5 pt-4">
        <View className="bg-yellow-50 border-yellow-200 border rounded-2xl p-5 mb-4">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-yellow-50 rounded-full items-center justify-center mr-3">
                <Skeleton className="w-6 h-6 rounded-full" />
              </View>
              <View>
                <Skeleton className="h-5 w-20 mb-1" />
                <Skeleton className="h-4 w-36 mt-1" />
              </View>
            </View>
            <View className="items-end">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-16 mt-1" />
            </View>
          </View>
          {/* Timeline Skeleton */}
          <View className="flex-row justify-between mt-4 pt-4 border-t border-gray-200">
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className="flex-1 items-center">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-3 w-14 mt-2" />
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Customer Info Skeleton */}
      <View className="px-5 mb-4">
        <View
          className="bg-white rounded-2xl p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center mb-4">
            <View className="w-12 h-12 bg-orange-50 rounded-full items-center justify-center mr-3">
              <Skeleton className="w-5 h-5 rounded-full" />
            </View>
            <View className="flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16 mt-1" />
            </View>
          </View>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                <Skeleton className="w-4 h-4" />
              </View>
              <Skeleton className="h-3 w-36" />
            </View>
            <View className="flex-row items-start mt-3">
              <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                <Skeleton className="w-4 h-4" />
              </View>
              <Skeleton className="h-10 flex-1" />
            </View>
            <View className="flex-row items-start mt-3">
              <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                <Skeleton className="w-4 h-4" />
              </View>
              <Skeleton className="h-6 flex-1" />
            </View>
          </View>
        </View>
      </View>

      {/* Order Items Skeleton */}
      <View className="px-5 mb-4">
        <Skeleton className="h-5 w-28 mb-3" />
        <View
          className="bg-white rounded-2xl p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          {[1, 2, 3].map((i) => (
            <View key={i}>
              <View className="flex-row items-center py-3">
                <View className="w-14 h-14 bg-orange-50 rounded-xl items-center justify-center mr-3">
                  <Skeleton className="w-8 h-8" />
                </View>
                <View className="flex-1">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20 mt-1" />
                </View>
                <Skeleton className="h-4 w-14" />
              </View>
              {i < 3 && <View className="h-px bg-gray-100" />}
            </View>
          ))}
        </View>
      </View>

      {/* Payment Summary Skeleton */}
      <View className="px-5 mb-4">
        <Skeleton className="h-5 w-36 mb-3" />
        <View
          className="bg-white rounded-2xl p-5"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 10,
            elevation: 2,
          }}
        >
          <View className="space-y-3">
            <View className="flex-row justify-between items-center">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-14" />
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-14" />
            </View>
            <View className="flex-row justify-between items-center mt-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-12" />
            </View>
            <View className="h-px bg-gray-200 my-2" />
            <View className="flex-row justify-between items-center">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-20" />
            </View>
            <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
              <View className="w-8 h-8 bg-gray-50 rounded-lg items-center justify-center mr-3">
                <Skeleton className="w-4 h-4" />
              </View>
              <Skeleton className="h-3 w-32" />
            </View>
          </View>
        </View>
      </View>

      {/* Action Buttons Skeleton */}
      <View className="px-5 pb-6">
        <View className="flex-row gap-3">
          <Skeleton className="flex-1 h-16 rounded-xl" />
          <View className="bg-red-50 rounded-xl py-4 px-6 items-center justify-center">
            <Skeleton className="w-5 h-5" />
          </View>
        </View>
        <View className="flex-row gap-3 mt-3">
          <Skeleton className="flex-1 h-16 rounded-xl" />
          <Skeleton className="flex-1 h-16 rounded-xl" />
        </View>
      </View>
    </ScrollView>
  );
};
