import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  ContactList: undefined;
  AdjustmentWheel: undefined;
  AdjustmentWheel_OG: undefined;
  AdjustmentWheel_OG_MOD: undefined;
  WheelTransform: undefined;
  WheelTransformCheckpoint: undefined;
  WheelTransformCheckpointOG: undefined;
  AppleWallet: undefined;
};

export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
