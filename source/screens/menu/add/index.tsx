import React, { useState, useCallback, useEffect, useMemo } from "react";
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
  NutritionSection,
  AdditionalInfoSection,
  AddMenuHeader,
  SaveButton,
} from "@/components/add-menu";
import {
  fetchIngredients,
  getIngredientCategories,
  type Ingredient,
} from "@/api/ingredients";
import { calculateRecipeNutrition } from "@/api/ingredients/nutrition-calculator";
import type { IngredientQuantities } from "@/api/ingredients/types";
import {
  detectAllergensFromIngredients,
  getAllergenSuggestions,
  autoApplyHighConfidenceAllergens,
} from "@/api/ingredients/allergen-detector";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import {
  useCreateDishMutation,
  useGetDishQuery,
  useUpdateDishMutation,
} from "@/store/api/dishApi";

interface FormData {
  name: string;
  category: string;
  price: string;
  cost: string;
  deliveryType: "pickup" | "delivery" | "both";
  ingredients: string[];
  ingredientQuantities: IngredientQuantities;
  allergens: string[];
  preparationTime: string;
  maxConcurrentOrders: string;
  description: string;
  photos: string[];
  available: boolean;
  portions: number;
}

// Parse a numeric form field (string) into a finite number, or null if invalid
const parseFiniteNumber = (value: string): number | null => {
  const n = Number((value ?? "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

const parseFiniteInt = (value: string): number | null => {
  const n = Number.parseInt((value ?? "").trim(), 10);
  return Number.isFinite(n) ? n : null;
};

// Categories must match API values: "dish", "starter", "dessert"
const CATEGORIES = [
  { id: "dish", name: "Plat", icon: "restaurant", color: "#FF6B6B" },
  { id: "starter", name: "Entrée", icon: "leaf", color: "#4ECDC4" },
  { id: "dessert", name: "Dessert", icon: "ice-cream", color: "#FFD93D" },
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

const AddMenuItemScreen: React.FC<{ navigation: any; route?: any }> = ({ navigation, route }) => {
  const { t } = useTranslation("menu");
  const cookerId = useSelector((state: RootState) => state.auth.userId);
  const editingDishId: number | undefined = route?.params?.dishId;
  const isEditing = typeof editingDishId === "number";

  const [createDish, { isLoading: isCreating }] = useCreateDishMutation();
  const [updateDish, { isLoading: isUpdating }] = useUpdateDishMutation();
  const isSubmitting = isCreating || isUpdating;

  const { data: editingDish, isLoading: isLoadingDish } = useGetDishQuery(
    editingDishId as number,
    { skip: !isEditing },
  );
  const [hasPrefilled, setHasPrefilled] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    price: "",
    cost: "",
    deliveryType: "pickup",
    ingredients: [],
    ingredientQuantities: {},
    allergens: [],
    preparationTime: "",
    maxConcurrentOrders: "",
    description: "",
    photos: [],
    available: true,
    portions: 1,
  });

  const [selectedIngredientCategory, setSelectedIngredientCategory] = useState<string>("basic");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(true);
  const scrollY = useSharedValue(0);

  // AI-powered allergen detection based on selected ingredients
  const detectedAllergens = useMemo(() => {
    if (formData.ingredients.length === 0 || ingredients.length === 0) {
      return [];
    }
    return detectAllergensFromIngredients(formData.ingredients, ingredients);
  }, [formData.ingredients, ingredients]);

  // Get allergen suggestions (detected but not yet selected)
  const allergenSuggestions = useMemo(() => {
    return getAllergenSuggestions(detectedAllergens, formData.allergens);
  }, [detectedAllergens, formData.allergens]);

  // Auto-sync allergens: Remove auto-detected allergens when ingredients are deselected
  // Keep track of which allergens were auto-applied vs manually selected
  const [manuallyAddedAllergens, setManuallyAddedAllergens] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (detectedAllergens.length === 0 && formData.allergens.length > 0) {
      // No ingredients selected, keep only manually added allergens
      const manualOnly = formData.allergens.filter((a) => manuallyAddedAllergens.has(a));
      if (manualOnly.length !== formData.allergens.length) {
        setFormData((prev) => ({ ...prev, allergens: manualOnly }));
      }
      return;
    }

    // Get list of currently detected allergen IDs
    const detectedIds = new Set(detectedAllergens.map((d) => d.allergenId));

    // Keep allergens that are either detected OR manually added
    const stillValid = formData.allergens.filter((allergenId) => {
      return detectedIds.has(allergenId) || manuallyAddedAllergens.has(allergenId);
    });

    // Only update if something changed
    if (stillValid.length !== formData.allergens.length) {
      setFormData((prev) => ({ ...prev, allergens: stillValid }));
    }
  }, [detectedAllergens, formData.allergens, manuallyAddedAllergens]);

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

  // Pre-fill form when editing an existing dish.
  // Wait until the local ingredients catalog is loaded so we can name-match
  // the API-returned ingredients/allergens.
  useEffect(() => {
    if (!isEditing || !editingDish || hasPrefilled) return;
    if (isLoadingIngredients || ingredients.length === 0) return;

    const norm = (s: string) =>
      s
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim();

    // Index local catalog for fast lookup by id and by normalized name
    const byId = new Map(ingredients.map((i) => [i.id, i]));
    const byName = new Map(ingredients.map((i) => [norm(i.name), i]));

    // Resolve API-saved ingredients (could be string[] of names or object[] with code/name)
    const rawIngredients: any[] = Array.isArray(editingDish.ingredients)
      ? [...editingDish.ingredients]
      : [];
    const matchedIngredientIds: string[] = [];
    rawIngredients.forEach((raw) => {
      if (raw == null) return;
      if (typeof raw === "string") {
        const local = byId.get(raw) ?? byName.get(norm(raw));
        if (local) matchedIngredientIds.push(local.id);
        return;
      }
      const code: string | undefined = raw.code ?? raw.id;
      const name: string | undefined = raw.name;
      const local =
        (code ? byId.get(code) : undefined) ??
        (name ? byName.get(norm(name)) : undefined);
      if (local) matchedIngredientIds.push(local.id);
    });
    const ingredientIds = Array.from(new Set(matchedIngredientIds));

    // Resolve allergens against local ALLERGENS catalog (by id or by name)
    const allergenById = new Map(ALLERGENS.map((a) => [a.id, a]));
    const allergenByName = new Map(ALLERGENS.map((a) => [norm(a.name), a]));
    const rawAllergens: any[] = Array.isArray(editingDish.allergens)
      ? [...editingDish.allergens]
      : [];
    const matchedAllergenIds: string[] = [];
    rawAllergens.forEach((raw) => {
      if (raw == null) return;
      const candidate =
        typeof raw === "string"
          ? raw
          : (raw.code ?? raw.id ?? raw.name ?? "");
      if (!candidate) return;
      const lower = norm(String(candidate));
      const hit = allergenById.get(lower) ?? allergenByName.get(lower);
      if (hit) matchedAllergenIds.push(hit.id);
    });
    const allergenIds = Array.from(new Set(matchedAllergenIds));

    // Mark API-resolved allergens as manual so they aren't auto-removed by the
    // ingredient-driven sync effect when there are no auto-detected allergens yet.
    setManuallyAddedAllergens(new Set(allergenIds));

    const photoUrls =
      Array.isArray(editingDish.images) && editingDish.images.length > 0
        ? editingDish.images.map((img) => img.url).filter(Boolean)
        : editingDish.image
          ? [editingDish.image]
          : [];

    setFormData((prev) => ({
      ...prev,
      name: editingDish.name ?? "",
      category: editingDish.category ?? "",
      price: editingDish.price != null ? String(editingDish.price) : "",
      cost: editingDish.cost != null ? String(editingDish.cost) : "",
      ingredients: ingredientIds,
      allergens: allergenIds,
      preparationTime:
        editingDish.preparation_time != null
          ? String(editingDish.preparation_time)
          : "",
      maxConcurrentOrders:
        editingDish.max_concurrent_orders != null
          ? String(editingDish.max_concurrent_orders)
          : "",
      description: editingDish.description ?? "",
      photos: photoUrls as string[],
      available: editingDish.is_enabled ?? true,
    }));
    setHasPrefilled(true);
  }, [isEditing, editingDish, hasPrefilled, isLoadingIngredients, ingredients]);

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleIngredient = useCallback((ingredientId: string) => {
    setFormData((prev) => {
      const isRemoving = prev.ingredients.includes(ingredientId);
      const newIngredients = isRemoving
        ? prev.ingredients.filter((i) => i !== ingredientId)
        : [...prev.ingredients, ingredientId];

      // Clean up quantity when deselecting
      let newQuantities = prev.ingredientQuantities;
      if (isRemoving) {
        const { [ingredientId]: _, ...rest } = prev.ingredientQuantities;
        newQuantities = rest;
      }

      return {
        ...prev,
        ingredients: newIngredients,
        ingredientQuantities: newQuantities,
      };
    });
  }, []);

  const toggleAllergen = useCallback((allergenId: string) => {
    setFormData((prev) => {
      const isCurrentlySelected = prev.allergens.includes(allergenId);

      if (isCurrentlySelected) {
        // Removing allergen - also remove from manual tracking
        setManuallyAddedAllergens((manual) => {
          const newManual = new Set(manual);
          newManual.delete(allergenId);
          return newManual;
        });
        return {
          ...prev,
          allergens: prev.allergens.filter((a) => a !== allergenId),
        };
      } else {
        // Adding allergen - check if it's manual (not detected)
        const isDetected = detectedAllergens.some((d) => d.allergenId === allergenId);
        if (!isDetected) {
          // Mark as manually added
          setManuallyAddedAllergens((manual) => new Set(manual).add(allergenId));
        }
        return {
          ...prev,
          allergens: [...prev.allergens, allergenId],
        };
      }
    });
  }, [detectedAllergens]);

  // Auto-apply all high-confidence allergen suggestions
  const applyAllAllergenSuggestions = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      allergens: autoApplyHighConfidenceAllergens(detectedAllergens, prev.allergens),
    }));
  }, [detectedAllergens]);

  // --- Nutrition ---
  const updateIngredientQuantity = useCallback(
    (ingredientId: string, grams: number) => {
      setFormData((prev) => ({
        ...prev,
        ingredientQuantities: {
          ...prev.ingredientQuantities,
          [ingredientId]: grams,
        },
      }));
    },
    []
  );

  const updatePortions = useCallback((value: number) => {
    setFormData((prev) => ({ ...prev, portions: Math.max(1, value) }));
  }, []);

  const recipeNutrition = useMemo(() => {
    return calculateRecipeNutrition(
      formData.ingredients,
      formData.ingredientQuantities,
      formData.portions,
      ingredients
    );
  }, [
    formData.ingredients,
    formData.ingredientQuantities,
    formData.portions,
    ingredients,
  ]);

  const quantifiedCount = useMemo(() => {
    return formData.ingredients.filter(
      (id) => (formData.ingredientQuantities[id] ?? 0) > 0
    ).length;
  }, [formData.ingredients, formData.ingredientQuantities]);

  const validateForm = useCallback(() => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    } else if (formData.name.length > 128) {
      newErrors.name = "Maximum 128 caractères";
    }

    if (formData.description.length > 1024) {
      newErrors.description = "Maximum 1024 caractères";
    }

    if (!formData.category) newErrors.category = t("validation.categoryRequired");

    if (!formData.price.trim()) {
      newErrors.price = t("validation.priceRequired");
    } else if (parseFiniteNumber(formData.price) === null) {
      newErrors.price = "Prix invalide";
    }

    if (!formData.cost.trim()) {
      newErrors.cost = t("validation.costRequired");
    } else if (parseFiniteNumber(formData.cost) === null) {
      newErrors.cost = "Coût invalide";
    }

    if (!formData.preparationTime.trim()) {
      newErrors.preparationTime = t("validation.preparationTimeRequired");
    } else if (parseFiniteInt(formData.preparationTime) === null) {
      newErrors.preparationTime = "Temps invalide";
    }

    if (!formData.maxConcurrentOrders.trim()) {
      newErrors.maxConcurrentOrders = t("validation.maxOrdersRequired");
    } else if (parseFiniteInt(formData.maxConcurrentOrders) === null) {
      newErrors.maxConcurrentOrders = "Nombre invalide";
    }

    if (formData.photos.length === 0) newErrors.photos = [t("validation.photoRequired")];

    if (Object.keys(newErrors).length > 0) {
      console.log("[validateForm] missing/invalid fields:", newErrors);
      console.log("[validateForm] current formData:", {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        cost: formData.cost,
        preparationTime: formData.preparationTime,
        maxConcurrentOrders: formData.maxConcurrentOrders,
        photosCount: formData.photos.length,
      });
    }

    setErrors(newErrors);
    return newErrors;
  }, [formData]);

  // Map FormData keys to user-readable labels for the validation alert
  const FIELD_LABELS: Record<string, string> = {
    name: "Nom",
    description: "Description",
    category: "Catégorie",
    price: "Prix",
    cost: "Coût",
    preparationTime: "Temps de préparation",
    maxConcurrentOrders: "Commandes simultanées",
    photos: "Photo",
  };

  const handleSave = useCallback(() => {
    const validationErrors = validateForm();
    const isValid = Object.keys(validationErrors).length === 0;
    if (isValid) {
      Alert.alert(
        isEditing ? "Confirmer la modification" : t("alerts.saveConfirmTitle"),
        isEditing
          ? "Voulez-vous enregistrer les modifications ?"
          : t("alerts.saveConfirmMessage"),
        [
          { text: t("common:buttons.cancel"), style: "cancel" },
          {
            text: isEditing ? "Enregistrer" : t("alerts.add"),
            onPress: async () => {
              try {
                // Numeric coercion (validateForm already guarantees finite values)
                const price = parseFiniteNumber(formData.price) ?? 0;
                const cost = parseFiniteNumber(formData.cost) ?? 0;
                const preparationTime = parseFiniteInt(formData.preparationTime) ?? 0;
                const maxConcurrentOrders =
                  parseFiniteInt(formData.maxConcurrentOrders) ?? 0;

                // Map selected ingredient IDs to {code, name, category, is_allergen}
                const ingredientPayload = formData.ingredients.map((id) => {
                  const ing = ingredients.find((i) => i.id === id);
                  return {
                    code: ing?.id ?? id,
                    name: ing?.name ?? id,
                    category: ing?.category ?? "basic",
                    is_allergen: (ing?.allergens?.length ?? 0) > 0,
                  };
                });

                // Fix 4: persist manually-selected allergens as synthetic ingredients
                // so the backend can store them (no separate allergens field exists).
                const coveredAllergens = new Set<string>();
                ingredientPayload.forEach((ing) => {
                  if (!ing.is_allergen) return;
                  const local = ingredients.find((i) => i.id === ing.code);
                  (local?.allergens ?? []).forEach((a) => coveredAllergens.add(a));
                });
                const missingAllergens = formData.allergens.filter(
                  (a) => !coveredAllergens.has(a),
                );
                missingAllergens.forEach((allergenId) => {
                  const meta = ALLERGENS.find((a) => a.id === allergenId);
                  ingredientPayload.push({
                    code: `allergen-${allergenId}`,
                    name: meta?.name ?? allergenId,
                    category: "allergen",
                    is_allergen: true,
                  });
                });

                const nutritionalInfo = recipeNutrition
                  ? {
                      calories: recipeNutrition.perPortion.calories,
                      proteins: recipeNutrition.perPortion.proteins,
                      carbohydrates: recipeNutrition.perPortion.carbs,
                      fats: recipeNutrition.perPortion.fats,
                    }
                  : undefined;

                if (isEditing && editingDishId !== undefined) {
                  // Atomic PATCH: include is_enabled if it diverges from server
                  const serverEnabled = editingDish?.is_enabled ?? true;
                  const updatePayload = {
                    name: formData.name,
                    description: formData.description,
                    price,
                    cost,
                    category: formData.category as "dish" | "starter" | "dessert",
                    preparation_time: preparationTime,
                    max_concurrent_orders: maxConcurrentOrders,
                    ingredients: ingredientPayload,
                    nutritional_info: nutritionalInfo,
                    photos: formData.photos,
                    ...(formData.available !== serverEnabled
                      ? { is_enabled: formData.available }
                      : {}),
                  };

                  console.log("[UpdateDish] payload:", JSON.stringify(updatePayload, null, 2));

                  await updateDish({ id: editingDishId, data: updatePayload }).unwrap();
                } else {
                  const payload = {
                    cooker: cookerId!,
                    name: formData.name,
                    description: formData.description,
                    price,
                    cost,
                    category: formData.category as "dish" | "starter" | "dessert",
                    preparation_time: preparationTime,
                    max_concurrent_orders: maxConcurrentOrders,
                    country: "FR",
                    photos: formData.photos,
                    ingredients: ingredientPayload,
                    nutritional_info: nutritionalInfo,
                  };

                  console.log("[CreateDish] payload:", JSON.stringify(payload, null, 2));

                  await createDish(payload).unwrap();
                }

                Alert.alert(
                  t("alerts.successTitle"),
                  isEditing
                    ? "Le plat a été mis à jour."
                    : t("alerts.successMessage"),
                  [{ text: t("common:buttons.ok"), onPress: () => navigation.goBack() }],
                );
              } catch (error: any) {
                console.error(
                  isEditing ? "[UpdateDish] error:" : "[CreateDish] error:",
                  JSON.stringify(error?.data ?? error, null, 2),
                );
                Alert.alert(
                  t("alerts.errorTitle"),
                  t("alerts.errorMessage"),
                  [{ text: t("common:buttons.ok") }],
                );
              }
            },
          },
        ]
      );
    } else {
      const missingLabels = Object.keys(validationErrors)
        .filter((k) => (validationErrors as Record<string, unknown>)[k])
        .map((k) => FIELD_LABELS[k] ?? k);
      Alert.alert(
        t("validation.formIncomplete"),
        missingLabels.length > 0
          ? `Champs en cause : ${missingLabels.join(", ")}`
          : t("validation.fillAllFields"),
        [{ text: t("common:buttons.ok") }]
      );
    }
  }, [
    isEditing,
    editingDishId,
    editingDish,
    formData,
    navigation,
    validateForm,
    createDish,
    updateDish,
    cookerId,
    ingredients,
    recipeNutrition,
    t,
  ]);

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
              price: "",
              cost: "",
              deliveryType: "pickup",
              ingredients: [],
              ingredientQuantities: {},
              allergens: [],
              preparationTime: "",
              maxConcurrentOrders: "",
              description: "",
              photos: [],
              available: true,
              portions: 1,
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
            title={isEditing ? "Modifier le plat" : undefined}
            subtitle={isEditing ? "Mettre à jour les informations" : undefined}
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
              {(isLoadingIngredients || (isEditing && isLoadingDish)) && (
                <View className="bg-white rounded-2xl p-6 mb-6 items-center">
                  <ActivityIndicator size="large" color="#FF6B35" />
                  <Text className="mt-3 text-gray-600">
                    {isEditing && isLoadingDish
                      ? "Chargement du plat..."
                      : "Chargement des ingrédients..."}
                  </Text>
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
                available={formData.available}
                categories={CATEGORIES}
                errors={{
                  name: errors.name,
                  category: errors.category,
                }}
                onNameChange={(text) => updateField("name", text)}
                onCategoryChange={(id) => updateField("category", id)}
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
                  ingredientQuantities={formData.ingredientQuantities}
                  onQuantityChange={updateIngredientQuantity}
                />
              )}

              {/* Allergens - AI-powered detection */}
              <AllergensSection
                allergens={ALLERGENS}
                selectedAllergens={formData.allergens}
                suggestedAllergens={allergenSuggestions}
                onToggleAllergen={toggleAllergen}
                onApplyAllSuggestions={applyAllAllergenSuggestions}
              />

              {/* Nutrition */}
              <NutritionSection
                nutrition={recipeNutrition}
                portions={formData.portions}
                onPortionsChange={updatePortions}
                ingredientCount={formData.ingredients.length}
                quantifiedCount={quantifiedCount}
              />

              {/* Additional Info */}
              <AdditionalInfoSection
                preparationTime={formData.preparationTime}
                maxConcurrentOrders={formData.maxConcurrentOrders}
                description={formData.description}
                errors={{
                  preparationTime: errors.preparationTime,
                  maxConcurrentOrders: errors.maxConcurrentOrders,
                }}
                onPreparationTimeChange={(text) => updateField("preparationTime", text)}
                onMaxConcurrentOrdersChange={(text) => updateField("maxConcurrentOrders", text)}
                onDescriptionChange={(text) => updateField("description", text)}
              />
            </View>
          </ScrollView>

          {/* Save Button - Always at bottom in normal flow */}
          <View className="px-5 pt-4 bg-white border-t border-gray-100">
            <SaveButton onSave={handleSave} isLoading={isSubmitting} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

export default AddMenuItemScreen;
