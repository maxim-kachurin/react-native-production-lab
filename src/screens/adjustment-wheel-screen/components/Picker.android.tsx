import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import { mvs, s } from "@utils";
import { INDEX_OFFSET } from "../assets/config";
import { ANDROID_ITEM_WIDTH, getHeaderText } from "../core/android";
import { useGatedHaptics } from "../hooks/useGatedHaptics";
import Wheel from "./android-compat/Wheel";

/**
 * Android note:
 * Reanimated 4 at this point in time (Aug '26) doesn't handle
 * animation of many elements on low-end Android devices well.
 * So for now we fallback to vanilla Animated API.
 */
const PickerAndroid = () => {
  const [headerTx, setHeaderTx] = useState(getHeaderText(0, INDEX_OFFSET));
  const scrollX = useRef(new Animated.Value(0)).current;
  const currentIndex = useRef(0);
  const haptics = useGatedHaptics();

  useEffect(() => {
    const subscription = scrollX.addListener(({ value }) => {
      const nextIndex = value / ANDROID_ITEM_WIDTH;

      if (Math.abs(currentIndex.current - nextIndex) > 0.5) {
        currentIndex.current = Math.round(nextIndex);
        haptics.requestTick();
        setHeaderTx(getHeaderText(currentIndex.current, INDEX_OFFSET));
      }
    });

    return () => scrollX.removeListener(subscription);
  }, [scrollX]);

  return (
    <View>
      <Text style={styles.header}>{headerTx}</Text>
      <View style={styles.separator} />
      <Wheel scrollX={scrollX} />
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

export default PickerAndroid;
