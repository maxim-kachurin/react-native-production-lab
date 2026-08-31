import { Platform } from "react-native";
import type { WalletLayout } from "./types";
import { Easing } from "react-native-reanimated";

export const IS_IOS = Platform.OS === "ios";

export const DEFAULT_WALLET_LAYOUT: WalletLayout = {
  cardHeight: 224,
  expandedCardHeight: 477,
  stackSpacing: 70,
};

export const OFFSCREEN_CARD_OFFSET = 40;

export const OVERSCROLL_BASE_OFFSET = 50;
export const CARD_STACK_SPREAD = 70;
export const CARD_STACK_COMPRESSION = 2.5;
export const HIDDEN_CARD_SCALE = 0.9;
export const CARD_FADE_IN_SCALE = 0.95;
export const CLOSE_THRESHOLD_RATIO = 0.11;
export const MAX_TAP_DISTANCE = 10;
export const DETAILS_FADE_OUT_RATIO = 0.9;
export const DETAILS_FADE_OUT_TIMING = { duration: 200 };

export const CARD_RETURN_DELAY = {
  BEFORE_SELECTION: 100,
  AFTER_SELECTION: 300,
};

export const TRANSITION_RESET_DELAY = 100;

export const SPRING_CONFIG = {
  OPEN: {
    mass: 3.8,
    stiffness: 652,
    damping: 79.8,
  },
  CLOSE: {
    mass: 4,
    stiffness: 675,
    damping: 77.5,
  },
  SWIPE: {
    mass: 4,
    stiffness: 800,
    damping: 90,
  },
};

export const INACTIVE_CARD_TIMING_CONFIG = {
  duration: 250,
  easing: Easing.bezier(0.2245, 0, 0.5162, 0.8114),
};
