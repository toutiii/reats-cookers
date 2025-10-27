import React from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "@/components/themed-view";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/language-context";

interface LanguageOption {
  code: "fr" | "en";
  name: string;
  nativeName: string;
  flag: string;
}

const languages: LanguageOption[] = [
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
];

interface LanguageItemProps {
  language: LanguageOption;
  isSelected: boolean;
  onPress: () => void;
  showDivider: boolean;
}

const LanguageItem: React.FC<LanguageItemProps> = ({
  language,
  isSelected,
  onPress,
  showDivider,
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        className="py-4 px-4 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          {/* Flag */}
          <View className="w-12 h-12 items-center justify-center mr-4 bg-gray-50 rounded-xl">
            <Text className="text-3xl">{language.flag}</Text>
          </View>

          {/* Language Info */}
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-900 mb-0.5">
              {language.nativeName}
            </Text>
            <Text className="text-sm text-gray-500">{language.name}</Text>
          </View>
        </View>

        {/* Selected Indicator */}
        {isSelected && (
          <View className="w-6 h-6 bg-primary-500 rounded-full items-center justify-center">
            <Ionicons name="checkmark" size={16} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
      {showDivider && <View className="h-px bg-gray-100 ml-20" />}
    </>
  );
};

const LanguageSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { t } = useTranslation("account");
  const { language: currentLanguage, changeLanguage } = useLanguage();

  const handleLanguageChange = async (languageCode: "fr" | "en") => {
    if (languageCode !== currentLanguage) {
      await changeLanguage(languageCode);
    }
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1" edges={["top"]}>
        {/* Header */}
        <View className="px-5 pt-4 pb-4 flex-row items-center border-b border-gray-100">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center mr-3"
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-2xl font-bold text-gray-900">
              {t("settings.languageSettings.title")}
            </Text>
            <Text className="text-sm text-gray-500">
              {t("settings.language")}
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
          {/* Info Card */}
          <View className="bg-blue-50 rounded-2xl p-4 mb-6 flex-row items-start">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="information-circle" size={20} color="#3B82F6" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-blue-900 mb-1">
                {currentLanguage === "fr"
                  ? "Changement de langue"
                  : "Language Change"}
              </Text>
              <Text className="text-xs text-blue-700 leading-relaxed">
                {currentLanguage === "fr"
                  ? "L'application sera automatiquement mise à jour avec la langue sélectionnée."
                  : "The app will automatically update with the selected language."}
              </Text>
            </View>
          </View>

          {/* Languages List */}
          <View className="mb-6">
            <View className="px-1 mb-3">
              <Text className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                {currentLanguage === "fr"
                  ? "Langues disponibles"
                  : "Available Languages"}
              </Text>
            </View>
            <View
              className="bg-white rounded-2xl overflow-hidden"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {languages.map((lang, index) => (
                <LanguageItem
                  key={lang.code}
                  language={lang}
                  isSelected={currentLanguage === lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  showDivider={index < languages.length - 1}
                />
              ))}
            </View>
          </View>

          {/* Current Language Info */}
          <View className="bg-gray-50 rounded-2xl p-4 mb-8">
            <View className="flex-row items-center mb-2">
              <Ionicons name="globe-outline" size={20} color="#6B7280" />
              <Text className="text-sm font-semibold text-gray-700 ml-2">
                {currentLanguage === "fr"
                  ? "Langue actuelle"
                  : "Current Language"}
              </Text>
            </View>
            <Text className="text-base font-bold text-gray-900">
              {languages.find((l) => l.code === currentLanguage)?.nativeName}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default LanguageSettingsScreen;
