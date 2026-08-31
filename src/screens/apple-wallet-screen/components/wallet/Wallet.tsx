import { useMemo } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { DEFAULT_WALLET_LAYOUT, IS_IOS } from "./constants";
import WalletCard from "./WalletCard";
import WalletSwipeGesture from "./WalletSwipeGesture";
import WalletDetailsScrollView from "./WalletDetailsScrollView";
import type { WalletItemBase, WalletItemVariant, WalletProps } from "./types";

type WalletAdapter<T extends WalletItemBase> = {
  ids: string[];
  entities: Record<string, T>;
  indexes: Record<string, number>;
};

const Wallet = <T extends WalletItemBase>({
  data,
  renderItem,
  renderDetails,
  contentInset,
  layout,
}: WalletProps<T>) => {
  const { height: windowHeight } = useWindowDimensions();
  const cardHeight = layout?.cardHeight ?? DEFAULT_WALLET_LAYOUT.cardHeight;
  const expandedCardHeight =
    layout?.expandedCardHeight ?? DEFAULT_WALLET_LAYOUT.expandedCardHeight;
  const stackSpacing =
    layout?.stackSpacing ?? DEFAULT_WALLET_LAYOUT.stackSpacing;
  const selectedCard = useSharedValue(-1);
  const selectedCardID = useSharedValue<string | null>(null);
  const selectedItemVariant = useSharedValue<WalletItemVariant | null>(null);
  const selectedCardInitialOffsetY = useSharedValue(0);
  const selectedCardOffsetY = useSharedValue(0);
  const closingCard = useSharedValue(-1);
  const closingSwipeOffsetY = useSharedValue(0);
  const swipeY = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const detailsScrollY = useSharedValue(0);
  const detailsOpacity = useSharedValue(0);
  const detailsScrollGesture = useMemo(() => Gesture.Native(), []);
  const inTransition = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(
    e => (scrollY.value = e.contentOffset.y),
  );

  useAnimatedReaction(
    () => selectedCard.value,
    currentSelection => {
      if (currentSelection === -1) {
        // Offsets are left alone so the details view can animate out from them.
        // Every card press sets them again before the next open.
        selectedCardID.value = null;
        selectedItemVariant.value = null;
      }
    },
  );

  const scrollContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [-windowHeight / 2, 0],
            [-windowHeight / 2, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const store = useMemo<WalletAdapter<T>>(() => {
    return data.reduce<WalletAdapter<T>>(
      (result, item, index) => {
        result.ids.push(item.id);
        result.entities[item.id] = item;
        result.indexes[item.id] = index;

        return result;
      },
      { ids: [], entities: {}, indexes: {} },
    );
  }, [data]);

  return (
    <WalletSwipeGesture
      selectedCard={selectedCard}
      selectedItemVariant={selectedItemVariant}
      selectedCardOffsetY={selectedCardOffsetY}
      closingCard={closingCard}
      closingSwipeOffsetY={closingSwipeOffsetY}
      detailsOpacity={detailsOpacity}
      detailsScrollY={detailsScrollY}
      detailsScrollGesture={detailsScrollGesture}
      swipeY={swipeY}
      inTransition={inTransition}
      cardTop={contentInset?.top}
      cardHeight={cardHeight}
      windowHeight={windowHeight}>
      <View style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={{
            paddingTop: contentInset?.top,
            paddingBottom:
              cardHeight +
              stackSpacing * Math.max(store.ids.length - 1, 0) +
              (contentInset?.bottom ?? 0),
          }}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          scrollEnabled={selectedCard.value === -1}
          decelerationRate="fast">
          <Animated.View style={IS_IOS ? scrollContainerStyle : undefined}>
            {store.ids.map((id, index) => {
              const item = store.entities[id];

              return (
                <WalletCard
                  key={id}
                  id={id}
                  variant={item.variant}
                  cardStyle={item.cardStyle}
                  cardHeight={cardHeight}
                  expandedCardHeight={expandedCardHeight}
                  stackSpacing={stackSpacing}
                  windowHeight={windowHeight}
                  {...{
                    index,
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
                  }}>
                  {renderItem({ item, index })}
                </WalletCard>
              );
            })}
          </Animated.View>
        </Animated.ScrollView>

        <WalletDetailsScrollView
          entities={store.entities}
          indexes={store.indexes}
          renderDetails={renderDetails}
          selectedCardID={selectedCardID}
          selectedCardInitialOffsetY={selectedCardInitialOffsetY}
          selectedCardOffsetY={selectedCardOffsetY}
          detailsOpacity={detailsOpacity}
          detailsScrollY={detailsScrollY}
          detailsScrollGesture={detailsScrollGesture}
          swipeY={swipeY}
          cardHeight={cardHeight}
          topInset={contentInset?.top}
          bottomInset={contentInset?.bottom}
        />
      </View>
    </WalletSwipeGesture>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Wallet;
