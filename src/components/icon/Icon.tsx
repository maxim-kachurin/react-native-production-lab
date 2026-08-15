import { ColorName, colors } from "@theme";
import { IconName, icons } from "./icons";
import { s } from "@utils";

export type IconProps = {
  name: IconName;
  width?: number;
  height?: number;
  size?: number;
  color?: ColorName;
  customColor?: string;
};

export const Icon = ({
  name,
  size = s(24),
  height,
  width,
  color = "foreground",
  customColor,
}: IconProps) => {
  const SVGComponent = icons[name];
  const sizeProps = {
    height: height ?? size,
    width: width ?? size,
  };

  if (!SVGComponent) return null;

  return <SVGComponent {...sizeProps} color={customColor ?? colors[color]} />;
};
