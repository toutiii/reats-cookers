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
import { useUpdateCookerProfileMutation } from "@/store/api/cookerApi";
import { updateCooker } from "@/store/slices/auth";

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const { t } = useTranslation("account");

  // Get cooker and userId from auth state (already fetched in App.tsx)
  const cooker = useSelector((state: RootState) => state.auth.cooker);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [updateProfile, { isLoading: isSaving }] = useUpdateCookerProfileMutation();

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

  const handleSave = async () => {
    if (!userId) return;

    try {
      const response = await updateProfile({
        cookerId: userId,
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        siret: formData.siret,
        street_number: formData.streetNumber,
        street_name: formData.streetName,
        address_complement: formData.addressComplement || null,
        postal_code: formData.postalCode,
        town: formData.city,
      }).unwrap();

      // Update local store with returned data
      dispatch(updateCooker({
        firstname: response.data.personal_infos_section.firstname,
        lastname: response.data.personal_infos_section.lastname,
        email: response.data.personal_infos_section.email,
        phone: response.data.personal_infos_section.phone,
        siret: response.data.personal_infos_section.siret,
        streetNumber: response.data.address_section.street_number,
        streetName: response.data.address_section.street_name,
        addressComplement: response.data.address_section.address_complement,
        postalCode: response.data.address_section.postal_code,
        town: response.data.address_section.town,
      }));

      Alert.alert(
        "Modifications enregistrées",
        "Vos informations ont été mises à jour avec succès.",
        [{ text: "OK" }]
      );
    } catch {
      Alert.alert(
        "Erreur",
        "Une erreur est survenue lors de la mise à jour de vos informations.",
        [{ text: "OK" }]
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
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
                      onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                      placeholder={t("personalInfo.firstName")}
                      className="text-base"
                    />
                  </Input>
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
                      onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                      placeholder={t("personalInfo.lastName")}
                      className="text-base"
                    />
                  </Input>
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
                      onChangeText={(text) => setFormData({ ...formData, email: text })}
                      placeholder="exemple@email.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      className="text-base"
                    />
                  </Input>
                </FormControl>

                {/* Phone */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      {t("personalInfo.phone")}
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="call-outline" size={18} color="#10B981" />
                    </InputSlot>
                    <InputField
                      value={formData.phone}
                      onChangeText={(text) => setFormData({ ...formData, phone: text })}
                      placeholder="+33 6 12 34 56 78"
                      keyboardType="phone-pad"
                      className="text-base"
                    />
                  </Input>
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
                      onChangeText={(text) => setFormData({ ...formData, siret: text })}
                      placeholder="123 456 789 00012"
                      keyboardType="number-pad"
                      className="text-base"
                    />
                  </Input>
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
                        onChangeText={(text) => setFormData({ ...formData, streetNumber: text })}
                        placeholder="10"
                        keyboardType="number-pad"
                        className="text-base text-center"
                      />
                    </Input>
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
                        onChangeText={(text) => setFormData({ ...formData, streetName: text })}
                        placeholder="Rue de la Paix"
                        className="text-base"
                      />
                    </Input>
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
                      onChangeText={(text) => setFormData({ ...formData, addressComplement: text })}
                      placeholder="Bâtiment, étage, etc."
                      className="text-base"
                    />
                  </Input>
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
                        onChangeText={(text) => setFormData({ ...formData, postalCode: text })}
                        placeholder="75001"
                        keyboardType="number-pad"
                        className="text-base text-center"
                      />
                    </Input>
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
                        onChangeText={(text) => setFormData({ ...formData, city: text })}
                        placeholder="Paris"
                        className="text-base"
                      />
                    </Input>
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
