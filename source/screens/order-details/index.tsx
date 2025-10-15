import React, { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/common/header";
import { Text } from "@/components/ui/text";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { OrderDetailsSkeleton } from "@/components/skeletons";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { ScreenRouteProp } from "@/types/navigation";
import {
  StatusCard,
  CustomerInfo,
  OrderItemsList,
  PaymentSummary,
  ActionButtons,
} from "@/components/order-details";
import {
  STATUS_CONFIG,
  STATUS_CHANGE_MESSAGES,
  getOrderById,
  type OrderDetails as OrderDetailsType,
} from "../../mocks/orders/order-details";

const OrderDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp<"OrderDetailsScreen">>();
  const { orderId } = route.params;

  // Load order from mock data based on orderId
  const [order, setOrder] = useState<OrderDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<OrderDetailsType["status"] | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);

  // Load order data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setIsLoading(false);
    }, 500);
  }, [orderId]);

  // Simulate real-time updates
  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      // Simulate status updates (for demo purposes)
      console.log("Order status:", order.status);
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [order]);

  // Loading state with centralized skeleton
  if (isLoading) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1">
          <Header
            title="Order Details"
            subtitle="Loading..."
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            notificationCount={5}
            onNotificationPress={() => console.log("Notifications")}
          />
          <OrderDetailsSkeleton />
        </SafeAreaView>
      </ThemedView>
    );
  }

  // Order not found
  if (!order) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1">
          <Header
            title="Order Details"
            subtitle="Not Found"
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            notificationCount={5}
            onNotificationPress={() => console.log("Notifications")}
          />
          <View className="flex-1 items-center justify-center px-5">
            <Text className="text-xl font-bold text-gray-900 mb-2">Order Not Found</Text>
            <Text className="text-gray-500 text-center">
              The order you're looking for doesn't exist or has been removed.
            </Text>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  const statusConfig = STATUS_CONFIG[order.status];

  // Handle status change with confirmation
  const handleStatusChange = (newStatus: OrderDetailsType["status"]) => {
    setPendingStatus(newStatus);
    setShowStatusDialog(true);
  };

  // Confirm status change
  const confirmStatusChange = () => {
    if (!pendingStatus || isConfirming) return;

    setIsConfirming(true);

    // Simulate API call
    setTimeout(() => {
      setOrder({
        ...order!,
        status: pendingStatus,
        updatedAt: new Date(),
      });
      setIsConfirming(false);
      setShowStatusDialog(false);
      setPendingStatus(null);
    }, 1500);
  };

  // Cancel status change
  const cancelStatusChange = () => {
    setShowStatusDialog(false);
    setPendingStatus(null);
  };

  // Get status change message
  const getStatusChangeMessage = () => {
    if (!order || !pendingStatus) return "";
    const messageKey = `${order.status}_to_${pendingStatus}` as keyof typeof STATUS_CHANGE_MESSAGES;
    return STATUS_CHANGE_MESSAGES[messageKey] || `Are you sure you want to change the order status to "${pendingStatus}"? The customer will be notified of this change.`;
  };

  // Get dialog title based on action
  const getDialogTitle = () => {
    if (!pendingStatus) return "Confirm Action";
    if (pendingStatus === "cancelled") return "Cancel Order";
    if (pendingStatus === "completed") return "Complete Order";
    if (pendingStatus === "ready") return "Mark as Ready";
    if (pendingStatus === "preparing") return "Start Preparation";
    return "Confirm Status Change";
  };


  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title="Order Details"
          subtitle={order.orderNumber}
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          notificationCount={5}
          onNotificationPress={() => console.log("Notifications")}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Status Card */}
          <StatusCard
            statusConfig={statusConfig}
            orderTime={order.orderTime}
            estimatedTime={order.estimatedTime}
            currentStatus={order.status}
          />

          {/* Customer Info */}
          <CustomerInfo
            customerName={order.customerName}
            customerPhone={order.customerPhone}
            customerAddress={order.customerAddress}
            notes={order.notes}
          />

          {/* Order Items */}
          <OrderItemsList items={order.items} />

          {/* Payment Summary */}
          <PaymentSummary
            subtotal={order.subtotal}
            tax={order.tax}
            deliveryFee={order.deliveryFee}
            total={order.total}
            paymentMethod={order.paymentMethod}
          />

          {/* Action Buttons */}
          <ActionButtons
            status={order.status}
            onStatusChange={handleStatusChange}
          />
        </ScrollView>

        {/* Status Change Confirmation Dialog */}
        <AlertDialog isOpen={showStatusDialog} onClose={cancelStatusChange} size="md">
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold" size="md">
                {getDialogTitle()}
              </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
              <Text size="sm" className="text-typography-700 leading-5">
                {getStatusChangeMessage()}
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                variant="outline"
                action="secondary"
                onPress={cancelStatusChange}
                size="sm"
                isDisabled={isConfirming}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action={
                  pendingStatus === "cancelled"
                    ? "negative"
                    : "positive"
                }
                onPress={confirmStatusChange}
                isDisabled={isConfirming}
              >
                {isConfirming && <ButtonSpinner color="#ffffff" />}
                <ButtonText>
                  {isConfirming
                    ? "Processing..."
                    : pendingStatus === "cancelled"
                    ? "Cancel Order"
                    : "Confirm"}
                </ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrderDetailsScreen;
