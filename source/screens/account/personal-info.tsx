import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "@/components/common/back-button";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useUpdateCookerProfileMutation,
  useUpdateCookerPhotoMutation,
} from "@/store/api/cookerApi";
import { updateCooker } from "@/store/slices/auth";

// Validation helpers (Swagger-aligned)
const SIRET_RE = /^[0-9]{14}$/;
const POSTAL_CODE_RE = /^[0-9]{5}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const { t } = useTranslation("account");

  // Get cooker and userId from auth state (already fetched in App.tsx)
  const cooker = useSelector((state: RootState) => state.auth.cooker);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [updateProfile, { isLoading: isSavingProfile }] = useUpdateCookerProfileMutation();
  const [updatePhoto, { isLoading: isSavingPhoto }] = useUpdateCookerPhotoMutation();
  const isSaving = isSavingProfile || isSavingPhoto;

  type FormErrors = Partial<Record<
    "firstName" | "lastName" | "email" | "siret" | "streetNumber" | "streetName" | "addressComplement" | "postalCode" | "city",
    string
  >>;
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    siret: "",
    streetNumber: "",
    streetName: "",
    addressComplement: "",
    postalCode: "",
    city: "",
    avatar: "",
  });

  // Update form data when cooker data is available
  useEffect(() => {
    if (cooker) {
      setFormData({
        firstName: cooker.firstname || "",
        lastName: cooker.lastname || "",
        email: cooker.email || "",
        phone: cooker.phone || "",
        siret: cooker.siret || "",
        streetNumber: cooker.streetNumber || "",
        streetName: cooker.streetName || "",
        addressComplement: cooker.addressComplement || "",
        postalCode: cooker.postalCode || "",
        city: cooker.town || "",
        avatar: cooker.photo || "",
      });
    }
  }, [cooker]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        avatar: result.assets[0].uri,
      });
    }
  };

  const validateForm = (): FormErrors => {
    const next: FormErrors = {};

    // Required fields per Swagger CookerPATCHRequest
    if (!formData.firstName.trim()) next.firstName = "Le prénom est requis";
    else if (formData.firstName.length > 100) next.firstName = "Maximum 100 caractères";

    if (!formData.lastName.trim()) next.lastName = "Le nom est requis";
    else if (formData.lastName.length > 100) next.lastName = "Maximum 100 caractères";

    if (!formData.email.trim()) next.email = "L'email est requis";
    else if (!EMAIL_RE.test(formData.email)) next.email = "Format d'email invalide";
    else if (formData.email.length > 254) next.email = "Maximum 254 caractères";

    if (!formData.siret.trim()) next.siret = "Le SIRET est requis";
    else if (!SIRET_RE.test(formData.siret.replace(/\s/g, "")))
      next.siret = "14 chiffres requis";

    if (!formData.streetNumber.trim()) next.streetNumber = "Le numéro est requis";
    else if (formData.streetNumber.length > 10) next.streetNumber = "Maximum 10 caractères";

    if (!formData.streetName.trim()) next.streetName = "L'adresse est requise";
    else if (formData.streetName.length > 100) next.streetName = "Maximum 100 caractères";

    if (formData.addressComplement.length > 512)
      next.addressComplement = "Maximum 512 caractères";

    if (!formData.postalCode.trim()) next.postalCode = "Le code postal est requis";
    else if (!POSTAL_CODE_RE.test(formData.postalCode))
      next.postalCode = "5 chiffres requis";

    if (!formData.city.trim()) next.city = "La ville est requise";
    else if (formData.city.length > 100) next.city = "Maximum 100 caractères";

    return next;
  };

  const handleSave = async () => {
    if (!userId) return;

    const validation = validateForm();
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      Alert.alert(
        "Formulaire invalide",
        "Vérifie les champs en rouge avant d'enregistrer.",
        [{ text: "OK" }],
      );
      return;
    }

    try {
      // PATCH /cookers/{id}/ — phone is NOT mutable per Swagger, so we don't send it.
      // The auth slice's matchFulfilled reducer syncs state.cooker automatically.
      await updateProfile({
        cookerId: userId,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        siret: formData.siret.replace(/\s/g, ""),
        street_number: formData.streetNumber,
        street_name: formData.streetName,
        address_complement: formData.addressComplement || null,
        postal_code: formData.postalCode,
        town: formData.city,
      }).unwrap();

      // PATCH /cookers/{id}/photo/ — only if a NEW local image was picked
      let uploadedPhotoUrl: string | undefined;
      const isLocalPhoto =
        !!formData.avatar &&
        !formData.avatar.startsWith("http://") &&
        !formData.avatar.startsWith("https://");
      if (isLocalPhoto) {
        try {
          const photoResponse = await updatePhoto({
            cookerId: userId,
            photo: formData.avatar,
          }).unwrap();
          uploadedPhotoUrl =
            (photoResponse?.data as any)?.personal_infos_section?.photo ??
            (photoResponse?.data as any)?.photo;
        } catch (e) {
          console.warn("[UpdateCookerPhoto] failed:", e);
          Alert.alert(
            "Photo",
            "Le profil a été mis à jour, mais l'envoi de la photo a échoué.",
          );
        }
      }

      // The auth slice's `updateCookerProfile.matchFulfilled` extra reducer
      // already sync'd state.cooker via mapProfileResponse. We only need to
      // dispatch a manual update for the freshly uploaded photo URL (since
      // the photo PATCH response goes through the same matcher anyway, but we
      // surface it here defensively in case backend doesn't return it).
      if (uploadedPhotoUrl) {
        dispatch(updateCooker({ photo: uploadedPhotoUrl }));
      }

      // Reflect uploaded URL in local form state (so subsequent saves don't re-upload)
      if (uploadedPhotoUrl) {
        setFormData((prev) => ({ ...prev, avatar: uploadedPhotoUrl! }));
      }

      Alert.alert(
        "Modifications enregistrées",
        "Vos informations ont été mises à jour avec succès.",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      // RTK Query errors can be class-like objects with non-enumerable props,
      // which JSON.stringify renders as `{}`. Extract fields explicitly.
      const status = error?.status;
      const data = error?.data;
      const message =
        error?.error ??
        error?.message ??
        (typeof error === "string" ? error : undefined);
      const stack = error instanceof Error ? error.stack : undefined;

      // Print the raw error too — gives access to non-enumerable props in the dev console
      console.error("[UpdateCookerProfile] raw error:", error);
      console.error("[UpdateCookerProfile] error:", {
        status,
        data,
        message,
        stack,
        keys: error && typeof error === "object" ? Object.keys(error) : undefined,
      });

      // Surface backend validation messages when available
      let backendDetail: string | undefined;
      if (data && typeof data === "object") {
        const apiError = (data as any)?.error;
        if (apiError?.message) backendDetail = String(apiError.message);
        else if (apiError?.details) backendDetail = JSON.stringify(apiError.details);
        else if (typeof (data as any)?.detail === "string") backendDetail = (data as any).detail;
      }

      Alert.alert(
        "Erreur",
        backendDetail ??
          message ??
          "Une erreur est survenue lors de la mise à jour de vos informations.",
        [{ text: "OK" }],
      );
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => console.log("Account deleted") },
      ]
    );
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center">
          <BackButton />
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">{t("personalInfo.title")}</Text>
            <Text className="text-sm text-gray-500">{t("menu.personalInfoDesc")}</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios"
