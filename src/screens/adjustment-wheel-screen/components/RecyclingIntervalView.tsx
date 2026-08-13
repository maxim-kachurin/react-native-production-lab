import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import {
  INDEX_OFFSET,
  LENGTH,
  LONG_MARK_HEIGHT,
  MARK_WIDTH,
  SHORT_MARK_SCALE,
} from "../assets/config";
import { theme } from "../assets/theme";
import { RecyclingIntervalViewProps } from "./types";
import RecyclingLabel from "./RecyclingLabel";
import {
  getAssignedMarkIndex,
  getMajorIndexForRecyclingView,
} from "../core/recycling";
import {
  MARK_LEFT_WITHIN_INTERVAL,
  MARK_TOP,
  WHEEL_PADDING,
} from "../core/derived";
import { getIntervalOpacity, getIntervalTranslateX } from "../core/placement";

const RecyclingIntervalView = ({
  recyclingCenterIntervalIndex,
  progress,
  recyclingViewIndex,
  selectedIndex,
}: RecyclingIntervalViewProps) => {
  const majorIndex = getMajorIndexForRecyclingView(recyclingViewIndex);

  const markStyle = useAnimatedStyle(() => {
    const assignedMarkIndex = getAssignedMarkIndex(
      recyclingCenterIntervalIndex.value,
      recyclingViewIndex,
    );

    // How far the mark from the current wheel position.
    const centerOffset = progress.value - assignedMarkIndex;
    const isValid = assignedMarkIndex >= 0 && assignedMarkIndex < LENGTH;
    const isMajor = isValid && (assignedMarkIndex + INDEX_OFFSET) % 5 === 0;

    return {
      opacity: isValid ? getIntervalOpacity(centerOffset) : 0,
      transform: [
        { translateX: getIntervalTranslateX(centerOffset) },
        { scaleY: isMajor ? 1 : SHORT_MARK_SCALE },
      ],
    };
  });

  return (
    <Animated.View style={[styles.mark, markStyle]}>
      {majorIndex !== null ? (
        <RecyclingLabel
          majorIndex={majorIndex}
          selectedIndex={selectedIndex}
          recyclingViewIndex={recyclingViewIndex}
          recyclingCenterIntervalIndex={recyclingCenterIntervalIndex}
        />
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  mark: {
    position: "absolute",
    left: WHEEL_PADDING + MARK_LEFT_WITHIN_INTERVAL,
    top: MARK_TOP,
    width: MARK_WIDTH,
    height: LONG_MARK_HEIGHT,
    overflow: "visible",
    borderRadius: 2,
    backgroundColor: theme.colors.white,
  },
});

export default RecyclingIntervalView;
