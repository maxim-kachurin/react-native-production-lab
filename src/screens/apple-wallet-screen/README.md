# Wallet

Animated wallet cards with consumer-owned data and content.

```tsx
import { Text, View } from "react-native";
import { Wallet, type WalletItemBase } from "./components/wallet";

type Item = WalletItemBase & { title: string };

const data: Item[] = [
  {
    id: "personal-card",
    variant: "cardWithDetails",
    title: "Visa Signature",
    cardStyle: { backgroundColor: "#1C1C1E" },
  },
  {
    id: "pass",
    variant: "expandableCard",
    title: "Boarding Pass",
    cardStyle: { backgroundColor: "#007A96" },
  },
  {
    id: "business-card",
    variant: "cardWithDetails",
    title: "Mastercard World Elite",
    cardStyle: { backgroundColor: "#3A3A3C" },
  },
];

export const WalletScreen = () => (
  <View style={{ flex: 1, backgroundColor: "black", paddingHorizontal: 16 }}>
    <Wallet
      data={data}
      renderItem={({ item }) => (
        <Text style={{ color: "white", fontSize: 24, padding: 24 }}>
          {item.title}
        </Text>
      )}
      renderDetails={() => (
        <Text style={{ color: "white", fontSize: 18, padding: 24 }}>
          Recent activity
        </Text>
      )}
      contentInset={{ top: 80, bottom: 24 }}
    />
  </View>
);
```

Requires React Native Gesture Handler, Reanimated, and Worklets. See the
[Wallet reference guide](./components/wallet/README.md) for cards with details,
layout, insets, and the full API.

## License

MIT
