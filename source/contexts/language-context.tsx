import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/locales";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  changeLanguage: (_lang: Language) => Promise<void>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "@reats_cookers:language";

interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 *
 * Manages the application language state and persists it to AsyncStorage.
 * Wraps the app to provide language context to all components.
 *
 * Usage:
 * ```tsx
 * <LanguageProvider>
 *   <App />
 * </LanguageProvider>
 * ```
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("fr");
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language on mount
  useEffect(() => {
    loadSavedLanguage();
  }, []);

  const loadSavedLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
        setLanguage(savedLanguage);
        await i18n.changeLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading saved language:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (lang: Language) => {
    try {
      setLanguage(lang);
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to access language context
 *
 * Usage:
 * ```tsx
 * const { language, changeLanguage } = useLanguage();
 *
 * Change language
 * await changeLanguage('en');
 * ```
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
