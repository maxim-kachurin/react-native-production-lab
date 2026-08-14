import { useRef } from "react";
import { Flex, SafeFlex } from "@components";
import { SCREEN_WIDTH } from "@constants";
import { Animated, StatusBar, StyleSheet } from "react-native";
import { TABS_CONFIG } from "./assets/tab-config";
import { theme } from "./assets/theme";
import SlideContainer from "./components/SlideContainer";
import TopBar from "./components/TopBar";
import { useLogMountToNextFrame } from "@utils";

const HorizontalPagerScreen = () => {
  useLogMountToNextFrame("HorizontalPagerScreen");
  const scrollX = useRef(new Animated.Value(0)).current;
  const progress = useRef(Animated.divide(scrollX, SCREEN_WIDTH)).current;

  const scrollRef = useRef<any>(null);
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: true },
  );
  const scrollToIndex = (index: number) => {
    scrollRef.current?.scrollTo({
      x: SCREEN_WIDTH * index,
      animated: true,
    });
  };

  return (
    <SafeFlex edges={["top"]} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TopBar progress={progress} onPress={scrollToIndex} />
      <Flex>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          bounces={false}
          onScroll={onScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          pagingEnabled={true}>
          {TABS_CONFIG.map((item, index) => (
            <SlideContainer
              item={item}
              index={index}
              progress={progress}
              key={index}
            />
          ))}
        </Animated.ScrollView>
      </Flex>
    </SafeFlex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
});

export default HorizontalPagerScreen;
