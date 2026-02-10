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
import { ActivityIndicator, Alert as RNAlert, TouchableOpacity, View } from "react-native";
import { FormInputControlPhone } from "../../common/form-input-control-phone";
import { useTranslation } from "@/hooks/useTranslation";
import { useRegisterCookerMutation } from "@/store/api/authApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clearError } from "@/store/slices/auth";
import type { ApiErrorResponse } from "@/store/api/types";
import { useToast, Toast, ToastTitle } from "@/components/ui/toast";
import { getAuthErrorKey, getErrorKeyFromCode } from "@/utils/getAuthErrorMessage";

const RegisterForm = () => {
  const { t } = useTranslation(["auth", "validation"]);
  const navigation = useNavigation<StackNavigation>();
  const dispatch = useDispatch();
  const toast = useToast();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [33],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const [registerCooker, { isLoading }] = useRegisterCookerMutation();
  const { error: authError, errorCode, status, authFlow } = useSelector((state: RootState) => state.auth);

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const {
    control,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: "onTouched",
    resolver: yupResolver(registerValidationSchema) as any,
    defaultValues: {
      email: "",
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

  // Clear any stale errors on mount
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Navigate to OTP screen when registration is successful
  useEffect(() => {
    if (status === "otp_pending" && authFlow === "register") {
      navigation.navigate("OTPScreen");
    }
  }, [status, authFlow, navigation]);

  const onSubmit = async (data: RegisterFormData) => {
    // Clean phone: remove spaces and check if already has country code
    const cleanPhone = data.phone.replace(/\s/g, "");
    const fullPhone = cleanPhone.startsWith("+")
      ? cleanPhone
      : `+${country.calling_codes[0]}${cleanPhone.replace(/^0/, "")}`;
    try {
      const { address_complement, ...rest } = data;
      await registerCooker({
        ...rest,
        ...(address_complement ? { address_complement } : {}),
        phone: fullPhone,
      }).unwrap();
    } catch (error) {
      const apiError = error as { data?: ApiErrorResponse };

      // Check if user already exists — redirect to login
      if (apiError?.data?.error?.code === "USER_ALREADY_EXISTS") {
        dispatch(clearError());
        RNAlert.alert(
          t("auth:register.phoneExistsTitle"),
          t("auth:register.phoneExistsMessage"),
          [
            { text: t("auth:register.phoneExistsCancel"), style: "cancel" },
            {
              text: t("auth:register.phoneExistsLogin"),
              onPress: () => navigation.navigate("LoginScreen"),
            },
          ]
        );
        return;
      }

      // Check if phone already exists — redirect to login
      if (apiError?.data?.error?.details?.phone) {
        const phoneErrors = apiError.data.error.details.phone as string[];
        const phoneAlreadyExists = phoneErrors.some(
          (msg) => msg.toLowerCase().includes("already exists")
        );

        if (phoneAlreadyExists) {
          dispatch(clearError());
          RNAlert.alert(
            t("auth:register.phoneExistsTitle"),
            t("auth:register.phoneExistsMessage"),
            [
              { text: t("auth:register.phoneExistsCancel"), style: "cancel" },
              {
                text: t("auth:register.phoneExistsLogin"),
                onPress: () => navigation.navigate("LoginScreen"),
              },
            ]
          );
          return;
        }
      }

      // Show user-friendly error toast
      const errorKey = getAuthErrorKey(error);
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={`toast-${id}`} action="error" variant="solid">
            <ToastTitle>{t(errorKey)}</ToastTitle>
          </Toast>
        ),
      });
    }
  };

  const handleNextStep = async () => {
    const isValid = await trigger(["firstname", "lastname", "email", "siret", "phone"]);
    if (isValid) setCurrentStep(2);
  };

  return (
    <VStack className="px-6 flex-1" space="lg">
      {/* Progress indicator */}
      <View className="flex-row items-center justify-center mb-4">
        {/* Step 1 circle */}
        <View className="items-center">
          <View className={`w-9 h-9 rounded-full items-center justify-center ${
            currentStep >= 1 ? "bg-primary-500" : "bg-white border-2 border-gray-300"
          }`}>
            <Text className={`text-sm font-bold ${currentStep >= 1 ? "text-white" : "text-gray-400"}`}>1</Text>
          </View>
          <Text className={`text-xs mt-1 ${currentStep >= 1 ? "text-primary-500 font-semibold" : "text-gray-400"}`}>
            {t("auth:register.step1Title")}
          </Text>
        </View>

        {/* Connecting line */}
        <View className={`h-0.5 w-20 mx-1 mb-4 ${currentStep >= 2 ? "bg-primary-500" : "bg-gray-300"}`} />

        {/* Step 2 circle */}
        <View className="items-center">
          <View className={`w-9 h-9 rounded-full items-center justify-center ${
            currentStep >= 2 ? "bg-primary-500" : "bg-white border-2 border-gray-300"
          }`}>
            <Text className={`text-sm font-bold ${currentStep >= 2 ? "text-white" : "text-gray-400"}`}>2</Text>
          </View>
          <Text className={`text-xs mt-1 ${currentStep >= 2 ? "text-primary-500 font-semibold" : "text-gray-400"}`}>
            {t("auth:register.step2Title")}
          </Text>
        </View>
      </View>

      {/* Step subtitle */}
      <Text className="text-sm text-gray-500 mb-2">
        {t(currentStep === 1 ? "auth:register.step1Subtitle" : "auth:register.step2Subtitle")}
      </Text>

      {currentStep === 1 && (
        <>
          {/* First Name Input */}
          <View>
            <Controller
              control={control}
              name="firstname"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl isInvalid={!!errors.firstname} size="md" isDisabled={isLoading} isReadOnly={false} isRequired={true}>
                  <FormControlLabel>
                    <FormControlLabelText>{t("auth:register.firstNameLabel")}</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size={"lg"} variant="rounded">
                    <InputField type="text" placeholder={t("auth:register.firstNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
                  </Input>
                  {errors.firstname && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.firstname.message ?? "")}</FormControlErrorText>
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
                    <FormControlLabelText>{t("auth:register.lastNameLabel")}</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size={"lg"} variant="rounded">
                    <InputField type="text" placeholder={t("auth:register.lastNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
                  </Input>
                  {errors.lastname && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.lastname.message ?? "")}</FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              )}
            />
          </View>

          {/* Email Input */}
          <View>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl isInvalid={!!errors.email} size="md" isDisabled={isLoading} isReadOnly={false} isRequired={true}>
                  <FormControlLabel>
                    <FormControlLabelText>{t("auth:register.emailLabel")}</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size={"lg"} variant="rounded">
                    <InputField type="text" placeholder={t("auth:register.emailPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="email-address" autoCapitalize="none" />
                  </Input>
                  {errors.email && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.email.message ?? "")}</FormControlErrorText>
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
                    <FormControlLabelText>{t("auth:register.siretLabel")}</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size={"lg"} variant="rounded">
                    <InputField type="text" placeholder={t("auth:register.siretPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="numeric" maxLength={14} />
                  </Input>
                  {errors.siret && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.siret.message ?? "")}</FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              )}
            />
          </View>

          {/* Phone Input */}
          <FormInputControlPhone
            control={control}
            name="phone"
            error={errors.phone?.message ? t(errors.phone.message) : undefined}
            defaultValue={watch("phone")}
            label={t("auth:register.phoneLabel")}
            placeholder={t("auth:register.phonePlaceholder")}
            country={country}
            setCountry={setCountry}
            textInfo={t("auth:register.phoneFormat")}
            isRequired={true}
            isDisabled={isLoading}
          />

          {/* Continue Button */}
          <Button size="xl" className="my-2" onPress={handleNextStep}>
            <ButtonText size="lg">{t("auth:register.nextButton")}</ButtonText>
          </Button>
        </>
      )}

      {currentStep === 2 && (
        <>
          {/* Back Button */}
          <TouchableOpacity onPress={() => setCurrentStep(1)}>
            <Text className="text-base text-primary-500 font-semibold">{t("auth:register.backButton")}</Text>
          </TouchableOpacity>

          {/* Street Number + Street Name */}
          <View className="flex-row gap-2">
            <View className="w-24">
              <Controller
                control={control}
                name="street_number"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={!!errors.street_number} size="md" isDisabled={isLoading} isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("auth:register.streetNumberLabel")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"lg"} variant="rounded">
                      <InputField type="text" placeholder={t("auth:register.streetNumberPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="number-pad" />
                    </Input>
                    {errors.street_number && (
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{t(errors.street_number.message ?? "")}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="street_name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={!!errors.street_name} size="md" isDisabled={isLoading} isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("auth:register.streetNameLabel")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"lg"} variant="rounded">
                      <InputField type="text" placeholder={t("auth:register.streetNamePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
                    </Input>
                    {errors.street_name && (
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{t(errors.street_name.message ?? "")}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />
            </View>
          </View>

          {/* Address Complement */}
          <View>
            <Controller
              control={control}
              name="address_complement"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormControl isInvalid={!!errors.address_complement} size="md" isDisabled={isLoading}>
                  <FormControlLabel>
                    <FormControlLabelText>{t("auth:register.addressComplementLabel")}</FormControlLabelText>
                  </FormControlLabel>
                  <Input className="my-1" size={"lg"} variant="rounded">
                    <InputField type="text" placeholder={t("auth:register.addressComplementPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
                  </Input>
                  {errors.address_complement && (
                    <FormControlError>
                      <FormControlErrorIcon as={AlertCircleIcon} />
                      <FormControlErrorText>{t(errors.address_complement.message ?? "")}</FormControlErrorText>
                    </FormControlError>
                  )}
                </FormControl>
              )}
            />
          </View>

          {/* Postal Code + Town */}
          <View className="flex-row gap-2">
            <View className="w-28">
              <Controller
                control={control}
                name="postal_code"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={!!errors.postal_code} size="md" isDisabled={isLoading} isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("auth:register.postalCodeLabel")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"lg"} variant="rounded">
                      <InputField type="text" placeholder={t("auth:register.postalCodePlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} keyboardType="number-pad" maxLength={5} />
                    </Input>
                    {errors.postal_code && (
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{t(errors.postal_code.message ?? "")}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="town"
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormControl isInvalid={!!errors.town} size="md" isDisabled={isLoading} isRequired={true}>
                    <FormControlLabel>
                      <FormControlLabelText>{t("auth:register.townLabel")}</FormControlLabelText>
                    </FormControlLabel>
                    <Input className="my-1" size={"lg"} variant="rounded">
                      <InputField type="text" placeholder={t("auth:register.townPlaceholder")} value={value} onChangeText={onChange} onBlur={onBlur} />
                    </Input>
                    {errors.town && (
                      <FormControlError>
                        <FormControlErrorIcon as={AlertCircleIcon} />
                        <FormControlErrorText>{t(errors.town.message ?? "")}</FormControlErrorText>
                      </FormControlError>
                    )}
                  </FormControl>
                )}
              />
            </View>
          </View>

          {/* City/Area Input */}
          <InputMultiSelectCity label={t("auth:register.cityLabel")} placeholder={t("auth:register.cityPlaceholder")} helperText={t("auth:register.cityHelper")} />

          {/* Register Button */}
          <Button size="xl" className="my-2" onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
            {isLoading
              ? <ActivityIndicator size="small" color="white" />
              : <ButtonText size="lg">{t("auth:register.submitButton")}</ButtonText>}
          </Button>
        </>
      )}

      {authError && (
        <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>{t(getErrorKeyFromCode(errorCode))}</AlertText>
        </Alert>
      )}

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">{t("common:labels.or")}</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Login Link */}
      <View className="flex-row justify-center mb-4">
        <Text className="text-base text-gray-500">{t("auth:register.hasAccount")} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")} disabled={isLoading}>
          <Text className="text-base text-primary-500 font-semibold">{t("auth:register.loginLink")}</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default RegisterForm;
