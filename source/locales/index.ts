import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Import French translations
import frCommon from "./fr/common.json";
import frAuth from "./fr/auth.json";
import frMenu from "./fr/menu.json";
import frOrders from "./fr/orders.json";
import frDashboard from "./fr/dashboard.json";
import frAccount from "./fr/account.json";
import frValidation from "./fr/validation.json";
import frOnboarding from "./fr/onboarding.json";

// Import English translations
import enCommon from "./en/common.json";
import enAuth from "./en/auth.json";
import enMenu from "./en/menu.json";
import enOrders from "./en/orders.json";
import enDashboard from "./en/dashboard.json";
import enAccount from "./en/account.json";
import enValidation from "./en/validation.json";
import enOnboarding from "./en/onboarding.json";

// Define translation resources
const resources = {
  fr: {
    common: frCommon,
    auth: frAuth,
    menu: frMenu,
    orders: frOrders,
    dashboard: frDashboard,
    account: frAccount,
    validation: frValidation,
    onboarding: frOnboarding,
  },
  en: {
    common: enCommon,
    auth: enAuth,
    menu: enMenu,
    orders: enOrders,
    dashboard: enDashboard,
    account: enAccount,
    validation: enValidation,
    onboarding: enOnboarding,
  },
};

// Get device locale
const deviceLocale = Localization.getLocales()[0]?.languageCode || "fr";

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLocale,
    fallbackLng: "fr",
    defaultNS: "common",
    ns: ["common", "auth", "menu", "orders", "dashboard", "account", "validation", "onboarding"],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    compatibilityJSON: "v4", // For compatibility with i18next v23+
    react: {
      useSuspense: false, // Disable suspense for React Native
    },
  });

export default i18n;
