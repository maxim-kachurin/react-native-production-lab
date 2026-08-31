# Wallet

Apple Wallet style interaction.

<img width="292" height="470" alt="appleWalletV2" src="https://github.com/user-attachments/assets/d1d8a9a6-2962-4b2a-9129-7e0e4a2dde2a" />

## Usage

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

## Dependencies

React Native Gesture Handler, Reanimated, and Worklets.

```sh
# npm
npm install react-native-gesture-handler react-native-reanimated react-native-worklets

# yarn
yarn add react-native-gesture-handler react-native-reanimated react-native-worklets

# pnpm
pnpm add react-native-gesture-handler react-native-reanimated react-native-worklets

# bun
bun add react-native-gesture-handler react-native-reanimated react-native-worklets
```

## API

Work in progress.

## License

MIT
