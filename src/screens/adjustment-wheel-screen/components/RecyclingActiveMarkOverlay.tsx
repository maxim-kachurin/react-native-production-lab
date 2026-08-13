import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  INDEX_OFFSET,
  ITEM_HEIGHT,
  ITEM_WIDTH,
  LONG_MARK_HEIGHT,
  MARK_WIDTH,
  SHORT_MARK_SCALE,
} from "../assets/config";
import { theme } from "../assets/theme";
import { getIntervalOpacity, getIntervalTranslateX } from "../core/placement";
import { MARK_LEFT_WITHIN_INTERVAL, WHEEL_PADDING } from "../core/derived";

type ActiveMarkOverlayProps = {
  selectedIndex: SharedValue<number>;
  progress: SharedValue<number>;
};

const RecyclingActiveMarkOverlay = ({
  selectedIndex,
  progress,
}: ActiveMarkOverlayProps) => {
  const itemStyle = useAnimatedStyle(() => {
    const centerOffset = progress.value - selectedIndex.value;

    return {
      opacity: getIntervalOpacity(centerOffset),
      transform: [{ translateX: getIntervalTranslateX(centerOffset) }],
    };
  });

  const markStyle = useAnimatedStyle(() => {
    const value = selectedIndex.value + INDEX_OFFSET;
    return {
      transform: [{ scaleY: value % 5 === 0 ? 1 : SHORT_MARK_SCALE }],
    };
  });

  return (
    <Animated.View pointerEvents="none" style={[styles.item, itemStyle]}>
      <Animated.View style={[styles.mark, markStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: {
    position: "absolute",
    left: WHEEL_PADDING,
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    zIndex: 1,
  },
  mark: {
    position: "absolute",
    top: (ITEM_HEIGHT - LONG_MARK_HEIGHT + ITEM_WIDTH) / 2,
    left: MARK_LEFT_WITHIN_INTERVAL,
    width: MARK_WIDTH,
    height: LONG_MARK_HEIGHT,
    borderRadius: 2,
    backgroundColor: theme.colors.blue,
  },
});

export default RecyclingActiveMarkOverlay;
