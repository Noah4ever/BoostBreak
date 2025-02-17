// This file is a fallback for using MaterialIcons on Android and web.

import Icons from "@expo/vector-icons/Ionicons";
import { SymbolWeight } from "expo-symbols";
import React from "react";
import { OpaqueColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  // See MaterialIcons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  timer: "timer-outline",
  "person.circle": "person-circle-outline",
  gear: "cog-outline",
  leaf: "leaf-outline",
} as Partial<Record<import("expo-symbols").SymbolViewProps["name"], React.ComponentProps<typeof Icons>["name"]>>;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <Icons color={color} size={size} name={MAPPING[name]} style={style} />;
}
