import { useCallback } from "react";
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

// RNHF transient parameters, both 0.0–1.0. Sharpness is the crispness dial,
// so a low-intensity, fully-sharp transient gives a click instead of a thud.
const TICK_INTENSITY = 0.35;
const TICK_SHARPNESS = 1;

// Minimum gap im ms between subsequent ticks.
const MIN_TICK_MS = 28;

function playTick() {
  ReactNativeHapticFeedback.triggerPattern([
    {
      time: 0,
      type: "transient",
      intensity: TICK_INTENSITY,
      sharpness: TICK_SHARPNESS,
    },
  ]);
}

export type GatedHaptics = {
  /** Plays a tick, unless the previous one was too recent. */
  requestTick: () => void;
};

/** Tracks tick rate and gates calls to avoid smearing. */
export function useGatedHaptics(): GatedHaptics {
  const lastTickAt = useSharedValue(0);

  const requestTick = useCallback(() => {
    "worklet";
    const now = Date.now();
    if (now - lastTickAt.value < MIN_TICK_MS) {
      return;
    }
    lastTickAt.value = now;
    scheduleOnRN(playTick);
  }, [lastTickAt]);

  return { requestTick };
}
