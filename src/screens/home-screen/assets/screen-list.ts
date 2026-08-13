import { Routes, type RouteName } from "@navigation";

export type ScreenListEntry = {
  title: string;
  destination: RouteName;
};

export const SCREEN_LIST: ScreenListEntry[] = [
  { title: "📱 Contact List", destination: Routes.ContactList },
  { title: "⚙️ Adjustment Wheel", destination: Routes.AdjustmentWheel },
  { title: "🍏 Apple Wallet", destination: Routes.AppleWallet },
];
