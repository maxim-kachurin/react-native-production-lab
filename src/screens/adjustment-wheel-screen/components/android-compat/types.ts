import { Animated } from "react-native";

export type WheelItem = {
  value: number;
  label: string;
};

export type MarkViewProps = {
  item: WheelItem;
  width: number;
  color: string;
};

export type IntervalViewProps = {
  item: WheelItem;
  index: number;
  currentIndexNode: Animated.AnimatedDivision<number>;
};

export type WheelProps = {
  scrollX: Animated.Value;
};
