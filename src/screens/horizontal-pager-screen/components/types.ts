import { IconName } from "@components";
import { Animated } from "react-native";
import type { JSX } from "react";

/** Icon names with a matching outline pair. */
type IconNameWithOutline = {
  [K in IconName]: `${K}Outline` extends IconName ? K : never;
}[IconName];

export type AnimatedIcon = {
  iconName: IconNameWithOutline;
  iconSize: number;
  iconScaleFactor: number;
};

export type AnimatedTabProps = AnimatedIcon & {
  onPress: () => void;
  progress: Animated.AnimatedInterpolation<number>;
  index: number;
};

export type TabConfigItem = AnimatedIcon & {
  component: () => JSX.Element;
};

export type HeaderProps = {
  title: string;
  subtitle: string;
  scrollY: Animated.Value;
};

export type ContactHeaderProps = { item: string };

export type Contact = {
  firstName: string;
  lastName?: string;
  image?: any;
  color?: string;
  phoneNumber?: string;
  email?: string;
};

export type ContactListItem = {
  item: Contact;
  titleColor?: string;
};

export type SlideContainerProps = {
  item: TabConfigItem;
  index: number;
  progress: Animated.AnimatedInterpolation<number>;
};

export type TopBarProps = {
  onPress: (index: number) => void;
  progress: Animated.AnimatedInterpolation<number>;
};
