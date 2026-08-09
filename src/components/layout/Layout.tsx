import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { View, ViewProps } from "react-native";

export const Flex = ({ children, style, ...rest }: ViewProps) => (
  <View style={[{ flex: 1 }, style]} {...rest}>
    {children}
  </View>
);

export const SafeFlex = ({ children, style, ...rest }: SafeAreaViewProps) => (
  <SafeAreaView style={[{ flex: 1 }, style]} {...rest}>
    {children}
  </SafeAreaView>
);

export const HStack = ({ children, style, ...rest }: ViewProps) => (
  <View style={[{ flexDirection: "row" }, style]} {...rest}>
    {children}
  </View>
);
