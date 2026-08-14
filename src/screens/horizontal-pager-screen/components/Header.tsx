import { Animated, StyleSheet, Text, View } from "react-native";
import { mvs, s } from "@utils";
import {
  HEADER_HEIGHT_BASE,
  HEADER_HEIGHT_EXT,
  HEADER_TITLE_WIDTH,
} from "../assets/list-config";
import { theme } from "../assets/theme";
import { HeaderProps } from "./types";
import { Icon } from "@components";

const AnimatedText = Animated.createAnimatedComponent(Text);

const Header = ({ title, subtitle, scrollY }: HeaderProps) => {
  const titleContainerTY = scrollY.interpolate({
    inputRange: [-1, 0, HEADER_HEIGHT_EXT],
    outputRange: [0.9, 0, mvs(-56)],
    extrapolateRight: "clamp",
  });

  const titleScale = scrollY.interpolate({
    inputRange: [-s(150), 0, HEADER_HEIGHT_EXT],
    outputRange: [1.06, 1, 0.55],
    extrapolateRight: "clamp",
  });

  const subtitleTY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT_EXT],
    outputRange: [0, mvs(-15)],
    extrapolateRight: "clamp",
  });

  const buttonsTY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT_EXT],
    outputRange: [0, -HEADER_HEIGHT_EXT],
    extrapolateRight: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            transform: [{ translateY: titleContainerTY }],
          },
        ]}>
        <AnimatedText
          style={[
            styles.title,
            {
              transform: [
                { translateX: -HEADER_TITLE_WIDTH / 2 },
                { scale: titleScale },
                { translateX: HEADER_TITLE_WIDTH / 2 },
              ],
            },
          ]}>
          {title}
        </AnimatedText>
        <AnimatedText
          style={[
            styles.subtitle,
            { transform: [{ translateY: subtitleTY }] },
          ]}>
          {subtitle}
        </AnimatedText>
      </Animated.View>

      <Animated.View
        style={[
          styles.buttons,
          {
            transform: [{ translateY: buttonsTY }],
          },
        ]}>
        <Icon name="search" size={s(26)} color="white" />
        <Icon name="add" size={s(34)} color="white" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT_BASE + HEADER_HEIGHT_EXT,
    width: "100%",
    paddingTop: mvs(60),
    paddingLeft: s(20),
    position: "absolute",
    justifyContent: "space-between",
  },
  titleContainer: { width: HEADER_TITLE_WIDTH },
  title: { color: "white", fontSize: mvs(50), fontWeight: "700" },
  subtitle: {
    color: theme.colors.blueGray,
    fontSize: mvs(15),
    marginTop: mvs(2),
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: s(13),
    paddingRight: s(24),
    gap: s(33),
  },
});

export default Header;
