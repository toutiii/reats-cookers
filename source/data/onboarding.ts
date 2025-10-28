import type { OnboardingScreens } from "../types/onboarding";
import i18n from "@/locales";

const imagePath = "@/assets/images/onboarding";

export const getOnboardingScreens = (): OnboardingScreens => [
  {
    id: 1,
    title: i18n.t("onboarding:slides.slide1.title"),
    description: i18n.t("onboarding:slides.slide1.description"),
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 2,
    title: i18n.t("onboarding:slides.slide2.title"),
    description: i18n.t("onboarding:slides.slide2.description"),
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 3,
    title: i18n.t("onboarding:slides.slide3.title"),
    description: i18n.t("onboarding:slides.slide3.description"),
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 4,
    title: i18n.t("onboarding:slides.slide4.title"),
    description: i18n.t("onboarding:slides.slide4.description"),
    image: require(`${imagePath}/shipping.png`),
  },
];
export const screens = getOnboardingScreens();
