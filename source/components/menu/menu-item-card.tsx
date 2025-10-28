import React, { useCallback } from "react";
import { View, TouchableOpacity, Switch } from "react-native";
import Animated, { SlideInRight, Layout } from "react-native-reanimated";
import { Text } from "@/components/ui/text";
import { ProductImage } from "./product-image";
import { MetricItem } from "./metric-item";
import { MenuItemActions } from "./menu-item-actions";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  image: string;
  sku: string;
  maxConcurrentOrders: number;
  currentOrders: number;
  available: boolean;
  description: string;
  allergens: string[];
  preparationTime: number;
  lastModified: string;
  soldToday: number;
  revenue: number;
}

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onToggleAvailability: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = React.memo(
  ({ item, index, onToggleAvailability, onEdit, onDelete }) => {
    const profit = ((item.price - item.cost) / item.price * 100).toFixed(0);
    const isAtCapacity = item.currentOrders >= item.maxConcurrentOrders;
    const capacityPercentage = Math.round((item.currentOrders / item.maxConcurrentOrders) * 100);

    const handleAnalytics = useCallback((_id: string) => {
      console.log("Analytics", _id);
    }, []);

    const handleEditPress = useCallback(() => {
      onEdit(item);
    }, [item, onEdit]);

    const handleDeletePress = useCallback((_id: string) => {
      onDelete(_id);
    }, [onDelete]);

    return (
      <Animated.View
        entering={SlideInRight.delay(index * 50).springify()}
        layout={Layout.springify()}
      >
        <TouchableOpacity
          className="bg-white rounded-xl mb-3 overflow-hidden"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={handleEditPress}
        >
          <View className="flex-row">
            <ProductImage uri={item.image} available={item.available} isLowStock={isAtCapacity} />

            <View className="flex-1 p-4">
              {/* Header */}
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
                  <Text className="text-xs text-gray-500 mt-0.5">
                    SKU: {item.sku} • {item.description}
                  </Text>
                </View>

                <Switch
                  value={item.available}
                  onValueChange={() => onToggleAvailability(item.id)}
                  trackColor={{ false: "#E5E7EB", true: "#FF6347" }}
                  thumbColor="#FFFFFF"
                  style={{ transform: [{ scale: 0.8 }] }}
                />
              </View>

              {/* Metrics */}
              <View className="flex-row justify-between mb-2">
                <MetricItem
                  label="Prix / Coût"
                  value={`€${item.price.toFixed(2)} / €${item.cost.toFixed(2)}`}
                />
                <MetricItem
                  label="Marge"
                  value={`${profit}%`}
                  valueColor="#10B981"
                />
                <MetricItem
                  label="En cours"
                  value={`${item.currentOrders}/${item.maxConcurrentOrders}`}
                  highlight={isAtCapacity}
                  valueColor={isAtCapacity
? "#EF4444"
: capacityPercentage > 70
? "#F59E0B"
: "#6B7280"}
                />
                <MetricItem
                  label="Vendus"
                  value={item.soldToday.toString()}
                  valueColor="#FF6347"
                />
              </View>

              {/* Footer */}
              <View className="flex-row justify-between items-center pt-2 border-t border-gray-100">
                <Text className="text-xs text-gray-400">
                  Modifié {new Date(item.lastModified).toLocaleDateString("fr-FR")}
                </Text>
                <MenuItemActions
                  itemId={item.id}
                  onAnalytics={handleAnalytics}
                  onEdit={handleEditPress}
                  onDelete={handleDeletePress}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

MenuItemCard.displayName = "MenuItemCard";
