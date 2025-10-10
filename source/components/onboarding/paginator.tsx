import { SCREEN_WIDTH } from "@/constants/screen";
import React, { FC, useMemo } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { Box } from "../ui/box";

// Dot size constants
const DOT_SIZE = 8;
const DOT_ACTIVE_SIZE = 24;
const DOT_SPACING = 6;

interface PaginatorProps {
  scrollX: SharedValue<number>;
  itemsLength: number;
}

interface DotProps {
  scrollX: SharedValue<number>;
  index: number;
}

/**
 * Individual animated dot component
 * Separated to comply with React Hooks rules (hooks can't be called in loops)
 */
const Dot: FC<DotProps> = ({ scrollX, index }) => {
  const animatedStyle = useAnimatedStyle(() => {
    // Calculate distance from current scroll position to this dot's position
    const inputValue = scrollX.value / SCREEN_WIDTH;
    const distance = Math.abs(inputValue - index);

    // Smooth width animation: active dot is larger, fades with distance
    const width = interpolate(
      distance,
      [0, 1, 2],
      [DOT_ACTIVE_SIZE, DOT_SIZE * 1.2, DOT_SIZE],
      Extrapolate.CLAMP,
    );

    // Smooth opacity animation: active is full opacity, fades with distance
    const opacity = interpolate(
      distance,
      [0, 1, 2],
      [1, 0.6, 0.3],
      Extrapolate.CLAMP,
    );

    // Smooth color interpolation from gray to black
    const backgroundColor = interpolateColor(
      distance,
      [0, 0.5, 1],
      ["#FF3326", "#6B7280", "#E5E7EB"],
    );

    return {
      width,
      height: DOT_SIZE,
      borderRadius: width / 2,
      backgroundColor,
      opacity,
      transform: [
        {
          scale: interpolate(distance, [0, 1], [1, 0.8], Extrapolate.CLAMP),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          marginHorizontal: DOT_SPACING,
        },
        animatedStyle,
      ]}
    />
  );
};

/**
 * Paginator Component
 *
 * Displays animated pagination dots that expand/contract based on scroll position.
 * Uses react-native-reanimated for smooth, performant animations.
 * Each dot represents an onboarding screen.
 */
const Paginator: FC<PaginatorProps> = ({ scrollX, itemsLength }) => {
  // Pre-calculate input range for interpolation (one value per screen)
  const _inputRange = useMemo(
    () => Array.from({ length: itemsLength }, (_, i) => i * SCREEN_WIDTH),
    [itemsLength],
  );

  return (
    <Box className="flex-row items-center justify-center py-6">
      {Array.from({ length: itemsLength }).map((_, index) => (
        <Dot key={`paginator-dot-${index}`} scrollX={scrollX} index={index} />
      ))}
    </Box>
  );
};

Paginator.displayName = "Paginator";

export default Paginator;
