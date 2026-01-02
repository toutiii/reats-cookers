import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { ICountry } from "@/types";
import { FormInputControlPhone } from "@/components/common/form-input-control-phone";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema, LoginFormData } from "@/utils/validation";
import { useSendAuthOtpMutation } from "@/store/api/authApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";

const LoginForm = () => {
  const { t } = useTranslation("auth");
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [33],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const [sendAuthOtp, { isLoading }] = useSendAuthOtpMutation();
  const { error: authError, status } = useSelector((state: RootState) => state.auth);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phone: "",
    },
  });

  // Navigate to OTP screen when OTP is sent successfully
  useEffect(() => {
    if (status === "otp_pending") {
      navigation.navigate("OTPScreen");
    }
  }, [status, navigation]);

  const onSubmit = async (data: LoginFormData) => {
    // Clean phone: remove spaces and check if already has country code
    const cleanPhone = data.phone.replace(/\s/g, "");
    const fullPhone = cleanPhone.startsWith("+")
      ? cleanPhone
      : `+${country.calling_codes[0]}${cleanPhone.replace(/^0/, "")}`;
    await sendAuthOtp({ phone: fullPhone });
  };

  return (
    <VStack className="px-6 flex-1 mt-4" space="lg">
      <FormInputControlPhone
        control={control}
        name="phone"
        error={errors.phone?.message}
        defaultValue={watch("phone")}
        label={t("login.phoneLabel")}
        placeholder={t("login.phonePlaceholder")}
        country={country}
        setCountry={setCountry}
        textInfo={t("login.phoneFormat")}
        isRequired={true}
        isDisabled={isLoading}
      />

      {authError && (
        <Alert action="error" variant="solid">
          <AlertIcon as={InfoIcon} />
          <AlertText>{authError}</AlertText>
        </Alert>
      )}

      <Button size="xl" className="my-2" onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <ButtonText size="lg">{t("login.submitButton")}</ButtonText>
        )}
      </Button>

      {/* Divider */}
      <View className="flex-row items-center my-2">
        <View className="flex-1 h-px bg-gray-300" />
        <Text className="mx-4 text-gray-500">{t("common:labels.or")}</Text>
        <View className="flex-1 h-px bg-gray-300" />
      </View>

      {/* Register Link */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-base text-gray-500">
          {t("login.noAccount")}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")} disabled={isLoading}>
          <Text className="text-base text-blue-500">{t("login.signupLink")}</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default LoginForm;
