import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import Animated, { FadeIn, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  PhotoUploadSection,
  PricingSection,
  AddMenuHeader,
  SaveButton,
} from "@/components/add-menu";

interface DrinkFormData {
  name: string;
  sku: string;
  price: string;
  cost: string;
  volume: string;
  temperature: "hot" | "cold";
  servingType: "glass" | "bottle" | "can";
  allergens: string[];
  description: string;
  photos: string[];
  featured: boolean;
  available: boolean;
}

const ALLERGENS = [
  { id: "gluten", name: "Gluten (céréales)", icon: "grain" },
  { id: "crustaceans", name: "Crustacés", icon: "set-meal" },
  { id: "eggs", name: "Œufs", icon: "egg" },
  { id: "fish", name: "Poissons", icon: "sailing" },
  { id: "peanuts", name: "Arachides", icon: "eco" },
  { id: "soy", name: "Soja", icon: "grass" },
  { id: "milk", name: "Lait", icon: "water-drop" },
  { id: "nuts", name: "Fruits à coque", icon: "nutrition" },
  { id: "celery", name: "Céleri", icon: "local-florist" },
  { id: "mustard", name: "Moutarde", icon: "circle" },
  { id: "sesame", name: "Graines de sésame", icon: "blur-circular" },
  { id: "sulfites", name: "Sulfites", icon: "science" },
  { id: "lupin", name: "Lupin", icon: "local-florist" },
  { id: "molluscs", name: "Mollusques", icon: "waves" },
];

const TEMPERATURE_OPTIONS = [
  { id: "hot" as const, label: "Chaud", icon: "flame-outline" as const },
  { id: "cold" as const, label: "Froid", icon: "snow-outline" as const },
];

const SERVING_OPTIONS = [
  { id: "glass" as const, label: "Verre", icon: "wine-outline" as const },
  { id: "bottle" as const, label: "Bouteille", icon: "water-outline" as const },
  { id: "can" as const, label: "Canette", icon: "cube-outline" as const },
];

const AddDrinksScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [formData, setFormData] = useState<DrinkFormData>({
    name: "",
    sku: "",
    price: "",
    cost: "",
    volume: "",
    temperature: "cold",
    servingType: "glass",
    allergens: [],
    description: "",
    photos: [],
    featured: false,
    available: true,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DrinkFormData, string>>>({});
  const scrollY = useSharedValue(0);

  const updateField = useCallback((field: keyof DrinkFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleAllergen = useCallback((allergenId: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergenId)
        ? prev.allergens.filter((a) => a !== allergenId)
        : [...prev.allergens, allergenId],
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Partial<Record<keyof DrinkFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.sku.trim()) newErrors.sku = "Le SKU est requis";
    if (!formData.price.trim()) newErrors.price = "Le prix est requis";
    if (!formData.cost.trim()) newErrors.cost = "Le coût est requis";
    if (!formData.volume.trim()) newErrors.volume = "Le volume est requis";
    if (formData.photos.length === 0) newErrors.photos = "Au moins une photo est requise";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (validateForm()) {
      Alert.alert(
        "Confirmer l'ajout",
        "Voulez-vous ajouter cette boisson au menu ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Ajouter",
            onPress: () => {
              console.log("Save drink:", formData);
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Formulaire incomplet",
        "Veuillez remplir tous les champs obligatoires.",
        [{ text: "OK" }]
      );
    }
  }, [formData, navigation, validateForm]);

  const handleReset = useCallback(() => {
    Alert.alert(
      "Réinitialiser",
      "Voulez-vous réinitialiser le formulaire ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => {
            setFormData({
              name: "",
              sku: "",
              price: "",
              cost: "",
              volume: "",
              temperature: "cold",
              servingType: "glass",
              allergens: [],
              description: "",
              photos: [],
              featured: false,
              available: true,
            });
            setErrors({});
          },
        },
      ]
    );
  }, []);

  return (
    <ThemedView>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 bg-gray-50">
          <AddMenuHeader
            onBack={() => navigation.goBack()}
            onReset={handleReset}
            scrollY={scrollY}
            title="Nouvelle boisson"
            subtitle="Ajouter une boisson au menu"
          />

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1"
            onScroll={(e) => {
              scrollY.value = e.nativeEvent.contentOffset.y;
            }}
            scrollEventThrottle={16}
          >
            <View className="px-5 py-6">
              {/* Photos */}
              <PhotoUploadSection
                photos={formData.photos}
                error={errors.photos}
                onPhotosChange={(photos) => updateField("photos", photos)}
              />

              {/* Basic Info — name, SKU, availability (no categories) */}
              <Animated.View entering={FadeIn.delay(100).duration(600)} className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
                  <Text className="text-base font-bold">Informations de base</Text>
                </View>

                <VStack className="bg-white rounded-2xl p-4" space="xl">
                  {/* Name */}
                  <View>
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Nom de la boisson *
                    </Text>
                    <TextInput
                      value={formData.name}
                      onChangeText={(text) => updateField("name", text)}
                      placeholder="Ex: Jus d'orange frais"
                      placeholderTextColor="#9CA3AF"
                      className={`bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-body ${
                        errors.name ? "border border-red-300" : ""
                      }`}
                    />
                    {errors.name && (
                      <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
                    )}
                  </View>

                  {/* SKU */}
                  <View>
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Code SKU *
                    </Text>
                    <TextInput
                      value={formData.sku}
                      onChangeText={(text) => updateField("sku", text.toUpperCase())}
                      placeholder="Ex: DRK-001"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="characters"
                      className={`bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-body ${
                        errors.sku ? "border border-red-300" : ""
                      }`}
                    />
                    {errors.sku && (
                      <Text className="text-red-500 text-xs mt-1">{errors.sku}</Text>
                    )}
                  </View>

                  {/* Availability Toggle */}
                  <View className="flex-row items-center justify-between py-2">
                    <View>
                      <Text className="text-sm font-semibold">Disponible immédiatement</Text>
                      <Text className="text-xs mt-0.5">La boisson sera visible dans le menu</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => updateField("available", !formData.available)}
                      className={`w-14 h-8 rounded-full p-1 ${
                        formData.available ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <Animated.View
                        className="w-6 h-6 bg-white rounded-full shadow-sm"
                        style={useAnimatedStyle(() => ({
                          transform: [{
                            translateX: withSpring(formData.available ? 22 : 0),
                          }],
                        }))}
                      />
                    </TouchableOpacity>
                  </View>
                </VStack>
              </Animated.View>

              {/* Pricing */}
              <PricingSection
                price={formData.price}
                cost={formData.cost}
                deliveryType="pickup"
                errors={{
                  price: errors.price,
                  cost: errors.cost,
                }}
                onPriceChange={(text) => updateField("price", text)}
                onCostChange={(text) => updateField("cost", text)}
                onDeliveryTypeChange={() => {}}
              />

              {/* Drink Details — volume, temperature, serving type */}
              <Animated.View entering={FadeIn.delay(300).duration(600)} className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-1 h-4 bg-purple-500 rounded-full mr-2" />
                  <Text className="text-base font-bold">Détails de la boisson</Text>
                </View>

                <View className="bg-white rounded-2xl p-4">
                  {/* Volume */}
                  <View className="mb-4">
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Volume (cl) *
                    </Text>
                    <TextInput
                      value={formData.volume}
                      onChangeText={(text) => updateField("volume", text)}
                      placeholder="Ex: 33"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="decimal-pad"
                      className={`bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-body ${
                        errors.volume ? "border border-red-300" : ""
                      }`}
                    />
                    {errors.volume && (
                      <Text className="text-red-500 text-xs mt-1">{errors.volume}</Text>
                    )}
                  </View>

                  {/* Temperature */}
                  <View className="mb-4">
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Température
                    </Text>
                    <View className="flex-row gap-3">
                      {TEMPERATURE_OPTIONS.map((option) => (
                        <TouchableOpacity
                          key={option.id}
                          onPress={() => updateField("temperature", option.id)}
                          className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
                            formData.temperature === option.id
                              ? "bg-primary-500"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <Ionicons
                            name={option.icon}
                            size={18}
                            color={formData.temperature === option.id ? "#fff" : "#6B7280"}
                          />
                          <Text
                            className={`ml-2 font-semibold text-sm ${
                              formData.temperature === option.id
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Serving Type */}
                  <View>
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Type de contenant
                    </Text>
                    <View className="flex-row gap-3">
                      {SERVING_OPTIONS.map((option) => (
                        <TouchableOpacity
                          key={option.id}
                          onPress={() => updateField("servingType", option.id)}
                          className={`flex-1 py-3 rounded-xl flex-row items-center justify-center ${
                            formData.servingType === option.id
                              ? "bg-primary-500"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          <Ionicons
                            name={option.icon}
                            size={18}
                            color={formData.servingType === option.id ? "#fff" : "#6B7280"}
                          />
                          <Text
                            className={`ml-2 font-semibold text-sm ${
                              formData.servingType === option.id
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          >
                            {option.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </Animated.View>

              {/* Allergens */}
              <Animated.View entering={FadeIn.delay(350).duration(600)} className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-1 h-4 bg-red-500 rounded-full mr-2" />
                  <Text className="text-base font-bold">Allergènes</Text>
                </View>

                <View className="bg-white rounded-2xl p-4">
                  <Text className="text-xs mb-3 uppercase tracking-wide">
                    Sélectionnez les allergènes présents dans cette boisson
                  </Text>

                  <View className="flex-row flex-wrap -mx-1">
                    {ALLERGENS.map((allergen) => {
                      const isSelected = formData.allergens.includes(allergen.id);
                      return (
                        <TouchableOpacity
                          key={allergen.id}
                          onPress={() => toggleAllergen(allergen.id)}
                          className="px-1 mb-2"
                          activeOpacity={0.7}
                        >
                          <View
                            className={`px-4 py-2.5 rounded-xl flex-row items-center ${
                              isSelected
                                ? "bg-red-100 border border-red-300"
                                : "bg-gray-50 border border-gray-200"
                            }`}
                          >
                            <MaterialIcons
                              name={allergen.icon as any}
                              size={18}
                              color={isSelected ? "#DC2626" : "#6B7280"}
                            />
                            <Text
                              className={`ml-2 text-sm ${
                                isSelected
                                  ? "text-red-700 font-semibold"
                                  : "text-gray-600"
                              }`}
                            >
                              {allergen.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {formData.allergens.length > 0 && (
                    <View className="mt-3 bg-red-50 rounded-lg p-3 flex-row items-start">
                      <MaterialIcons name="info-outline" size={16} color="#DC2626" />
                      <Text className="ml-2 text-xs text-red-700 flex-1">
                        {formData.allergens.length} allergène
                        {formData.allergens.length > 1 ? "s" : ""} sélectionné
                        {formData.allergens.length > 1 ? "s" : ""}. Ces informations seront
                        affichées aux clients.
                      </Text>
                    </View>
                  )}
                </View>
              </Animated.View>

              {/* Description + Featured */}
              <Animated.View entering={FadeIn.delay(400).duration(600)} className="mb-8">
                <View className="flex-row items-center mb-3">
                  <View className="w-1 h-4 bg-primary-500 rounded-full mr-2" />
                  <Text className="text-base font-bold">Informations complémentaires</Text>
                </View>

                <View className="bg-white rounded-2xl p-4 space-y-4">
                  {/* Description */}
                  <View>
                    <Text className="text-xs font-semibold mb-2 uppercase tracking-wide">
                      Description
                    </Text>
                    <TextInput
                      value={formData.description}
                      onChangeText={(text) => updateField("description", text)}
                      placeholder="Description de la boisson..."
                      placeholderTextColor="#9CA3AF"
                      multiline
                      numberOfLines={4}
                      className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 font-body"
                      style={{ textAlignVertical: "top", minHeight: 100 }}
                    />
                  </View>

                  {/* Featured Toggle */}
                  <View className="flex-row items-center justify-between py-2">
                    <View>
                      <Text className="text-sm font-semibold">Mettre en avant</Text>
                      <Text className="text-xs mt-0.5">Apparaîtra dans les suggestions</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => updateField("featured", !formData.featured)}
                      className={`w-14 h-8 rounded-full p-1 ${
                        formData.featured ? "bg-yellow-500" : "bg-gray-300"
                      }`}
                    >
                      <Animated.View
                        className="w-6 h-6 bg-white rounded-full shadow-sm"
                        style={useAnimatedStyle(() => ({
                          transform: [{
                            translateX: withSpring(formData.featured ? 22 : 0),
                          }],
                        }))}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </View>
          </ScrollView>

          {/* Save Button */}
          <View className="px-5 pt-4 bg-white border-t border-gray-100">
            <SaveButton onSave={handleSave} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default AddDrinksScreen;
