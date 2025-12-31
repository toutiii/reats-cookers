import { Button, ButtonText } from "@/components/ui/button";
import { FormControl, FormControlError, FormControlErrorIcon, FormControlErrorText, FormControlLabel, FormControlLabelText } from "@/components/ui/form-control";
import { AlertCircleIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { ICountry } from "@/types";

import InputMultiSelectCity from "@/components/common/input-auto-complete";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Text } from "@/components/ui/text";
import { StackNavigation } from "@/types/navigation";
import { registerValidationSchema, RegisterFormData } from "@/utils/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { FormInputControlPhone } from "../../common/form-input-control-phone";
import { useTranslation } from "@/hooks/useTranslation";
import { useRegisterCookerMutation } from "@/store/api/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const RegisterForm = () => {
  const { t } = useTranslation("auth");
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [33],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const [registerCooker, { isLoading }] = useRegisterCookerMutation();
  const { error: authError, status } = useSelector((state: RootState) => state.auth);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerValidationSchema) as any,
    defaultValues: {
      firstname: "",
      lastname: "",
      siret: "",
      phone: "",
      postal_code: "",
      street_name: "",
      street_number: "",
      town: "",
      address_complement: "",
    },
  });

  // Navigate to OTP screen when registration is successful
  useEffect(() => {
    if (status === "otp_pending") {
      navigation.navigate("OTPScreen");
    }
  }, [status, navigation]);

  const onSubmit = async (data: RegisterFormData) => {
    const fullPhone = `+${country.calling_codes[0]}${data.phone}`;
    await registerCooker({
      ...data,
      phone: fullPhone,
    });
  };

  return (
    <VStack className="px-6 flex-1" space="lg">
      {/* First Name Input */}
      <View>
        <Controller
          control={control}
          name="firstname"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.firstname} size="md" isDisabled={isLoading} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>{t("register.firstNameLabel")}</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder={t("register.firstNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.firstname && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.firstname.message}</FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
          )}
        />
      </View>

      {/* Last Name Input */}
      <View>
        <Controller
          control={control}
          name="lastname"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl isInvalid={!!errors.lastname} size="md" isDisabled={isLoading} isReadOnly={false} isRequired={true}>
              <FormControlLabel>
                <FormControlLabelText>{t("register.lastNameLabel")}</FormControlLabelText>
              </FormControlLabel>
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder={t("register.lastNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
              </Input>
              {errors.lastname && (
                <FormControlError>
                  <FormControlErrorIcon as={AlertCircleIcon} />
                  <FormControlErrorText>{errors.lastname.message}</FormControlErrorText>
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
            <FormControl isInvalid={!!errors.siret} size="md" isDisabled={isLoading} isReadOnly={false} isRequired={true}>
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

      {/* City/Area Input */}
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
        isDisabled={isLoading}
      />

      {authError && (
        <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>{authError}</AlertText>
        </Alert>
      )}

      {/* Register Button */}
      <Button size="xl" className="my-2" onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
        {isLoading
          ? <ActivityIndicator size="small" color="white" />
          : <ButtonText size="lg">{t("register.submitButton")}</ButtonText>}
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
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} disabled={isLoading}>
          <Text className="text-base text-primary-500 font-semibold">{t("register.loginLink")}</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default RegisterForm;
