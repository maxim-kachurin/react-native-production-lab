import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { Icon } from "../icon";
import { IconName } from "../icon/icons";

type IconButtonProps = TouchableOpacityProps & {
  icon: IconName;
  height?: number;
  width?: number;
  iconSize?: number;
};

export const IconButton = ({
  icon,
  height,
  width,
  iconSize,
  style,
  ...props
}: IconButtonProps) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[styles.container, style, { height, width }]}
      {...props}>
      <Icon name={icon} size={iconSize} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
