import { useCallback, useState } from "react";
import type { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import type { ViewStyle } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import type { GestureType } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";
import { DETAILS_FADE_OUT_TIMING } from "./constants";
import type { WalletItemBase, WalletItemRenderer } from "./types";

type WalletDetailsScrollViewProps<T extends WalletItemBase> = {
  entities: Record<string, T>;
  indexes: Record<string, number>;
  renderDetails?: WalletItemRenderer<T>;
  selectedCardID: SharedValue<string | null>;
  selectedCardInitialOffsetY: SharedValue<number>;
  selectedCardOffsetY: SharedValue<number>;
  detailsOpacity: SharedValue<number>;
  detailsScrollY: SharedValue<number>;
  detailsScrollGesture: GestureType;
  swipeY: SharedValue<number>;
  cardHeight: number;
  topInset?: number;
  bottomInset?: number;
};

const WalletDetailsScrollView = <T extends WalletItemBase>({
  entities,
  indexes,
  renderDetails,
  selectedCardID,
  selectedCardInitialOffsetY,
  selectedCardOffsetY,
  detailsOpacity,
  detailsScrollY,
  detailsScrollGesture,
  swipeY,
  cardHeight,
  topInset = 0,
  bottomInset = 0,
}: WalletDetailsScrollViewProps<T>) => {
  const [selectedID, setSelectedID] = useState<string | null>(null);
  const scrollViewRef = useAnimatedRef<ScrollView>();

  const contentInsetStyle: ViewStyle = {
    paddingTop: topInset + cardHeight,
    paddingBottom: bottomInset,
  };

  const onScroll = useAnimatedScrollHandler(e => {
    detailsScrollY.value = Math.max(e.contentOffset.y, 0);
  });

  const updateSelectedID = useCallback((id: string | null) => {
    setSelectedID(id);
  }, []);

  const selectedItem = selectedID ? entities[selectedID] : undefined;
  const detailedItem =
    selectedItem?.variant === "cardWithDetails" ? selectedItem : undefined;
  const visibleCardID = detailedItem?.id ?? null;
  const selectedItemIndex = visibleCardID ? indexes[visibleCardID] : undefined;

  useAnimatedReaction(
    () => selectedCardID.value,
    (currentSelection, previousSelection) => {
      if (currentSelection === previousSelection) {
        return;
      }

      detailsScrollY.value = 0;

      if (currentSelection !== null) {
        if (detailsOpacity.value > 0) {
          scrollTo(scrollViewRef, 0, 0, false);
        }
        detailsOpacity.value = 1;
        scheduleOnRN(updateSelectedID, currentSelection);
      } else {
        // Picks up whatever level the swipe faded to. Details stay mounted
        // through the fade so they can ride the card down; unmount once it
        // lands, unless a new card interrupted it.
        detailsOpacity.value = withTiming(
          0,
          DETAILS_FADE_OUT_TIMING,
          finished => {
            if (finished) {
              scrollTo(scrollViewRef, 0, 0, false);
              scheduleOnRN(updateSelectedID, null);
            }
          },
        );
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    const isMounted = visibleCardID !== null;
    const isOpen = isMounted && selectedCardID.value === visibleCardID;
    const initialOffset = Math.abs(selectedCardInitialOffsetY.value);
    const openingOpacity = initialOffset
      ? interpolate(
          Math.abs(selectedCardOffsetY.value),
          [0, initialOffset],
          [1, 0],
          Extrapolation.CLAMP,
        )
      : 1;

    return {
      display: isMounted ? "flex" : "none",
      opacity: isOpen
        ? Math.min(openingOpacity, detailsOpacity.value)
        : detailsOpacity.value,
      transform: [
        {
          translateY: isMounted ? selectedCardOffsetY.value + swipeY.value : 0,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={detailsScrollGesture}>
      <Animated.ScrollView
        ref={scrollViewRef}
        style={[styles.container, animatedStyle]}
        contentContainerStyle={[styles.content, contentInsetStyle]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        {detailedItem && selectedItemIndex !== undefined
          ? renderDetails?.({ item: detailedItem, index: selectedItemIndex })
          : null}
      </Animated.ScrollView>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
  },
});

export default WalletDetailsScrollView;
