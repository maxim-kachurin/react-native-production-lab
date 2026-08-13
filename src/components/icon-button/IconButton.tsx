import { ColorName } from "@theme";
import { PressableSurface, PressableSurfaceProps } from "../pressable-surface";
import { Icon } from "../icon";
import { IconName } from "../icon/icons";

export type IconButtonProps = PressableSurfaceProps & {
  icon: IconName;
  iconSize?: number;
  iconColor?: ColorName;
};

export const IconButton = ({
  icon,
  iconSize,
  iconColor,
  ...props
}: IconButtonProps) => {
  return (
    <PressableSurface {...props}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </PressableSurface>
  );
};
