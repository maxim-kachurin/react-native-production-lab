import { useMemo } from "react";
import { StyleSheet, ViewProps } from "react-native";
import { GestureDetector, useTapGesture } from "react-native-gesture-handler";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import {
  CANCEL_DISTANCE,
  CONTENT_REST_OPACITY,
  EDGE,
  EDGE_PRESSED,
  FILL,
  FILL_PRESSED,
  MAX_PRESS_MS,
  PRESS_SCALE,
  SPRING_PRESS_CONFIG,
  SPRING_RELEASE_CONFIG,
} from "./config";
import { s } from "@utils";

export type PressableSurfaceProps = ViewProps & {
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  width?: number;
  radius?: number;
};

/** Work in progress. */
export const PressableSurface = ({
  children,
  onPress,
  disabled = false,
  height = s(32),
  width = s(32),
  radius,
  style,
  ...rest
}: PressableSurfaceProps) => {
  const reducedMotion = useReducedMotion();
  const press = useSharedValue(0);

  const gestureConfig = useMemo(
    () => ({
      enabled: !disabled,
      maxDuration: MAX_PRESS_MS,
      maxDistance: CANCEL_DISTANCE,
      onBegin: () => {
        "worklet";
        press.value = withSpring(1, SPRING_PRESS_CONFIG);
      },
      onActivate: () => {
        "worklet";
        if (onPress) {
          scheduleOnRN(onPress);
        }
      },
      onFinalize: () => {
        "worklet";
        press.value = withSpring(0, SPRING_RELEASE_CONFIG);
      },
    }),
    [disabled, onPress, press],
  );

  const gesture = useTapGesture(gestureConfig);

  const containerStyle = useAnimatedStyle(() => {
    const lit = Math.max(0, press.value);

    return {
      transform: [
        {
          scale: reducedMotion ? 1 : 1 + press.value * (PRESS_SCALE - 1),
        },
      ],
      backgroundColor: interpolateColor(lit, [0, 1], [FILL, FILL_PRESSED]),
      borderColor: interpolateColor(lit, [0, 1], [EDGE, EDGE_PRESSED]),
    };
  });

  const contentStyle = useAnimatedStyle(() => ({
    opacity:
      CONTENT_REST_OPACITY +
      (1 - CONTENT_REST_OPACITY) * Math.max(0, press.value),
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessible
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        onAccessibilityTap={onPress}
        {...rest}
        style={[
          styles.container,
          {
            height,
            width,
            borderRadius: radius ?? Math.min(height, width) / 2,
          },
          disabled && styles.disabled,
          style,
          containerStyle,
        ]}>
        <Animated.View pointerEvents="none" style={contentStyle}>
          {children}
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: FILL,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: EDGE,
  },
  disabled: {
    opacity: 0.4,
  },
});
