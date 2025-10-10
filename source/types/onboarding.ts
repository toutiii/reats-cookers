/**
 * Onboarding Types
 *
 * Type definitions for the onboarding flow screens
 */

export interface OnboardingScreen {
  id: number;
  title: string;
  description: string;
  image: any; // React Native image require type
}

export type OnboardingScreens = OnboardingScreen[];
