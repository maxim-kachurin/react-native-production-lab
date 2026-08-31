import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type WalletItemVariant = "expandableCard" | "cardWithDetails";

export type WalletItemBase = {
  id: string;
  variant: WalletItemVariant;
  cardStyle?: StyleProp<ViewStyle>;
};

export type WalletRenderItemInfo<T extends WalletItemBase> = {
  item: T;
  index: number;
};

export type WalletItemRenderer<T extends WalletItemBase> = (
  info: WalletRenderItemInfo<T>,
) => ReactNode;

export type WalletContentInset = {
  top?: number;
  bottom?: number;
};

export type WalletLayout = {
  cardHeight: number;
  expandedCardHeight: number;
  stackSpacing: number;
};

export type WalletProps<T extends WalletItemBase> = {
  data: readonly T[];
  renderItem: WalletItemRenderer<T>;
  renderDetails?: WalletItemRenderer<T>;
  contentInset?: WalletContentInset;
  layout?: Partial<WalletLayout>;
};
