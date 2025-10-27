import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ICountry } from "@/types";

import InputMultiSelectCity, { City } from "@/components/common/input-auto-complete";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Text } from "@/components/ui/text";
import { Register } from "@/types/auth";
import { StackNavigation } from "@/types/navigation";
import { registerValidationSchema } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { FormInputControlPhone } from "../../common/form-input-control-phone";
import { useTranslation } from "@/hooks/useTranslation";

const RegisterForm = () => {
  const { t } = useTranslation("auth");
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [242],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });
  const [error, setError] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCitySelected = (city: City) => {
    setSelectedCity(city);
    console.log("Ville sélectionnée dans le composant parent:", city);
  };

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerValidationSchema),
    defaultValues: {
      firstName: "Dave",
      lastName: "Glad",
      siret: "00000000000000",
      city: "Paris",
      phone: "0753790506",
    },
  });

  const onSubmit = async (data: Register) => {
    try {
      console.log("Données du formulaire:", data);
      // Simuler un délai d'API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigation.navigate("OTPScreen");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError("Erreur lors de l'inscription:");
    }
  };

  return (
    <VStack className="px-6 flex-1" space="lg">
      {/* Prénom Input */}
      <View>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.firstName} size="md" isDisabled={isSubmitting} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>{t("register.firstNameLabel")}</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder={t("register.firstNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.firstName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.firstName.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      {/* Nom Input */}
      <View>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.lastName} size="md" isDisabled={isSubmitting} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>{t("register.lastNameLabel")}</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder={t("register.lastNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.lastName && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.lastName.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      {/* SIRET Input */}
      <View>
        <Controller
          control={control}
          name="siret"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.siret} size="md" isDisabled={isSubmitting} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>{t("register.siretLabel")}</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder={t("register.siretPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="numeric" maxLength={14} />
              </Input>
              {errors.siret && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.siret.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      {/* Zone d'intervention Input */}
      <InputMultiSelectCity label={t("register.cityLabel")} placeholder={t("register.cityPlaceholder")} helperText={t("register.cityHelper")} />

      <FormInputControlPhone
        control={control}
        name="phone"
        error={errors.phone?.message}
        defaultValue={watch("phone")}
        label={t("register.phoneLabel")}
        placeholder={t("register.phonePlaceholder")}
        country={country}
        setCountry={setCountry}
        textInfo={t("register.phoneFormat")}
        isRequired={true}
        isDisabled={isSubmitting}
      />

      {error && (
        <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>{error}</AlertText>
        </Alert>
      )}

      {/* Register Button */}
      <Button size="xl" className="my-2" onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
        <ButtonText size="lg">{isSubmitting
          ? t("register.submittingButton")
          : t("register.submitButton")}</ButtonText>
      </Button>

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">{t("common:labels.or")}</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center mb-4">
        <Text className="text-base text-gray-500">{t("register.hasAccount")} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} disabled={isSubmitting}>
          <Text className="text-base text-primary-500 font-semibold">{t("register.loginLink")}</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default RegisterForm;
