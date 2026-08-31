import type { PropsWithChildren } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import {
  CARD_FADE_IN_SCALE,
  CARD_RETURN_DELAY,
  CARD_STACK_COMPRESSION,
  CARD_STACK_SPREAD,
  HIDDEN_CARD_SCALE,
  INACTIVE_CARD_TIMING_CONFIG,
  OFFSCREEN_CARD_OFFSET,
  OVERSCROLL_BASE_OFFSET,
  SPRING_CONFIG,
} from "./constants";
import type { WalletItemVariant } from "./types";

type CardProps = PropsWithChildren<{
  id: string;
  index: number;
  variant: WalletItemVariant;
  cardStyle?: StyleProp<ViewStyle>;
  cardHeight: number;
  expandedCardHeight: number;
  stackSpacing: number;
  windowHeight: number;
  selectedCard: SharedValue<number>;
  selectedCardID: SharedValue<string | null>;
  selectedItemVariant: SharedValue<WalletItemVariant | null>;
  selectedCardInitialOffsetY: SharedValue<number>;
  selectedCardOffsetY: SharedValue<number>;
  closingCard: SharedValue<number>;
  closingSwipeOffsetY: SharedValue<number>;
  detailsScrollY: SharedValue<number>;
  scrollY: SharedValue<number>;
  swipeY: SharedValue<number>;
  inTransition: SharedValue<number>;
}>;

const WalletCard = ({
  children,
  id,
  index,
  variant,
  cardStyle,
  cardHeight,
  expandedCardHeight,
  stackSpacing,
  windowHeight,
  selectedCard,
  selectedCardID,
  selectedItemVariant,
  selectedCardInitialOffsetY,
  selectedCardOffsetY,
  closingCard,
  closingSwipeOffsetY,
  detailsScrollY,
  scrollY,
  swipeY,
  inTransition,
}: CardProps) => {
  const animatedHeight = useSharedValue(cardHeight);
  const cardScale = useSharedValue(1);
  const cardSlideY = useSharedValue(0);
  const marginTop = index * stackSpacing;
  const spread = CARD_STACK_SPREAD * index;
  const spreadOffset = Math.min(CARD_STACK_COMPRESSION * index * index, spread);
  const shouldAnimateHeight = variant === "expandableCard";
  const hasDetails = variant === "cardWithDetails";

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        cardScale.value,
        [HIDDEN_CARD_SCALE, CARD_FADE_IN_SCALE],
        [0, 1],
        Extrapolation.CLAMP,
      ),
      ...(shouldAnimateHeight ? { height: animatedHeight.value } : null),
      transform: [
        {
          translateY:
            interpolate(
              scrollY.value,
              [-windowHeight, 0],
              [OVERSCROLL_BASE_OFFSET + spread - spreadOffset, 0],
              Extrapolation.CLAMP,
            ) +
            cardSlideY.value -
            (hasDetails && selectedCard.value === index
              ? detailsScrollY.value
              : 0) +
            (selectedCard.value === index
              ? swipeY.value
              : closingCard.value === index
                ? closingSwipeOffsetY.value
                : 0),
        },
        { scale: cardScale.value },
      ],
    };
  });

  useAnimatedReaction(
    () => selectedCard.value,
    (currentSelection, previousSelection) => {
      if (currentSelection === -1 && previousSelection === null) {
        // Initial mount
        return;
      }

      if (selectedCard.value !== -1) {
        const isSelectedCard = selectedCard.value === index;
        const shouldMoveUp = currentSelection >= index;
        const animateToValue = shouldMoveUp
          ? scrollY.value - marginTop
          : scrollY.value + windowHeight - marginTop - OFFSCREEN_CARD_OFFSET;

        cardSlideY.value = isSelectedCard
          ? withSpring(animateToValue, SPRING_CONFIG.OPEN)
          : withTiming(animateToValue, INACTIVE_CARD_TIMING_CONFIG);

        if (isSelectedCard) {
          if (hasDetails) {
            selectedCardOffsetY.value = withSpring(0, SPRING_CONFIG.OPEN);
          }

          if (shouldAnimateHeight) {
            animatedHeight.value = withTiming(expandedCardHeight);
          }
        } else if (shouldMoveUp) {
          cardScale.value = withTiming(HIDDEN_CARD_SCALE);
        }
      } else {
        if (previousSelection === index) {
          cardSlideY.value = withSpring(0, SPRING_CONFIG.CLOSE);

          if (hasDetails) {
            selectedCardOffsetY.value = withSpring(
              selectedCardInitialOffsetY.value,
              SPRING_CONFIG.CLOSE,
            );
          }
        } else {
          const wasAboveSelectedCard = (previousSelection ?? 0) > index;
          cardSlideY.value = withDelay(
            wasAboveSelectedCard
              ? CARD_RETURN_DELAY.BEFORE_SELECTION
              : CARD_RETURN_DELAY.AFTER_SELECTION,
            withTiming(0, {
              easing: Easing.out(Easing.quad),
            }),
          );

          if (wasAboveSelectedCard) {
            cardScale.value = withTiming(1);
          }
        }

        if (shouldAnimateHeight && animatedHeight.value > cardHeight) {
          animatedHeight.value = withTiming(cardHeight);
        }
      }
    },
  );

  const handleCardPress = () => {
    if (selectedCard.value === -1 && !inTransition.value) {
      const initialOffset = marginTop - scrollY.value;

      swipeY.value = 0;
      selectedCardInitialOffsetY.value = initialOffset;
      if (hasDetails) {
        selectedCardOffsetY.value = initialOffset;
      }
      selectedItemVariant.value = variant;
      selectedCard.value = index;
      selectedCardID.value = id;
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleCardPress}>
      <Animated.View
        style={[
          styles.container,
          cardStyle,
          { marginTop, height: cardHeight },
          animatedStyle,
        ]}>
        {children}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    position: "absolute",
    width: "100%",
    overflow: "hidden",
  },
});

export default WalletCard;
