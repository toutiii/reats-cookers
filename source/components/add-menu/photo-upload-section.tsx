import React from "react";
import { View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeIn } from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { Text } from "@/components/ui/text";

interface PhotoUploadSectionProps {
  photos: string[];
  error?: string;
  onPhotosChange: (photos: string[]) => void;
}

export const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({
  photos,
  error,
  onPhotosChange,
}) => {
  const pickImage = async (index: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Nous avons besoin de votre permission pour accéder à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos = [...photos];
      newPhotos[index] = result.assets[0].uri;
      onPhotosChange(newPhotos);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosChange(newPhotos);
  };

  return (
    <Animated.View entering={FadeIn.duration(600)} className="mb-8">
      <View className="flex-row items-center mb-3">
        <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
        <Text className="text-base font-bold">Photos du plat</Text>
        <Text className="text-primary-500 ml-1">*</Text>
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[0, 1, 2].map((index) => (
          <TouchableOpacity
            key={index}
            onPress={() => pickImage(index)}
            className="mr-3"
          >
            {photos[index] ? (
              <View className="relative">
                <Image
                  source={{ uri: photos[index] }}
                  className="w-32 h-32 rounded-2xl"
                  resizeMode="cover"
                />
                <TouchableOpacity
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full"
                  onPress={() => removePhoto(index)}
                >
                  <Ionicons name="close" size={16} color="#374151" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className={`w-32 h-32 rounded-2xl border-2 border-dashed ${
                index === 0 ? "border-primary-500 bg-orange-50" : "border-gray-300 bg-gray-50"
              } items-center justify-center`}>
                <Ionicons
                  name="camera-outline"
                  size={32}
                  color={index === 0 ? "#FF6347" : "#9CA3AF"}
                />
                <Text className={`text-xs mt-2 ${
                  index === 0 ? "text-primary-500 font-semibold" : "text-gray-400"
                }`}>
                  {index === 0 ? "Photo principale" : "Ajouter"}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {error && (
        <Text className="text-red-500 text-xs mt-2">{error}</Text>
      )}
    </Animated.View>
  );
};
