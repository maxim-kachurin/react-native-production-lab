import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
} from "react-native";
import Animated, {
  AnimatedStyle,
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

type AnimatedTextProps = {
  style?: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
  text: SharedValue<string>;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export const AnimatedText = ({ style, text }: AnimatedTextProps) => {
  const animatedProps = useAnimatedProps(() => {
    return { text: text.value, defaultValue: text.value };
  });

  return (
    <AnimatedTextInput
      animatedProps={animatedProps}
      style={[styles.text, style]}
      editable={false}
      focusable={false}
      underlineColorAndroid="transparent"
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
  },
});
