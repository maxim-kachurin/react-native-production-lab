import { memo, useMemo } from "react";
import { StyleSheet, View, Animated, ListRenderItem } from "react-native";
import { LONG_MARK_HEIGHT } from "../../assets/config";
import {
  ANDROID_ITEM_WIDTH,
  ANDROID_WHEEL_ITEMS,
  ANDROID_WHEEL_PADDING,
  ANDROID_WHEEL_WIDTH,
} from "../../core/android";
import { theme } from "../../assets/theme";
import IntervalView from "./IntervalView";
import { WheelProps, WheelItem } from "./types";

const Wheel = ({ scrollX }: WheelProps) => {
  const currentIndexNode = useMemo(
    () => Animated.divide(scrollX, ANDROID_ITEM_WIDTH),
    [scrollX],
  );

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
        useNativeDriver: true,
      }),
    [scrollX],
  );

  const renderItem: ListRenderItem<WheelItem> = ({ item, index }) => {
    return (
      <IntervalView
        item={item}
        index={index}
        currentIndexNode={currentIndexNode}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={ANDROID_WHEEL_ITEMS}
        snapToInterval={ANDROID_ITEM_WIDTH}
        snapToAlignment="start"
        keyExtractor={(_: any, index: any) => String(index)}
        renderItem={renderItem}
        onScroll={onScroll}
        scrollEventThrottle={16}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={false}
        getItemLayout={(_: any, index: number) => ({
          length: ANDROID_ITEM_WIDTH,
          offset: ANDROID_ITEM_WIDTH * index,
          index,
        })}
      />
      <View pointerEvents="none" style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ANDROID_WHEEL_WIDTH,
    marginTop: 4,
  },
  listContainer: { paddingHorizontal: ANDROID_WHEEL_PADDING },
  indicatorContainer: {
    width: ANDROID_ITEM_WIDTH,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    alignItems: "center",
  },
  indicator: {
    height: LONG_MARK_HEIGHT,
    borderRadius: 2,
    width: 2,
    backgroundColor: theme.colors.brightBlue,
  },
});

export default memo(Wheel);
