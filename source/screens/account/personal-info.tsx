import React, { useState } from "react";
import {
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

const PersonalInfoScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();

  const [formData, setFormData] = useState({
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronaldrichards@example.com",
    phone: "+111 1234 56 89",
    address: "123 Restaurant Street",
    city: "Paris",
    country: "France",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  });

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

  const handleSave = () => {
    Alert.alert(
      "Modifications enregistrées",
      "Vos informations ont été mises à jour avec succès.",
      [{ text: "OK" }]
    );
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
            <Text className="text-2xl font-bold text-gray-900">Personal Info</Text>
            <Text className="text-sm text-gray-500">Gérez vos informations</Text>
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
                    {formData.firstName[0] + formData.lastName[0]}
                  </AvatarFallbackText>
                  <AvatarImage source={{ uri: formData.avatar }} />
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
                  Informations personnelles
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
                      Prénom
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="person-outline" size={18} color="#3B82F6" />
                    </InputSlot>
                    <InputField
                      value={formData.firstName}
                      onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                      placeholder="Entrez votre prénom"
                      className="text-base"
                    />
                  </Input>
                </FormControl>

                {/* Last Name */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Nom
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="person-outline" size={18} color="#3B82F6" />
                    </InputSlot>
                    <InputField
                      value={formData.lastName}
                      onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                      placeholder="Entrez votre nom"
                      className="text-base"
                    />
                  </Input>
                </FormControl>

                {/* Email */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Email
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
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Téléphone
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
              </View>
            </View>

            {/* Address Section */}
            <View className="mb-5">
              <View className="px-1 mb-3">
                <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                  Adresse
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
                {/* Address */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Adresse
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="home-outline" size={18} color="#FF6347" />
                    </InputSlot>
                    <InputField
                      value={formData.address}
                      onChangeText={(text) => setFormData({ ...formData, address: text })}
                      placeholder="123 Rue de la Paix"
                      className="text-base"
                    />
                  </Input>
                </FormControl>

                {/* City */}
                <FormControl className="mb-4">
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Ville
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

                {/* Country */}
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-sm text-gray-700 font-semibold">
                      Pays
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input variant="outline" size="lg" className="rounded-2xl">
                    <InputSlot className="pl-4">
                      <Ionicons name="globe-outline" size={18} color="#14B8A6" />
                    </InputSlot>
                    <InputField
                      value={formData.country}
                      onChangeText={(text) => setFormData({ ...formData, country: text })}
                      placeholder="France"
                      className="text-base"
                    />
                  </Input>
                </FormControl>
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
              className="bg-primary-500 rounded-2xl py-4 flex-row items-center justify-center"
              style={{
                shadowColor: "#FF6347",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark-circle" size={22} color="#FFFFFF" />
              <Text className="text-white font-bold text-base ml-2">
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PersonalInfoScreen;
