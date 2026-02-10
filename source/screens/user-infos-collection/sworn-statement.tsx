import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from "@/components/ui/checkbox";
import { FormControl, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from "@/components/ui/radio";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useImagePicker from "@/hooks/useImagePicker";
import { RootState } from "@/store";
import { useSubmitAttestationMutation } from "@/store/api/documentsApi";
import type { BusinessDocumentType } from "@/store/api/types";
import { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerAsset } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActionSheetIOS,
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

interface DocumentUploadSectionProps {
  title: string;
  description: string;
  image: ImagePickerAsset | null;
  onUpload: () => void;
  loading?: boolean;
  testID?: string;
}

const ATTESTATION_CLAUSES = [
  "J'ai régulièrement souscrit toutes les déclarations auprès des administrations et organismes fiscaux et m'engage à porter à leur connaissance toutes les modifications qui pourraient intervenir au cours d'exécution du contrat. En outre, je respecterai scrupuleusement les dispositions légales réglementaires et conventionnelles en vigueur.",
  "Je suis à jour du paiement des salaires, charges sociales, cotisations, impôts directs et indirects. Je réglerai pendant l'exécution du marché tous les salaires, charges sociales, cotisations, impôts directs et indirects. Je m'engage à en justifier à première demande.",
  "Les travaux objets du présent contrat seront réalisés par des salariés employés régulièrement au regard des articles L143-3 et 5 et L620-3 du Code du Travail français.",
  "De manière générale, mes salariés n'interviendront pas dans des conditions contraires à la législation du travail, de l'hygiène et de la sécurité.",
  "Je n'ai pas fait l'objet, au cours des cinq dernières années, d'une condamnation inscrite au bulletin N°2 du Casier Judiciaire pour les infractions visées aux articles L324-9, L324-10, L341-6 et L125-1 et L125-3 du Code du Travail.",
  "Je certifie que les salariés de nationalité étrangère éventuellement employés seront tous autorisés à exercer une activité professionnelle en France.",
  "Je suis à jour de mes obligations en matière d'impôts locaux, de taxes professionnelles, de droits d'enregistrement et de taxes sur les salaires.",
];

const AttestationHonneurScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();
  const { cooker } = useSelector((state: RootState) => state.auth);

  // Form fields
  const [signatoryName, setSignatoryName] = useState(
    cooker ? `${cooker.firstname} ${cooker.lastname}` : ""
  );
  const [companyName, setCompanyName] = useState("");
  const [signatureCity, setSignatureCity] = useState(cooker?.town || "");
  const [signatureDate, setSignatureDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );

  const [businessDocType, setBusinessDocType] = useState<BusinessDocumentType>("kbis");
  const [attestationAccepted, setAttestationAccepted] = useState(false);

  const [submitAttestation, { isLoading: isSubmitting }] = useSubmitAttestationMutation();

  const {
    selectedImage: businessDocImage,
    loading: businessDocLoading,
    error: businessDocError,
    takePicture: takeBusinessDocPicture,
    pickImage: pickBusinessDocImage,
    clearImage: _clearBusinessDocImage,
  } = useImagePicker();

  const {
    selectedImage: rcInsuranceImage,
    loading: rcInsuranceLoading,
    error: rcInsuranceError,
    takePicture: takeRcInsurancePicture,
    pickImage: pickRcInsuranceImage,
    clearImage: _clearRcInsuranceImage,
  } = useImagePicker();

  const canSubmit =
    !!businessDocImage &&
    !!rcInsuranceImage &&
    attestationAccepted &&
    !!signatoryName.trim() &&
    !!companyName.trim() &&
    !!signatureCity.trim() &&
    !isSubmitting;

  useEffect(() => {
    if (businessDocError) {
      Alert.alert("Erreur", businessDocError);
    }
    if (rcInsuranceError) {
      Alert.alert("Erreur", rcInsuranceError);
    }
  }, [businessDocError, rcInsuranceError]);

  const handleUploadPress = useCallback(
    (type: "business" | "insurance") => {
      const takePicture =
        type === "business" ? takeBusinessDocPicture : takeRcInsurancePicture;
      const pickImage =
        type === "business" ? pickBusinessDocImage : pickRcInsuranceImage;

      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Annuler", "Prendre une photo", "Choisir depuis la galerie"],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              takePicture();
            } else if (buttonIndex === 2) {
              pickImage();
            }
          }
        );
      } else {
        Alert.alert("Choisir une option", "Comment souhaitez-vous ajouter une photo ?", [
          { text: "Annuler", style: "cancel" },
          { text: "Prendre une photo", onPress: () => takePicture() },
          { text: "Choisir depuis la galerie", onPress: () => pickImage() },
        ]);
      }
    },
    [takeBusinessDocPicture, pickBusinessDocImage, takeRcInsurancePicture, pickRcInsuranceImage]
  );

  const handleSubmit = useCallback(async () => {
    navigation.push("DashboardScreen");
    if (!canSubmit || !cooker?.id || !businessDocImage || !rcInsuranceImage) return;

    try {
      const businessDocBlob = await fetch(businessDocImage.uri).then((r) => r.blob());
      const rcInsuranceBlob = await fetch(rcInsuranceImage.uri).then((r) => r.blob());

      await submitAttestation({
        cooker_id: cooker.id,
        business_document_type: businessDocType,
        business_document: businessDocBlob,
        rc_insurance_document: rcInsuranceBlob,
        attestation_accepted: attestationAccepted,
      }).unwrap();

      Alert.alert(
        "Attestation soumise",
        "Votre attestation sur l'honneur et vos documents ont été soumis avec succès.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la soumission.");
    }
  }, [
    canSubmit,
    cooker?.id,
    businessDocImage,
    rcInsuranceImage,
    businessDocType,
    attestationAccepted,
    submitAttestation,
    navigation,
  ]);

  const isLoading = businessDocLoading || rcInsuranceLoading || isSubmitting;

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />

        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-4">
            {/* Header */}
            <Box className="pt-4 pb-6">
              <Heading className="mb-2 text-center" size="xl">
                ATTESTATION SUR L'HONNEUR
              </Heading>
            </Box>

            <VStack space="lg">
              {/* Signatory Information */}
              <Box className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-lg font-semibold mb-4">Informations du signataire</Text>

                <VStack space="md">
                  <FormControl isRequired>
                    <FormControlLabel>
                      <FormControlLabelText>Je soussigné(e)</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="lg" variant="rounded" className="mt-1">
                      <InputField
                        placeholder="Nom et prénom"
                        value={signatoryName}
                        onChangeText={setSignatoryName}
                      />
                    </Input>
                  </FormControl>

                  <FormControl isRequired>
                    <FormControlLabel>
                      <FormControlLabelText>Agissant pour le compte de</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="lg" variant="rounded" className="mt-1">
                      <InputField
                        placeholder="Nom de la société / Raison sociale"
                        value={companyName}
                        onChangeText={setCompanyName}
                      />
                    </Input>
                  </FormControl>
                </VStack>
              </Box>

              {/* Attestation Clauses */}
              <Box className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <Text className="text-lg font-semibold mb-3">
                  Certifie et atteste sur l'honneur que :
                </Text>

                <VStack space="md">
                  {ATTESTATION_CLAUSES.map((clause, index) => (
                    <HStack key={index} space="sm" className="items-start">
                      <Text className="text-primary-500 font-bold">{index + 1}.</Text>
                      <Text className="text-sm text-gray-700 flex-1 leading-5 text-justify">{clause}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* Business Document Type Selection */}
              <Box className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-lg font-semibold mb-3">Documents justificatifs</Text>
                <Text className="text-sm text-gray-500 mb-4">
                  Sélectionnez et téléchargez les documents requis
                </Text>

                <RadioGroup
                  value={businessDocType}
                  onChange={(value) => setBusinessDocType(value as BusinessDocumentType)}
                >
                  <VStack space="md">
                    <Radio value="kbis">
                      <RadioIndicator>
                        <RadioIcon
                          as={() => <View className="w-2 h-2 rounded-full bg-primary-500" />}
                        />
                      </RadioIndicator>
                      <RadioLabel className="ml-2">
                        <VStack>
                          <Text className="font-medium">Extrait Kbis</Text>
                          <Text className="text-sm text-gray-500">Moins de 3 mois (Société)</Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>

                    <Radio value="insee">
                      <RadioIndicator>
                        <RadioIcon
                          as={() => <View className="w-2 h-2 rounded-full bg-primary-500" />}
                        />
                      </RadioIndicator>
                      <RadioLabel className="ml-2">
                        <VStack>
                          <Text className="font-medium">Inscription INSEE</Text>
                          <Text className="text-sm text-gray-500">À jour (Auto-entrepreneur)</Text>
                        </VStack>
                      </RadioLabel>
                    </Radio>
                  </VStack>
                </RadioGroup>
              </Box>

              {/* Business Document Upload */}
              <DocumentUploadSection
                title={
                  businessDocType === "kbis" ? "Extrait Kbis" : "Inscription INSEE"
                }
                description={
                  businessDocType === "kbis"
                    ? "Téléchargez votre extrait Kbis de moins de 3 mois"
                    : "Téléchargez votre avis de situation INSEE à jour"
                }
                image={businessDocImage}
                onUpload={() => handleUploadPress("business")}
                loading={businessDocLoading}
                testID="upload-business-doc"
              />

              {/* RC Insurance Document Upload */}
              <DocumentUploadSection
                title="Attestation d'assurance RC"
                description="Téléchargez votre attestation d'assurance responsabilité civile professionnelle"
                image={rcInsuranceImage}
                onUpload={() => handleUploadPress("insurance")}
                loading={rcInsuranceLoading}
                testID="upload-rc-insurance"
              />

              {/* Signature Section */}
              <Box className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-lg font-semibold mb-4">Signature</Text>

                <HStack space="md">
                  <FormControl isRequired className="flex-1">
                    <FormControlLabel>
                      <FormControlLabelText>Fait à</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="lg" variant="rounded" className="mt-1">
                      <InputField
                        placeholder="Ville"
                        value={signatureCity}
                        onChangeText={setSignatureCity}
                      />
                    </Input>
                  </FormControl>

                  <FormControl isRequired className="flex-1">
                    <FormControlLabel>
                      <FormControlLabelText>Le</FormControlLabelText>
                    </FormControlLabel>
                    <Input size="lg" variant="rounded" className="mt-1">
                      <InputField
                        placeholder="Date"
                        value={signatureDate}
                        onChangeText={setSignatureDate}
                      />
                    </Input>
                  </FormControl>
                </HStack>
              </Box>

              {/* Attestation Checkbox */}
              <Box className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <Checkbox
                  value="attestation"
                  isChecked={attestationAccepted}
                  onChange={(isChecked) => setAttestationAccepted(isChecked)}
                >
                  <CheckboxIndicator className="mr-3">
                    <CheckboxIcon as={() => <Feather name="check" size={14} color="#fff" />} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="flex-1">
                    <Text className="text-sm text-gray-700 leading-5">
                      J'atteste sur l'honneur l'exactitude des informations ci-dessus et
                      l'authenticité des documents fournis. Je reconnais que toute fausse
                      déclaration peut entraîner des poursuites judiciaires et la suspension
                      immédiate de mon compte.
                    </Text>
                  </CheckboxLabel>
                </Checkbox>
              </Box>
            </VStack>
          </View>
        </ScrollView>

        {/* Submit Button */}
        <Box
          className="px-6 pb-4 bg-background-0 absolute bottom-0 py-4 left-0 right-0"
          style={{
            paddingBottom: Math.max(insets.bottom, 16),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Button
            size="xl"
            disabled={!canSubmit}
            onPress={handleSubmit}
            accessibilityLabel="Signer et soumettre l'attestation"
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <ButtonText className="text-white text-lg font-medium">
                Signer et soumettre
              </ButtonText>
            )}
          </Button>
        </Box>
      </SafeAreaView>
    </ThemedView>
  );
};

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  title,
  description,
  image,
  onUpload,
  loading = false,
  testID,
}) => {
  const uploaded = !!image;

  return (
    <Box
      className="border border-dashed border-gray-300 rounded-xl p-4"
      style={{ borderWidth: 1, borderStyle: "dashed" }}
      testID={testID}
    >
      <VStack space="md" className="items-center">
        <VStack className="w-full">
          <Text className="text-lg font-semibold text-center">{title}</Text>
          <Text className="text-sm text-gray-500 text-center mt-1">{description}</Text>
        </VStack>

        {uploaded ? (
          <VStack space="md" className="w-full items-center">
            <Box className="rounded-xl overflow-hidden" style={{ width: "100%", height: 180 }}>
              <Image
                source={{ uri: image.uri }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </Box>

            <Pressable onPress={onUpload} testID={`${testID}-change-button`}>
              {({ pressed }) => (
                <HStack
                  className={`items-center justify-center px-5 py-2.5 rounded-full border bg-rose-50 border-rose-300 ${
                    pressed ? "opacity-80" : "opacity-100"
                  }`}
                >
                  <Text className="text-rose-500 font-medium mr-2">Modifier</Text>
                  <View className="w-5 h-5 rounded-full bg-rose-500 items-center justify-center">
                    <Feather name="edit-2" size={10} color="#fff" />
                  </View>
                </HStack>
              )}
            </Pressable>
          </VStack>
        ) : (
          <Pressable onPress={onUpload} disabled={loading} testID={`${testID}-button`}>
            {({ pressed }) => (
              <HStack
                className={`items-center justify-center px-5 py-3 rounded-full border bg-white border-primary-300 ${
                  pressed ? "opacity-80" : "opacity-100"
                }`}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#f87171" />
                ) : (
                  <>
                    <Feather name="upload" size={20} color="#f87171" />
                    <Text className="text-primary-500 font-medium ml-2">Télécharger</Text>
                  </>
                )}
              </HStack>
            )}
          </Pressable>
        )}
      </VStack>
    </Box>
  );
};

export default AttestationHonneurScreen;
