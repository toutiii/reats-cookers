import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { ThemedView } from "@/components/themed-view";
import {
  PhotoUploadSection,
  BasicInfoSection,
  PricingSection,
  IngredientsSection,
  AdditionalInfoSection,
  AddMenuHeader,
  SaveButton,
  type Ingredient,
} from "@/components/add-menu";

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

const INGREDIENTS: Ingredient[] = [
  // Basic
  { id: "salt", name: "Sel", icon: "🧂", category: "basic" },
  { id: "pepper", name: "Poivre", icon: "🌶️", category: "basic" },
  { id: "oil", name: "Huile", icon: "🫒", category: "basic" },
  { id: "garlic", name: "Ail", icon: "🧄", category: "basic" },
  { id: "onion", name: "Oignon", icon: "🧅", category: "basic" },
  { id: "herbs", name: "Herbes", icon: "🌿", category: "basic" },
  
  // Protein
  { id: "chicken", name: "Poulet", icon: "🍗", category: "protein" },
  { id: "beef", name: "Bœuf", icon: "🥩", category: "protein" },
  { id: "fish", name: "Poisson", icon: "🐟", category: "protein" },
  { id: "egg", name: "Œuf", icon: "🥚", category: "protein" },
  { id: "shrimp", name: "Crevette", icon: "🦐", category: "protein" },
  { id: "tofu", name: "Tofu", icon: "🧈", category: "protein" },
  
  // Dairy
  { id: "milk", name: "Lait", icon: "🥛", category: "dairy" },
  { id: "cheese", name: "Fromage", icon: "🧀", category: "dairy" },
  { id: "butter", name: "Beurre", icon: "🧈", category: "dairy" },
  { id: "cream", name: "Crème", icon: "🥛", category: "dairy" },
  
  // Fruits & Vegetables
  { id: "tomato", name: "Tomate", icon: "🍅", category: "fruit" },
  { id: "avocado", name: "Avocat", icon: "🥑", category: "fruit" },
  { id: "lettuce", name: "Laitue", icon: "🥬", category: "fruit" },
  { id: "carrot", name: "Carotte", icon: "🥕", category: "fruit" },
  { id: "mushroom", name: "Champignon", icon: "🍄", category: "fruit" },
  { id: "corn", name: "Maïs", icon: "🌽", category: "fruit" },
];

const ALLERGENS = [
  { id: "gluten", name: "Gluten", icon: "grain" },
  { id: "lactose", name: "Lactose", icon: "water-drop" },
  { id: "eggs", name: "Œufs", icon: "egg" },
  { id: "nuts", name: "Fruits à coque", icon: "nutrition" },
  { id: "soy", name: "Soja", icon: "grass" },
  { id: "fish", name: "Poisson", icon: "sailing" },
];

const AddMenuItemScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
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
  const scrollY = useSharedValue(0);

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
    
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    if (!formData.category) newErrors.category = "La catégorie est requise";
    if (!formData.price.trim()) newErrors.price = "Le prix est requis";
    if (!formData.cost.trim()) newErrors.cost = "Le coût est requis";
    if (!formData.sku.trim()) newErrors.sku = "Le SKU est requis";
    if (!formData.preparationTime.trim()) newErrors.preparationTime = "Le temps de préparation est requis";
    if (!formData.maxConcurrentOrders.trim()) newErrors.maxConcurrentOrders = "Le nombre max de commandes est requis";
    if (formData.photos.length === 0) newErrors.photos = ["Au moins une photo est requise"];
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSave = useCallback(() => {
    if (validateForm()) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous ajouter ce plat au menu ?",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Ajouter",
            onPress: () => {
              console.log("Save:", formData);
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      Alert.alert("Formulaire incomplet", "Veuillez remplir tous les champs obligatoires.");
    }
  }, [formData, navigation, validateForm]);

  const handleReset = useCallback(() => {
    Alert.alert(
      "Réinitialiser le formulaire",
      "Toutes les données seront perdues. Continuer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Réinitialiser",
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

  const ingredientCategories = [
    { id: "basic", name: "Basiques", icon: "nutrition-outline", count: INGREDIENTS.filter(i => i.category === "basic").length },
    { id: "protein", name: "Protéines", icon: "fish-outline", count: INGREDIENTS.filter(i => i.category === "protein").length },
    { id: "dairy", name: "Laitiers", icon: "ice-cream-outline", count: INGREDIENTS.filter(i => i.category === "dairy").length },
    { id: "fruit", name: "Légumes", icon: "leaf-outline", count: INGREDIENTS.filter(i => i.category === "fruit").length },
  ];

  return (
    <ThemedView>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <SafeAreaView edges={["top"]} className="flex-1 bg-gray-50">
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
              <IngredientsSection
                ingredients={INGREDIENTS}
                selectedIngredients={formData.ingredients}
                selectedCategory={selectedIngredientCategory}
                categories={ingredientCategories}
                onCategoryChange={setSelectedIngredientCategory}
                onToggleIngredient={toggleIngredient}
              />

              {/* Additional Info */}
              <AdditionalInfoSection
                preparationTime={formData.preparationTime}
                maxConcurrentOrders={formData.maxConcurrentOrders}
                description={formData.description}
                allergens={ALLERGENS}
                selectedAllergens={formData.allergens}
                featured={formData.featured}
                errors={{
                  preparationTime: errors.preparationTime,
                  maxConcurrentOrders: errors.maxConcurrentOrders,
                }}
                onPreparationTimeChange={(text) => updateField("preparationTime", text)}
                onMaxConcurrentOrdersChange={(text) => updateField("maxConcurrentOrders", text)}
                onDescriptionChange={(text) => updateField("description", text)}
                onToggleAllergen={toggleAllergen}
                onFeaturedChange={(value) => updateField("featured", value)}
              />

              {/* Save Button */}
              <SaveButton onSave={handleSave} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default AddMenuItemScreen;
