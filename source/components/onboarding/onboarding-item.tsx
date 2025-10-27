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
      className="flex-1 justify-center items-center px-6"
      style={{ width: SCREEN_WIDTH }}
    >
      <VStack space="lg" className="items-center w-full flex-1 justify-center">
        {/* Onboarding illustration */}
        <Box className="w-full max-h-[280px] items-center justify-center mb-4">
          <Image
            source={screen.image}
            className="w-full h-full"
            resizeMode="contain"
            alt={`Onboarding screen ${screen.id}`}
          />
        </Box>

        {/* Title section */}
        <Heading size="xl" className="text-black text-center font-bold px-4">
          {screen.title}
        </Heading>

        {/* Description section */}
        <Text
          size="md"
          className="text-gray-600 text-center leading-relaxed px-6"
        >
          {screen.description}
        </Text>
      </VStack>
    </Box>
  );
};

OnboardingItem.displayName = "OnboardingItem";

export default OnboardingItem;
