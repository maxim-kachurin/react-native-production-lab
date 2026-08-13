import { Animated, StyleSheet } from "react-native";
import { theme } from "../../assets/theme";
import Mark from "./MarkView";
import { IntervalViewProps } from "./types";
import {
  ANDROID_MARK_WIDTH,
  CENTER_OPACITY,
  EDGE_OPACITY,
} from "../../assets/config";
import {
  ANDROID_DRAW_ITEMS,
  ANDROID_INTERVAL_OFFSETS,
  ANDROID_ITEM_WIDTH,
  ANDROID_PERSPECTIVE_SHIFTS,
} from "../../core/android";

const IntervalView = ({ item, index, currentIndexNode }: IntervalViewProps) => {
  const indexDiff = Animated.subtract(currentIndexNode, index);
  return (
    <Animated.View
      style={[
        styles.item,
        {
          opacity: indexDiff.interpolate({
            inputRange: [
              -ANDROID_DRAW_ITEMS,
              -ANDROID_DRAW_ITEMS + 1,
              -ANDROID_DRAW_ITEMS + 5,
              0,
              ANDROID_DRAW_ITEMS - 5,
              ANDROID_DRAW_ITEMS - 1,
              ANDROID_DRAW_ITEMS,
            ],
            outputRange: [
              0,
              EDGE_OPACITY,
              CENTER_OPACITY,
              CENTER_OPACITY,
              CENTER_OPACITY,
              EDGE_OPACITY,
              0,
            ],
            extrapolate: "clamp",
          }),
          transform: [
            {
              translateX: indexDiff.interpolate({
                inputRange: ANDROID_INTERVAL_OFFSETS,
                outputRange: ANDROID_PERSPECTIVE_SHIFTS,
                extrapolate: "clamp",
              }),
            },
          ],
        },
      ]}>
      <Mark
        item={item}
        width={ANDROID_MARK_WIDTH}
        color={theme.colors.offWhite}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: ANDROID_ITEM_WIDTH,
    justifyContent: "center",
  },
});

export default IntervalView;
