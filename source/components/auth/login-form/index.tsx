import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { Text } from "@/components/ui/text";
import { ICountry } from "@/types";
import { FormInputControlPhone } from "@/components/common/form-input-control-phone";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";
import { useTranslation } from "@/hooks/useTranslation";

const LoginForm = () => {
  const { t } = useTranslation("auth");
  const navigation = useNavigation<StackNavigation>();
  const [country, setCountry] = useState<ICountry>({
    calling_codes: [242],
    key: "FR",
    emoji: "🇫🇷",
    value: "France",
  });

  const {
    control,
    watch,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      phone: "",
    },
  });

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
      />
      <Button size="xl" className="my-2" onPress={() => null}>
        <ButtonText size="lg">{t("login.submitButton")}</ButtonText>
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
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text className="text-base text-blue-500">{t("login.signupLink")}</Text>
        </TouchableOpacity>
      </View>
    </VStack>
  );
};

export default LoginForm;
