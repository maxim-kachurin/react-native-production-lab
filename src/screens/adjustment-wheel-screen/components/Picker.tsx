import { AnimatedText } from "@components";
import { StyleSheet, View } from "react-native";
import {
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { mvs, s } from "@utils";
import {
  INDEX_OFFSET,
  INITIAL_INDEX,
  ITEM_WIDTH,
  LENGTH,
} from "../assets/config";
import Wheel from "./Wheel";
import { useGatedHaptics } from "../hooks/useGatedHaptics";

const Picker = () => {
  const scrollX = useSharedValue(INITIAL_INDEX * ITEM_WIDTH);
  const progress = useDerivedValue(() => {
    return scrollX.value / ITEM_WIDTH;
  });
  const haptics = useGatedHaptics();
  const selectedIndex = useSharedValue(INITIAL_INDEX);

  useAnimatedReaction(
    () => Math.min(Math.max(0, progress.value), LENGTH - 1),
    minMaxProgress => {
      if (Math.abs(selectedIndex.value - minMaxProgress) > 0.5) {
        haptics.requestTick();
        selectedIndex.value = Math.round(minMaxProgress);
      }
    },
  );

  const headerTx = useDerivedValue(() => {
    return `${selectedIndex.value < 10 - INDEX_OFFSET ? "0" : ""}${
      selectedIndex.value + INDEX_OFFSET
    }:00`;
  });

  return (
    <View>
      <AnimatedText text={headerTx} style={styles.header} />
      <View style={styles.separator} />
      <Wheel
        scrollX={scrollX}
        progress={progress}
        selectedIndex={selectedIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: "white",
    fontSize: mvs(74),
    textAlign: "center",
    fontFamily: "Monda-Regular",
  },
  separator: {
    opacity: 0.3,
    width: s(270),
    backgroundColor: "white",
    height: 1,
    marginTop: mvs(-10),
    marginBottom: mvs(12),
    alignSelf: "center",
  },
});

export default Picker;
