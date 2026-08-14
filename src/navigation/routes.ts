export const Routes = {
  Home: "Home",
  HorizontalPager: "HorizontalPager",
  AdjustmentWheel: "AdjustmentWheel",
  AppleWallet: "AppleWallet",
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
