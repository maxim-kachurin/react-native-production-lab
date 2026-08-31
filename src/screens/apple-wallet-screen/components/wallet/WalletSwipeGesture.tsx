import type { PropsWithChildren } from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { GestureType } from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import {
  CLOSE_THRESHOLD_RATIO,
  DETAILS_FADE_OUT_RATIO,
  MAX_TAP_DISTANCE,
  SPRING_CONFIG,
  TRANSITION_RESET_DELAY,
} from "./constants";
import type { WalletItemVariant } from "./types";

type SwipeGestureProps = PropsWithChildren<{
  selectedCard: SharedValue<number>;
  selectedItemVariant: SharedValue<WalletItemVariant | null>;
  selectedCardOffsetY: SharedValue<number>;
  closingCard: SharedValue<number>;
  closingSwipeOffsetY: SharedValue<number>;
  detailsOpacity: SharedValue<number>;
  detailsScrollY: SharedValue<number>;
  detailsScrollGesture: GestureType;
  swipeY: SharedValue<number>;
  inTransition: SharedValue<number>;
  cardTop?: number;
  cardHeight: number;
  windowHeight: number;
}>;

const WalletSwipeGesture = ({
  children,
  selectedCard,
  selectedItemVariant,
  selectedCardOffsetY,
  closingCard,
  closingSwipeOffsetY,
  detailsOpacity,
  detailsScrollY,
  detailsScrollGesture,
  swipeY,
  inTransition,
  cardTop = 0,
  cardHeight,
  windowHeight,
}: SwipeGestureProps) => {
  const closeThreshold = windowHeight * CLOSE_THRESHOLD_RATIO;
  const fadeDistance =
    Math.max(windowHeight - cardTop - cardHeight, 1) * DETAILS_FADE_OUT_RATIO;

  const canHandleCardTouch = (touchY: number | undefined) => {
    "worklet";

    const selectedCardTop = cardTop - detailsScrollY.value;
    const touchesSelectedCard =
      touchY !== undefined &&
      touchY >= selectedCardTop &&
      touchY <= selectedCardTop + cardHeight;

    return (
      selectedCard.value !== -1 &&
      (selectedItemVariant.value === "expandableCard" || touchesSelectedCard)
    );
  };

  const closeSelectedCard = () => {
    "worklet";

    if (selectedCard.value === -1) {
      return;
    }

    inTransition.value = 1;
    closingCard.value = selectedCard.value;
    closingSwipeOffsetY.value = swipeY.value;
    // Hand the swipe distance to the details offset in the same frame it is
    // cleared, otherwise the details jump back to their open position before
    // the close animation picks them up.
    selectedCardOffsetY.value += swipeY.value;
    selectedCard.value = -1;
    swipeY.value = 0;
    closingSwipeOffsetY.value = withSpring(
      0,
      SPRING_CONFIG.CLOSE,
      finished => {
        if (finished) {
          closingCard.value = -1;
        }
      },
    );
    // detailsOpacity is left where the drag put it,
    // the details view times it down to 0 from there.
    inTransition.value = withDelay(
      TRANSITION_RESET_DELAY,
      withTiming(0, { duration: 0 }),
    );
  };

  const swipeGesture = Gesture.Pan()
    .blocksExternalGesture(detailsScrollGesture)
    .manualActivation(true)
    .onTouchesDown((event, state) => {
      // When WalletCard is selected, this gesture competes with WalletDetailsScrollView
      // scroll container for the swipe. It activates only if the touch starts
      // inside WalletCard boundaries, otherwise it fails and control passes to the
      // scroll container.
      const touchY = event.allTouches[0]?.y;

      if (canHandleCardTouch(touchY)) {
        state.begin();
        state.activate();
      } else {
        state.fail();
      }
    })
    .onBegin(() => {
      inTransition.value = 0;
    })
    .onUpdate(e => {
      if (!inTransition.value && e.translationY >= 0) {
        swipeY.value = e.translationY;
        detailsOpacity.value = interpolate(
          e.translationY,
          [0, fadeDistance],
          [1, 0],
          Extrapolation.CLAMP,
        );
      }
    })
    .onEnd(e => {
      if (selectedCard.value === -1) {
        return;
      }

      if (e.translationY > closeThreshold) {
        closeSelectedCard();
      } else {
        swipeY.value = withSpring(0, SPRING_CONFIG.SWIPE);
        detailsOpacity.value = withSpring(1, SPRING_CONFIG.SWIPE);
      }
    });

  const tapGesture = Gesture.Tap()
    .maxDistance(MAX_TAP_DISTANCE)
    .onTouchesDown((event, state) => {
      if (!canHandleCardTouch(event.allTouches[0]?.y)) {
        state.fail();
      }
    })
    .onEnd((_, success) => {
      if (success) {
        closeSelectedCard();
      }
    });

  const gesture = Gesture.Simultaneous(swipeGesture, tapGesture);

  return <GestureDetector gesture={gesture}>{children}</GestureDetector>;
};

export default WalletSwipeGesture;
