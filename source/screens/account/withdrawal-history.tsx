import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";

interface Withdrawal {
  id: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  method: string;
  reference: string;
}

const withdrawals: Withdrawal[] = [
  {
    id: "1",
    amount: 1250.0,
    date: "15 Oct 2025",
    status: "completed",
    method: "Bank Transfer",
    reference: "WD-2025-001",
  },
  {
    id: "2",
    amount: 850.5,
    date: "08 Oct 2025",
    status: "completed",
    method: "Bank Transfer",
    reference: "WD-2025-002",
  },
  {
    id: "3",
    amount: 2100.0,
    date: "01 Oct 2025",
    status: "pending",
    method: "Bank Transfer",
    reference: "WD-2025-003",
  },
  {
    id: "4",
    amount: 450.0,
    date: "25 Sep 2025",
    status: "completed",
    method: "PayPal",
    reference: "WD-2025-004",
  },
  {
    id: "5",
    amount: 750.0,
    date: "18 Sep 2025",
    status: "failed",
    method: "Bank Transfer",
    reference: "WD-2025-005",
  },
];

const getStatusConfig = (status: Withdrawal["status"]) => {
  switch (status) {
    case "completed":
      return {
        bg: "bg-green-50",
        text: "text-green-700",
        icon: "#10B981",
        label: "Completed",
      };
    case "pending":
      return {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        icon: "#F59E0B",
        label: "Pending",
      };
    case "failed":
      return {
        bg: "bg-red-50",
        text: "text-red-700",
        icon: "#EF4444",
        label: "Failed",
      };
  }
};

interface WithdrawalCardProps {
  withdrawal: Withdrawal;
}

const WithdrawalCard: React.FC<WithdrawalCardProps> = ({ withdrawal }) => {
  const statusConfig = getStatusConfig(withdrawal.status);

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
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-900 mb-1">
            €{withdrawal.amount.toFixed(2)}
          </Text>
          <Text className="text-sm text-gray-500">{withdrawal.reference}</Text>
        </View>
        <View
          className={`${statusConfig.bg} px-4 py-2 rounded-full flex-row items-center`}
          style={{
            shadowColor: statusConfig.icon,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View
            className="w-2 h-2 rounded-full mr-2"
            style={{ backgroundColor: statusConfig.icon }}
          />
          <Text className={`text-xs font-bold ${statusConfig.text} uppercase tracking-wide`}>
            {statusConfig.label}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-100 my-3" />

      {/* Footer */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-blue-50 rounded-xl items-center justify-center mr-2">
            <Ionicons name="calendar-outline" size={16} color="#3B82F6" />
          </View>
          <Text className="text-sm font-semibold text-gray-700">{withdrawal.date}</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-purple-50 rounded-xl items-center justify-center mr-2">
            <Ionicons name="card-outline" size={16} color="#8B5CF6" />
          </View>
          <Text className="text-sm font-semibold text-gray-700">{withdrawal.method}</Text>
        </View>
      </View>
    </View>
  );
};

const WithdrawalHistoryScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "completed" | "pending">("all");

  const filteredWithdrawals = withdrawals.filter((w) => {
    if (selectedFilter === "all") return true;
    return w.status === selectedFilter;
  });

  const totalWithdrawn = withdrawals
    .filter((w) => w.status === "completed")
    .reduce((sum, w) => sum + w.amount, 0);

  const pendingAmount = withdrawals
    .filter((w) => w.status === "pending")
    .reduce((sum, w) => sum + w.amount, 0);

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
            <Text className="text-2xl font-bold text-gray-900">Withdrawal History</Text>
            <Text className="text-sm text-gray-500">Historique de vos retraits</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-5 pb-4">
          <View className="flex-row gap-3 mb-4">
            <View
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                <Text className="text-2xl font-bold text-green-600">
                  €{totalWithdrawn.toFixed(0)}
                </Text>
              </View>
              <Text className="text-xs text-gray-600">Total retiré</Text>
            </View>
            <View
              className="flex-1 bg-white rounded-2xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center justify-between mb-2">
                <Ionicons name="time-outline" size={20} color="#F59E0B" />
                <Text className="text-2xl font-bold text-amber-500">
                  €{pendingAmount.toFixed(0)}
                </Text>
              </View>
              <Text className="text-xs text-gray-600">En attente</Text>
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
                selectedFilter === "all" ? "bg-primary-500" : ""
              }`}
              onPress={() => setSelectedFilter("all")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "all" ? "text-white" : "text-gray-600"
                }`}
              >
                Tous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "completed" ? "bg-primary-500" : ""
              }`}
              onPress={() => setSelectedFilter("completed")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "completed" ? "text-white" : "text-gray-600"
                }`}
              >
                Terminés
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`flex-1 py-3 rounded-xl ${
                selectedFilter === "pending" ? "bg-primary-500" : ""
              }`}
              onPress={() => setSelectedFilter("pending")}
            >
              <Text
                className={`text-center font-semibold text-sm ${
                  selectedFilter === "pending" ? "text-white" : "text-gray-600"
                }`}
              >
                En attente
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Withdrawals List */}
        <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false}>
          {filteredWithdrawals.map((withdrawal) => (
            <WithdrawalCard key={withdrawal.id} withdrawal={withdrawal} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default WithdrawalHistoryScreen;
