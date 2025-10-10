import React, { FC, useEffect } from "react";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { Box } from "../ui/box";
import IconButton from "./icon-button";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Circle dimensions and calculations
const BUTTON_SIZE = 64;
const RADIUS = 40;
const CIRCUMFERENCE = RADIUS * Math.PI * 2;
const SVG_SIZE = (RADIUS + 8) * 2; // Add padding for stroke
const CENTER = SVG_SIZE / 2;
const ANIMATION_DURATION = 600;

interface CircularButtonProps {
  index: number;
  onPress: () => void;
  screensLength: number;
}

/**
 * CircularButton Component
 *
 * An animated circular progress button with an arrow icon.
 * The progress circle fills as the user navigates through onboarding screens.
 * Uses react-native-reanimated for smooth animations.
 */
const CircularButton: FC<CircularButtonProps> = ({
  screensLength,
  onPress,
  index,
}) => {
  const strokeOffset = useSharedValue(CIRCUMFERENCE);

  // Animated props for the progress circle
  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: withTiming(strokeOffset.value, {
      duration: ANIMATION_DURATION,
    }),
  }));

  // Update progress based on current screen index
  useEffect(() => {
    const progressPerScreen = CIRCUMFERENCE / screensLength;
    strokeOffset.value = CIRCUMFERENCE - progressPerScreen * (index + 1);
  }, [index, screensLength, strokeOffset]);

  return (
    <Box className="self-center items-center justify-center my-6">
      <Box
        className="relative items-center justify-center"
        style={{ width: SVG_SIZE, height: SVG_SIZE }}
      >
        {/* Progress circle SVG - positioned behind button */}
        <Box className="absolute" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
          <Svg height={SVG_SIZE} width={SVG_SIZE}>
            {/* Background circle - light gray */}
            <Circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="#E5E7EB"
              strokeWidth="3"
              fill="none"
            />

            {/* Animated progress circle - black */}
            <AnimatedCircle
              animatedProps={animatedCircleProps}
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              stroke="#FF3326"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              fill="none"
            />
          </Svg>
        </Box>

        {/* Action button centered in the circle */}
        <Box className="absolute items-center justify-center">
          <IconButton
            icon="arrow-right"
            onPress={onPress}
            roundness="full"
            size="big"
            iconColor="#FFFFFF"
            style={{
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              shadowColor: "#FF3326",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 12,
              elevation: 8,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

CircularButton.displayName = "CircularButton";

export default CircularButton;
