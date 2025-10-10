import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { FC, useMemo } from "react";
import { Pressable, StyleProp, ViewStyle } from "react-native";

// Icon library type definitions
type IconLibraryName = "Feather" | "MaterialCommunityIcons";
type IconLibraryMap = Record<IconLibraryName, React.ComponentType<any>>;

const ICON_LIBRARIES: IconLibraryMap = {
  Feather,
  MaterialCommunityIcons,
};

// Size configurations
const SIZE_CONFIG = {
  small: { icon: 12, button: 24 },
  medium: { icon: 16, button: 36 },
  big: { icon: 24, button: 48 },
} as const;

// Variant styles mapping
const VARIANT_STYLES = {
  contained: "bg-primary-500 active:bg-primary-600",
  text: "bg-transparent",
  outline: "bg-transparent border-2 border-black",
} as const;

// Roundness styles mapping
const ROUNDNESS_STYLES = {
  full: "rounded-full",
  medium: "rounded-2xl",
  small: "rounded-xl",
} as const;

export interface IconButtonProps {
  icon: string;
  iconFamily?: IconLibraryName;
  variant?: keyof typeof VARIANT_STYLES;
  size?: keyof typeof SIZE_CONFIG;
  iconColor?: string;
  roundness?: keyof typeof ROUNDNESS_STYLES;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

/**
 * IconButton Component
 *
 * A customizable icon button with multiple variants, sizes, and roundness options.
 * Supports Feather and MaterialCommunityIcons icon families.
 * Uses Tailwind CSS for styling with fallback to inline styles for dynamic values.
 */
const IconButton: FC<IconButtonProps> = ({
  icon,
  iconFamily = "Feather",
  variant = "contained",
  size = "medium",
  iconColor = "white",
  roundness = "medium",
  style,
  onPress,
}) => {
  const IconComponent = ICON_LIBRARIES[iconFamily];

  // Memoize size calculations
  const { iconSize, buttonSize } = useMemo(
    () => ({
      iconSize: SIZE_CONFIG[size].icon,
      buttonSize: SIZE_CONFIG[size].button,
    }),
    [size],
  );

  // Combine styles
  const buttonStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      {
        width: buttonSize,
        height: buttonSize,
        alignItems: "center",
        justifyContent: "center",
      },
      style,
    ],
    [buttonSize, style],
  );

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [buttonStyles, pressed && { opacity: 0.9 }]}
      className={`
        ${VARIANT_STYLES[variant]}
        ${ROUNDNESS_STYLES[roundness]}
        items-center justify-center
        active:opacity-90
      `}
    >
      <IconComponent name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
};

IconButton.displayName = "IconButton";

export default IconButton;
