import React, { FC } from "react";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { Image } from "../ui/image";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import type { OnboardingScreen } from "@/types/onboarding";
import { SCREEN_WIDTH } from "@/constants/screen";

interface OnboardingItemProps {
  screen: OnboardingScreen;
}

/**
 * OnboardingItem Component
 *
 * Displays a single onboarding screen with image, title, and description.
 * Uses Gluestack UI components with Tailwind CSS for modern, responsive design.
 */
const OnboardingItem: FC<OnboardingItemProps> = ({ screen }) => {
  return (
    <Box
      className="justify-center items-center px-6 py-8"
      style={{ width: SCREEN_WIDTH }}
    >
      <VStack space="xl" className="items-center w-full">
        {/* Onboarding illustration */}
        <Box className="w-full aspect-square max-h-[350px] items-center justify-center">
          <Image
            source={screen.image}
            className="w-full h-full"
            resizeMode="contain"
            alt={`Onboarding screen ${screen.id}`}
          />
        </Box>

        {/* Title section */}
        <Heading size="2xl" className="text-black text-center font-bold px-4">
          {screen.title}
        </Heading>

        {/* Description section */}
        <Text
          size="md"
          className="text-gray-600 text-center leading-relaxed px-2"
        >
          {screen.description}
        </Text>
      </VStack>
    </Box>
  );
};

OnboardingItem.displayName = "OnboardingItem";

export default OnboardingItem;
