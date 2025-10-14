import React, { FC, useState, useCallback } from "react";
import { Pressable } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularButton from "@/components/onboarding/circular-button";
import OnboardingItem from "@/components/onboarding/onboarding-item";
import Paginator from "@/components/onboarding/paginator";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { SCREEN_WIDTH } from "@/constants/screen";
import { getOnboardingScreens } from "@/data/onboarding";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "@/types/navigation";


const screens = getOnboardingScreens();
const TOTAL_SCREENS = screens.length;


const Onboarding: FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      const newIndex = Math.round(event.contentOffset.x / SCREEN_WIDTH);
      runOnJS(setCurrentIndex)(newIndex);
    },
  });

  /**
   * Navigates to the next onboarding screen or completes onboarding
   * On last screen, redirects to auth or main app based on auth state
   */
  const handleNextScreen = useCallback(() => {
    if (currentIndex < TOTAL_SCREENS - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: SCREEN_WIDTH * nextIndex,
        y: 0,
        animated: true,
      });
    } else {
      // Last screen - navigate to main app (accessible without auth)
      navigation.navigate("TermsAndConditions");
    }
  }, [currentIndex, scrollViewRef, navigation]);

  /**
   * Skip onboarding and go directly to main app
   */
  const handleSkip = useCallback(() => {
    navigation.navigate("MainNavigator");
  }, [navigation]);


  return (
    <SafeAreaView className="flex-1 bg-white">
      <VStack className="flex-1">
        {/* Skip button - only show if not on last screen */}
        {currentIndex < TOTAL_SCREENS - 1 && (
          <Box className="w-full flex-row justify-end px-6 pt-4 pb-2">
            <Pressable onPress={handleSkip}>
              {({ pressed }) => (
                <Box
                  className={`px-5 py-2 rounded-full ${
                    pressed ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  <Text className="text-sm font-medium text-gray-700">
                    Skip
                  </Text>
                </Box>
              )}
            </Pressable>
          </Box>
        )}

        {/* Horizontal scrolling onboarding screens */}
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={scrollHandler}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          className="flex-1"
        >
          {screens.map((screen) => (
            <OnboardingItem
              key={`onboarding-screen-${screen.id}`}
              screen={screen}
            />
          ))}
        </Animated.ScrollView>

        {/* Bottom navigation controls */}
        <Box className="pb-6">
          <Paginator itemsLength={TOTAL_SCREENS} scrollX={scrollX} />
          <CircularButton
            screensLength={TOTAL_SCREENS}
            onPress={handleNextScreen}
            index={currentIndex}
          />
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

Onboarding.displayName = "Onboarding";

export default Onboarding;