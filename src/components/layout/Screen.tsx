import {
  StatusBar,
  StyleSheet,
  type StatusBarStyle,
  type ViewProps,
} from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { colors, type ColorName } from "@theme";

export type ScreenSafeArea = "none" | "top" | "bottom" | "vertical";

export type ScreenProps = ViewProps & {
  safeArea?: ScreenSafeArea;
  statusBarStyle: StatusBarStyle;
  background?: ColorName;
};

const SAFE_AREA_EDGES = {
  none: [],
  top: ["top"],
  bottom: ["bottom"],
  vertical: ["top", "bottom"],
} satisfies Record<ScreenSafeArea, Edge[]>;

export const Screen = ({
  children,
  safeArea = "vertical",
  statusBarStyle,
  background,
  style,
  ...rest
}: ScreenProps) => (
  <SafeAreaView
    {...rest}
    edges={SAFE_AREA_EDGES[safeArea]}
    style={[
      styles.container,
      background && { backgroundColor: colors[background] },
      style,
    ]}>
    <StatusBar barStyle={statusBarStyle} />
    {children}
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
