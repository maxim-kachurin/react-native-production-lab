import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
} from "react-native-reanimated";
import { s } from "@utils";
import { Icon } from "@components";
import {
  INITIAL_INDEX,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  LENGTH,
  WHEEL_WIDTH,
} from "../assets/config";
import { theme } from "../assets/theme";
import { WheelProps } from "./types";
import { RECYCLING_VIEW_IDX } from "../core/recycling";
import IntervalRecyclingView from "./RecyclingIntervalView";
import RecyclingActiveMarkOverlay from "./RecyclingActiveMarkOverlay";

const Wheel = ({ scrollX, progress, selectedIndex }: WheelProps) => {
  const recyclingCenterIntervalIndex = useDerivedValue(() => {
    const clampedProgress = Math.min(Math.max(0, progress.value), LENGTH - 1);
    return Math.floor(clampedProgress + 0.5);
  });

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  return (
    <View style={styles.container}>
      <View style={styles.wheel}>
        <View style={styles.track}>
          {RECYCLING_VIEW_IDX.map(recyclingViewIndex => (
            <IntervalRecyclingView
              key={recyclingViewIndex}
              progress={progress}
              selectedIndex={selectedIndex}
              recyclingViewIndex={recyclingViewIndex}
              recyclingCenterIntervalIndex={recyclingCenterIntervalIndex}
            />
          ))}
          <Animated.ScrollView
            horizontal
            style={StyleSheet.absoluteFill}
            contentOffset={{ x: INITIAL_INDEX * ITEM_WIDTH, y: 0 }}
            snapToInterval={ITEM_WIDTH}
            snapToAlignment="start"
            onScroll={scrollHandler}
            scrollEventThrottle={8}
            showsHorizontalScrollIndicator={false}>
            <View style={styles.scrollSurface} />
          </Animated.ScrollView>
          <RecyclingActiveMarkOverlay
            progress={progress}
            selectedIndex={selectedIndex}
          />
        </View>
        <View style={styles.pointer}>
          <Icon name="caretUp" customColor={theme.colors.blue} size={s(19)} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 114,
    alignItems: "center",
    justifyContent: "center",
  },
  wheel: {
    width: WHEEL_WIDTH,
    flex: 1,
  },
  track: {
    width: WHEEL_WIDTH,
    height: ITEM_HEIGHT,
    overflow: "hidden",
  },
  scrollSurface: {
    width: (LENGTH - 1) * ITEM_WIDTH + WHEEL_WIDTH,
    height: ITEM_HEIGHT,
  },
  pointer: { alignSelf: "center", paddingTop: 2 },
});

export default Wheel;
