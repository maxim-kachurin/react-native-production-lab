export const Routes = {
  Home: "Home",
  ContactList: "ContactList",
  AdjustmentWheel: "AdjustmentWheel",
  AppleWallet: "AppleWallet",
} as const;

export type RouteName = (typeof Routes)[keyof typeof Routes];
