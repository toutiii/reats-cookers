import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import {
  PhotoUploadSection,
  BasicInfoSection,
  PricingSection,
  IngredientsSection,
  AllergensSection,
  AdditionalInfoSection,
  AddMenuHeader,
  SaveButton,
} from "@/components/add-menu";
import {
  fetchIngredients,
  getIngredientCategories,
  type Ingredient,
} from "@/api/ingredients";

interface FormData {
  name: string;
  category: string;
  sku: string;
  price: string;
  cost: string;
  deliveryType: "pickup" | "delivery";
  ingredients: string[];
  allergens: string[];
  preparationTime: string;
  maxConcurrentOrders: string;
  description: string;
  photos: string[];
  featured: boolean;
  available: boolean;
}

const CATEGORIES = [
  { id: "burgers", name: "Burgers", icon: "fast-food", color: "#FF6B6B" },
  { id: "pizza", name: "Pizzas", icon: "pizza", color: "#4ECDC4" },
  { id: "salads", name: "Salades", icon: "leaf", color: "#95E1D3" },
  { id: "desserts", name: "Desserts", icon: "ice-cream", color: "#FFD93D" },
  { id: "drinks", name: "Boissons", icon: "cafe", color: "#9B59B6" },
];

// Ingredients are now loaded from API
// See @/api/ingredients.js for the implementation

// Liste exhaustive des 14 allergènes majeurs selon la réglementation européenne (INCO)
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

const AddMenuItemScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation("menu");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    sku: "",
    price: "",
    cost: "",
    deliveryType: "pickup",
    ingredients: [],
    allergens: [],
    preparationTime: "",
    maxConcurrentOrders: "",
    description: "",
    photos: [],
    featured: false,
    available: true,
  });

  const [selectedIngredientCategory, setSelectedIngredientCategory] = useState<string>("basic");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const scrollY = useSharedValue(0);

  // Load ingredients from API on component mount
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setIsLoadingIngredients(true);
        const fetchedIngredients = await fetchIngredients();
        setIngredients(fetchedIngredients);
      } catch (error) {
        console.error("Error loading ingredients:", error);
        Alert.alert(
          "Erreur",
          "Impossible de charger les ingrédients. Veuillez réessayer.",
          [{ text: "OK" }]
        );
      } finally {
        setIsLoadingIngredients(false);
      }
    };

    loadIngredients();
  }, []);

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleIngredient = useCallback((ingredientId: string) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredientId)
        ? prev.ingredients.filter((i) => i !== ingredientId)
        : [...prev.ingredients, ingredientId],
    }));
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
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = t("validation.nameRequired");
    if (!formData.category) newErrors.category = t("validation.categoryRequired");
    if (!formData.price.trim()) newErrors.price = t("validation.priceRequired");
    if (!formData.cost.trim()) newErrors.cost = t("validation.costRequired");
    if (!formData.sku.trim()) newErrors.sku = t("validation.skuRequired");
    if (!formData.preparationTime.trim()) newErrors.preparationTime = t("validation.preparationTimeRequired");
    if (!formData.maxConcurrentOrders.trim()) newErrors.maxConcurrentOrders = t("validation.maxOrdersRequired");
    if (formData.photos.length === 0) newErrors.photos = [t("validation.photoRequired")];

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (validateForm()) {
      Alert.alert(
        t("alerts.saveConfirmTitle"),
        t("alerts.saveConfirmMessage"),
        [
          { text: t("common:buttons.cancel"), style: "cancel" },
          {
            text: t("alerts.add"),
            onPress: () => {
              console.log("Save:", formData);
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        t("validation.formIncomplete"),
        t("validation.fillAllFields"),
        [{ text: t("common:buttons.ok") }]
      );
    }
  }, [formData, navigation, validateForm]);

  const handleReset = useCallback(() => {
    Alert.alert(
      t("alerts.resetConfirmTitle"),
      t("alerts.resetConfirmMessage"),
      [
        { text: t("common:buttons.cancel"), style: "cancel" },
        {
          text: t("alerts.reset"),
          style: "destructive",
          onPress: () => {
            setFormData({
              name: "",
              category: "",
              sku: "",
              price: "",
              cost: "",
              deliveryType: "pickup",
              ingredients: [],
              allergens: [],
              preparationTime: "",
              maxConcurrentOrders: "",
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

  // Generate ingredient categories dynamically from loaded ingredients
  // Memoized for performance - only recalculates when ingredients change
  const ingredientCategories = React.useMemo(() => {
    if (ingredients.length === 0) return [];

    const categoryNames: Record<string, { name: string; icon: string }> = {
      basic: { name: "Basiques", icon: "nutrition-outline" },
      protein: { name: "Protéines", icon: "fish-outline" },
      dairy: { name: "Laitiers", icon: "ice-cream-outline" },
      fruit: { name: "Fruits", icon: "leaf-outline" },
      vegetable: { name: "Légumes", icon: "leaf-outline" },
      grain: { name: "Céréales", icon: "nutrition-outline" },
      spice: { name: "Épices", icon: "flame-outline" },
    };

    const categories = getIngredientCategories(ingredients);
    return categories.map((catId) => ({
      id: catId,
      name: categoryNames[catId]?.name || catId,
      icon: categoryNames[catId]?.icon || "nutrition-outline",
      count: ingredients.filter((i) => i.category === catId).length,
    }));
  }, [ingredients]);

  // Auto-select first category when ingredients load
  React.useEffect(() => {
    if (ingredientCategories.length > 0 && !selectedIngredientCategory) {
      setSelectedIngredientCategory(ingredientCategories[0].id);
    }
  }, [ingredientCategories, selectedIngredientCategory]);

  return (
    <ThemedView>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios"
? "padding"
: "height"}
        className="flex-1"
      >
        <SafeAreaView  className="flex-1 bg-gray-50">
          {/* Header */}
          <AddMenuHeader
            onBack={() => navigation.goBack()}
            onReset={handleReset}
            scrollY={scrollY}
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
              {/* Loading Indicator */}
              {isLoadingIngredients && (
                <View className="bg-white rounded-2xl p-6 mb-6 items-center">
                  <ActivityIndicator size="large" color="#FF6B35" />
                  <Text className="mt-3 text-gray-600">Chargement des ingrédients...</Text>
                </View>
              )}

              {/* Photos Section */}
              <PhotoUploadSection
                photos={formData.photos}
                error={errors.photos?.[0]}
                onPhotosChange={(photos) => updateField("photos", photos)}
              />

              {/* Basic Info */}
              <BasicInfoSection
                name={formData.name}
                category={formData.category}
                sku={formData.sku}
                available={formData.available}
                categories={CATEGORIES}
                errors={{
                  name: errors.name,
                  category: errors.category,
                  sku: errors.sku,
                }}
                onNameChange={(text) => updateField("name", text)}
                onCategoryChange={(id) => updateField("category", id)}
                onSkuChange={(text) => updateField("sku", text)}
                onAvailableChange={(value) => updateField("available", value)}
              />

              {/* Pricing */}
              <PricingSection
                price={formData.price}
                cost={formData.cost}
                deliveryType={formData.deliveryType}
                errors={{
                  price: errors.price,
                  cost: errors.cost,
                }}
                onPriceChange={(text) => updateField("price", text)}
                onCostChange={(text) => updateField("cost", text)}
                onDeliveryTypeChange={(type) => updateField("deliveryType", type)}
              />

              {/* Ingredients */}
              {!isLoadingIngredients && (
                <IngredientsSection
                  ingredients={ingredients}
                  selectedIngredients={formData.ingredients}
                  selectedCategory={selectedIngredientCategory}
                  categories={ingredientCategories}
                  onCategoryChange={setSelectedIngredientCategory}
                  onToggleIngredient={toggleIngredient}
                />
              )}

              {/* Allergens */}
              <AllergensSection
                allergens={ALLERGENS}
                selectedAllergens={formData.allergens}
                onToggleAllergen={toggleAllergen}
              />

              {/* Additional Info */}
              <AdditionalInfoSection
                preparationTime={formData.preparationTime}
                maxConcurrentOrders={formData.maxConcurrentOrders}
                description={formData.description}
                featured={formData.featured}
                errors={{
                  preparationTime: errors.preparationTime,
                  maxConcurrentOrders: errors.maxConcurrentOrders,
                }}
                onPreparationTimeChange={(text) => updateField("preparationTime", text)}
                onMaxConcurrentOrdersChange={(text) => updateField("maxConcurrentOrders", text)}
                onDescriptionChange={(text) => updateField("description", text)}
                onFeaturedChange={(value) => updateField("featured", value)}
              />
            </View>
          </ScrollView>

          {/* Save Button - Always at bottom in normal flow */}
          <View className="px-5 pt-4 bg-white border-t border-gray-100">
            <SaveButton onSave={handleSave} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default AddMenuItemScreen;
