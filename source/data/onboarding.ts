import type { OnboardingScreens } from "../types/onboarding";

const imagePath = "@/assets/images/onboarding";

export const getOnboardingScreens = (): OnboardingScreens => [
  {
    id: 1,
    title: "Discover Professional Chefs",
    description: "Browse through hundreds of talented chefs in your area. From home cooking to gourmet cuisine, find the perfect chef for any occasion.",
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 2,
    title: "Book Your Culinary Experience",
    description: "Schedule private cooking sessions, catering services, or cooking classes. Choose your menu, date, and let our chefs handle the rest.",
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 3,
    title: "Live Cooking at Your Place",
    description: "Experience restaurant-quality meals in the comfort of your home. Watch professional chefs prepare delicious dishes with fresh ingredients.",
    image: require(`${imagePath}/shipping.png`),
  },
  {
    id: 4,
    title: "Rate & Share Your Experience",
    description: "Leave reviews, share photos of your meals, and help others discover amazing chefs. Build your culinary community today.",
    image: require(`${imagePath}/shipping.png`),
  },
];
export const screens = getOnboardingScreens();
