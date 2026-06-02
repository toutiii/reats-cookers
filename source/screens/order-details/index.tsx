import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemedView } from "@/components/themed-view";
import { Header } from "@/components/common/header";
import { Text } from "@/components/ui/text";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import { OrderDetailsSkeleton } from "@/components/skeletons";
import type { ScreenRouteProp } from "@/types/navigation";
import {
  ActionButtons,
  CustomerInfo,
  OrderItemsList,
  PaymentSummary,
  StatusCard,
} from "@/components/order-details";
import {
  useAcceptOrderMutation,
  useCancelOrderMutation,
  useGetOrderQuery,
  useMarkOrderReadyMutation,
  useStartOrderPreparationMutation,
} from "@/store/api/ordersApi";
import { mergeOrderLineItems, type OrderActionDescriptor } from "@/utils/orders";

const OrderDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ScreenRouteProp<"OrderDetailsScreen">>();
  const { orderId } = route.params;

  const { data: order, isLoading, isError, refetch } = useGetOrderQuery(orderId);

  const [acceptOrder, acceptState] = useAcceptOrderMutation();
  const [startPreparation, startState] = useStartOrderPreparationMutation();
  const [markReady, markReadyState] = useMarkOrderReadyMutation();
  const [cancelOrder, cancelState] = useCancelOrderMutation();

  const [pendingAction, setPendingAction] = useState<OrderActionDescriptor | null>(null);

  const isBusy =
    acceptState.isLoading ||
    startState.isLoading ||
    markReadyState.isLoading ||
    cancelState.isLoading;

  const lastTransitionAt = useMemo(() => {
    if (!order) return null;
    const timeline = [
      order.cancelled_date,
      order.completed_date,
      order.delivering_date,
      order.ready_date,
      order.preparing_date,
      order.accepted_date,
    ];
    return timeline.find((value) => value !== null) ?? null;
  }, [order]);

  const lineItems = useMemo(() => (order
? mergeOrderLineItems(order)
: []), [order]);

  const closeDialog = useCallback(() => {
    if (isBusy) return;
    setPendingAction(null);
  }, [isBusy]);

  const handleConfirm = useCallback(async () => {
    if (!pendingAction || !order) return;

    try {
      switch (pendingAction.action) {
        case "accept":
          await acceptOrder(order.id).unwrap();
          break;
        case "start-preparation":
          await startPreparation(order.id).unwrap();
          break;
        case "mark-ready":
          await markReady(order.id).unwrap();
          break;
        case "cancel":
          await cancelOrder(order.id).unwrap();
          break;
      }
      setPendingAction(null);
    } catch {
      setPendingAction(null);
    }
  }, [acceptOrder, cancelOrder, markReady, order, pendingAction, startPreparation]);

  if (isLoading) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1">
          <Header
            title="Order details"
            subtitle="Loading..."
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <OrderDetailsSkeleton />
        </SafeAreaView>
      </ThemedView>
    );
  }

  if (isError || !order) {
    return (
      <ThemedView>
        <SafeAreaView className="flex-1">
          <Header
            title="Order details"
            subtitle="Not found"
            showBackButton
            onBackPress={() => navigation.goBack()}
          />
          <View className="flex-1 items-center justify-center px-5">
            <Text className="text-xl font-bold text-gray-900 mb-2">Order not found</Text>
            <Text className="text-gray-500 text-center mb-6">
              The order you are looking for does not exist or could not be loaded.
            </Text>
            <Button onPress={() => refetch()} size="sm">
              <ButtonText>Retry</ButtonText>
            </Button>
          </View>
        </SafeAreaView>
      </ThemedView>
    );
  }

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <Header
          title="Order details"
          subtitle={`#${order.id}`}
          showBackButton
          onBackPress={() => navigation.goBack()}
        />

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <StatusCard
            status={order.status}
            createdAt={order.created}
            lastTransitionAt={lastTransitionAt}
          />

          <CustomerInfo customer={order.customer} address={order.address} />

          <OrderItemsList items={lineItems} />

          <PaymentSummary
            subTotal={order.sub_total}
            serviceFees={order.service_fees}
            deliveryFees={order.delivery_fees}
            totalAmount={order.total_amount}
          />

          <ActionButtons
            status={order.status}
            onAction={(action) => setPendingAction(action)}
            isBusy={isBusy}
          />
        </ScrollView>

        <AlertDialog isOpen={pendingAction !== null} onClose={closeDialog} size="md">
          <AlertDialogBackdrop />
          <AlertDialogContent>
            <AlertDialogHeader>
              <Heading className="text-typography-950 font-semibold" size="md">
                {pendingAction?.confirmTitle ?? ""}
              </Heading>
            </AlertDialogHeader>
            <AlertDialogBody className="mt-3 mb-4">
              <Text size="sm" className="text-typography-700 leading-5">
                {pendingAction?.confirmMessage ?? ""}
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                variant="outline"
                action="secondary"
                onPress={closeDialog}
                size="sm"
                isDisabled={isBusy}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                size="sm"
                action={pendingAction?.action === "cancel"
? "negative"
: "positive"}
                onPress={handleConfirm}
                isDisabled={isBusy}
              >
                {isBusy && <ButtonSpinner color="#ffffff" />}
                <ButtonText>{pendingAction?.confirmCta ?? "Confirm"}</ButtonText>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrderDetailsScreen;