? "padding"
: "height"}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
            {/* Avatar Section */}
            <View
              className="bg-white rounded-2xl p-6 mb-5 items-center"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <View className="relative mb-3">
                <Avatar size="2xl" className="border-4 border-primary-100">
                  <AvatarFallbackText>
                    {(formData.firstName?.[0] || "") + (formData.lastName?.[0] || "")}
                  </AvatarFallbackText>
                  {formData.avatar && <AvatarImage source={{ uri: formData.avatar }} />}
                </Avatar>
                <TouchableOpacity
                  onPress={pickImage}
                  className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-3"
                  style={{
                    shadowColor: "#FF6347",
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 5,
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name="camera" size={18} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {formData.firstName} {formData.lastName}
              </Text>
              <Text className="text-sm text-gray-500">Appuyez sur l'icône pour changer</Text>
            </View>

            {/* Personal Information Section */}
            <View className="mb-5">
              <View className="px-1 mb-3">
                <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  {t("personalInfo.title")}
                </Text>
              </View>
              <View
                className="bg-white rounded-2xl p-5"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                {/* First Name */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.firstName")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="person-outline" size={18} color="#3B82F6" />
                    </InputSlot>
                    <InputField
                      value={formData.firstName}
                      onChangeText={(text) => {
                        setFormData({ ...formData, firstName: text });
                        if (errors.firstName) setErrors((p) => ({ ...p, firstName: undefined }));
                      }}
                      placeholder={t("personalInfo.firstName")}
                      className="text-base"
                    />
                  </Input>
                  {errors.firstName && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.firstName}</Text>
                  )}
                </FormControl>

                {/* Last Name */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.lastName")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="person-outline" size={18} color="#3B82F6" />
                    </InputSlot>
                    <InputField
                      value={formData.lastName}
                      onChangeText={(text) => {
                        setFormData({ ...formData, lastName: text });
                        if (errors.lastName) setErrors((p) => ({ ...p, lastName: undefined }));
                      }}
                      placeholder={t("personalInfo.lastName")}
                      className="text-base"
                    />
                  </Input>
                  {errors.lastName && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.lastName}</Text>
                  )}
                </FormControl>

                {/* Email */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.email")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="mail-outline" size={18} color="#8B5CF6" />
                    </InputSlot>
                    <InputField
                      value={formData.email}
                      onChangeText={(text) => {
                        setFormData({ ...formData, email: text });
                        if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="exemple@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="text-base"
                    />
                  </Input>
                  {errors.email && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.email}</Text>
                  )}
                </FormControl>

                {/* Phone — read-only (immuable au PATCH per Swagger) */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.phone")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input
                    variant="outline"
                    size="lg"
                    className="rounded-2xl bg-gray-50"
                    isDisabled
                  >
                    <InputSlot className="pl-4">
                      <Ionicons name="call-outline" size={18} color="#9CA3AF" />
                    </InputSlot>
                    <InputField
                      value={formData.phone}
                      editable={false}
                      placeholder="+33 6 12 34 56 78"
                      className="text-base text-gray-500"
                    />
                    <InputSlot className="pr-4">
                      <Ionicons name="lock-closed-outline" size={16} color="#9CA3AF" />
                    </InputSlot>
                  </Input>
                  <Text className="text-xs text-gray-400 mt-1 ml-2">
                    Le téléphone n'est pas modifiable depuis cet écran.
                  </Text>
                </FormControl>

                {/* SIRET */}
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.siret")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="business-outline" size={18} color="#F59E0B" />
                    </InputSlot>
                    <InputField
                      value={formData.siret}
                      onChangeText={(text) => {
                        setFormData({ ...formData, siret: text });
                        if (errors.siret) setErrors((p) => ({ ...p, siret: undefined }));
                      }}
                      placeholder="12345678900012"
                      keyboardType="number-pad"
                      maxLength={14}
                      className="text-base"
                    />
                  </Input>
                  {errors.siret && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.siret}</Text>
                  )}
                </FormControl>
              </View>
            </View>

            {/* Address Section */}
            <View className="mb-5">
              <View className="px-1 mb-3">
                <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  {t("personalInfo.address")}
                </Text>
              </View>
              <View
                className="bg-white rounded-2xl p-5"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                {/* Street Number & Name */}
                <View className="flex-row gap-3 mb-4">
                  <FormControl className="w-24">
                    <FormControlLabel>
                      <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                        N°
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="rounded-2xl">
                      <InputField
                        value={formData.streetNumber}
                        onChangeText={(text) => {
                          setFormData({ ...formData, streetNumber: text });
                          if (errors.streetNumber) setErrors((p) => ({ ...p, streetNumber: undefined }));
                        }}
                        placeholder="10"
                        keyboardType="number-pad"
                        maxLength={10}
                        className="text-base text-center"
                      />
                    </Input>
                    {errors.streetNumber && (
                      <Text className="text-red-500 text-xs mt-1 ml-2">{errors.streetNumber}</Text>
                    )}
                  </FormControl>
                  <FormControl className="flex-1">
                    <FormControlLabel>
                      <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                        {t("personalInfo.address")}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="rounded-2xl">
                      <InputSlot className="pl-4">
                        <Ionicons name="home-outline" size={18} color="#FF6347" />
                      </InputSlot>
                      <InputField
                        value={formData.streetName}
                        onChangeText={(text) => {
                          setFormData({ ...formData, streetName: text });
                          if (errors.streetName) setErrors((p) => ({ ...p, streetName: undefined }));
                        }}
                        placeholder="Rue de la Paix"
                        className="text-base"
                      />
                    </Input>
                    {errors.streetName && (
                      <Text className="text-red-500 text-xs mt-1 ml-2">{errors.streetName}</Text>
                    )}
                  </FormControl>
                </View>

                {/* Address Complement */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Complément d'adresse
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="business-outline" size={18} color="#6366F1" />
                    </InputSlot>
                    <InputField
                      value={formData.addressComplement}
                      onChangeText={(text) => {
                        setFormData({ ...formData, addressComplement: text });
                        if (errors.addressComplement) setErrors((p) => ({ ...p, addressComplement: undefined }));
                      }}
                      placeholder="Bâtiment, étage, etc."
                      maxLength={512}
                      className="text-base"
                    />
                  </Input>
                  {errors.addressComplement && (
                    <Text className="text-red-500 text-xs mt-1 ml-2">{errors.addressComplement}</Text>
                  )}
                </FormControl>

                {/* Postal Code & City */}
                <View className="flex-row gap-3">
                  <FormControl className="w-28">
                    <FormControlLabel>
                      <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                        {t("personalInfo.postalCode")}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="rounded-2xl">
                      <InputField
                        value={formData.postalCode}
                        onChangeText={(text) => {
                          setFormData({ ...formData, postalCode: text.replace(/[^0-9]/g, "") });
                          if (errors.postalCode) setErrors((p) => ({ ...p, postalCode: undefined }));
                        }}
                        placeholder="75001"
                        keyboardType="number-pad"
                        maxLength={5}
                        className="text-base text-center"
                      />
                    </Input>
                    {errors.postalCode && (
                      <Text className="text-red-500 text-xs mt-1 ml-2">{errors.postalCode}</Text>
                    )}
                  </FormControl>
                  <FormControl className="flex-1">
                    <FormControlLabel>
                      <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                        {t("personalInfo.city")}
                      </FormControlLabelText>
                    </FormControlLabel>
                    <Input variant="outline" size="lg" className="rounded-2xl">
                      <InputSlot className="pl-4">
                        <Ionicons name="location-outline" size={18} color="#F59E0B" />
                      </InputSlot>
                      <InputField
                        value={formData.city}
                        onChangeText={(text) => {
                          setFormData({ ...formData, city: text });
                          if (errors.city) setErrors((p) => ({ ...p, city: undefined }));
                        }}
                        placeholder="Paris"
                        className="text-base"
                      />
                    </Input>
                    {errors.city && (
                      <Text className="text-red-500 text-xs mt-1 ml-2">{errors.city}</Text>
                    )}
                  </FormControl>
                </View>
              </View>
            </View>

            {/* Danger Zone */}
            <View className="mb-8">
              <View className="px-1 mb-3">
                <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Zone de danger
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleDeleteAccount}
                className="bg-white rounded-2xl p-5 flex-row items-center"
                style={{
                  shadowColor: "#EF4444",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 2,
                  borderWidth: 1,
                  borderColor: "#FEE2E2",
                }}
                activeOpacity={0.7}
              >
                <View className="w-11 h-11 bg-red-50 rounded-xl items-center justify-center mr-3">
                  <Ionicons name="trash-outline" size={22} color="#EF4444" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-bold text-red-500 mb-0.5">
                    Supprimer le compte
                  </Text>
                  <Text className="text-xs text-gray-500">
                    Effacer toutes vos données définitivement
                  </Text>
                </View>
                <Ionicons name="chevron-forward" color="#EF4444" size={18} />
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Save Button */}
          <View className="px-5 pb-4 mb-6">
            <TouchableOpacity
              onPress={handleSave}
              disabled={isSaving}
              className={`rounded-2xl py-4 flex-row items-center justify-center ${isSaving ? "bg-gray-400" : "bg-primary-500"}`}
              style={{
                shadowColor: "#FF6347",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
              activeOpacity={0.8}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              )}
              <Text className="text-white font-bold text-base ml-2">
                {isSaving
                  ? "Enregistrement..."
                  : t("personalInfo.save")}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PersonalInfoScreen;
