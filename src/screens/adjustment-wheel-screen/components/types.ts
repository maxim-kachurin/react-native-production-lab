import { DerivedValue, SharedValue } from "react-native-reanimated";

type ProgressProps = {
  progress: SharedValue<number>;
};

export type RecyclingViewProps = {
  selectedIndex: SharedValue<number>;
  recyclingViewIndex: number;
  recyclingCenterIntervalIndex: DerivedValue<number>;
};

export type RecyclingIntervalViewProps = ProgressProps & RecyclingViewProps;

export type WheelProps = ProgressProps & {
  selectedIndex: SharedValue<number>;
  scrollX: SharedValue<number>;
};
