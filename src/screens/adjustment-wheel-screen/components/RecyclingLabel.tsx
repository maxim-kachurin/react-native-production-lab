import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { RecyclingViewProps } from "./types";
import { theme } from "../assets/theme";
import { INDEX_OFFSET, ITEM_WIDTH, MARK_WIDTH } from "../assets/config";
import { getAssignedMarkIndex } from "../core/recycling";
import { StyleSheet } from "react-native";
import { MARK_LEFT_WITHIN_INTERVAL } from "../core/derived";

type RecyclingLabelProps = RecyclingViewProps & {
  majorIndex: number;
};

const RecyclingLabel = ({
  majorIndex,
  selectedIndex,
  recyclingViewIndex,
  recyclingCenterIntervalIndex,
}: RecyclingLabelProps) => {
  const labelStyle = useAnimatedStyle(() => {
    const index = getAssignedMarkIndex(
      recyclingCenterIntervalIndex.value,
      recyclingViewIndex,
    );
    return {
      opacity: index === majorIndex ? 1 : 0,
      color:
        selectedIndex.value === majorIndex
          ? theme.colors.blue
          : theme.colors.white,
    };
  });

  return (
    <Animated.Text style={[styles.label, labelStyle]}>
      {majorIndex + INDEX_OFFSET}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    top: -ITEM_WIDTH,
    left: -MARK_LEFT_WITHIN_INTERVAL,
    width: ITEM_WIDTH,
    color: theme.colors.white,
    fontSize: 13,
    lineHeight: ITEM_WIDTH,
    textAlign: "center",
  },
});

export default RecyclingLabel;
