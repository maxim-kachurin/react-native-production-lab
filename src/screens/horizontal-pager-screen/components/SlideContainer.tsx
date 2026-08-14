import { SCREEN_WIDTH } from "@constants";
import { Animated, StyleSheet } from "react-native";
import { SlideContainerProps } from "./types";

const SlideContainer = ({ item, index, progress }: SlideContainerProps) => {
  const RenderComponent = item.component;
  const opacity = progress.interpolate({
    inputRange: [index - 1, index - 0.75, index, index + 0.75, index + 1],
    outputRange: [0, 1, 1, 1, 0],
  });

  return (
    <Animated.View key={index} style={[styles.container, { opacity: opacity }]}>
      <RenderComponent />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    flexGrow: 1,
  },
});

export default SlideContainer;
