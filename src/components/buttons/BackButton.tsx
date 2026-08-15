import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { IconButton, IconButtonProps } from "../icon-button";
import { s } from "@utils";

export type BackButtonProps = Omit<IconButtonProps, "icon">;

export const BackButton = ({
  iconColor = "white",
  iconSize = s(28),
  height = s(48),
  width = s(48),
  style,
  ...props
}: BackButtonProps) => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <IconButton
      icon="chevronBack"
      accessibilityLabel="Go back"
      onPress={navigation.goBack}
      iconColor={iconColor}
      iconSize={iconSize}
      height={height}
      width={width}
      style={[styles.container, { top: top || s(20) }, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: s(16),
  },
});
