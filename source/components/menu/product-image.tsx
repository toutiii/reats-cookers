import React from "react";
import { View, Image } from "react-native";
import { Text } from "@/components/ui/text";

interface ProductImageProps {
  uri: string;
  available: boolean;
  isLowStock?: boolean;
}


export const ProductImage: React.FC<ProductImageProps> = React.memo(({ uri, available, isLowStock }) => (
  <View className="relative">
    <Image
      source={{ uri }}
      className="w-32 h-28 rounded-l-xl"
      resizeMode="cover"
    />
    {!available && (
      <View className="absolute inset-0 bg-black/60 items-center justify-center rounded-l-xl">
        <Text className="text-white font-semibold text-xs">Indisponible</Text>
      </View>
    )}
    {isLowStock && available && (
      <View className="absolute top-2 left-2 px-2 py-1 bg-red-500 rounded-full">
        <Text className="text-xs font-semibold text-white">Stock faible</Text>
      </View>
    )}
  </View>
));

ProductImage.displayName = "ProductImage";
