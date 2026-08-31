import { BackButton, Flex } from "@components";
import { StatusBar, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { s } from "@utils";
import {
  BACK_BUTTON_HEIGHT,
  CARD_HEIGHT_CLOSED,
  CARD_HEIGHT_OPEN,
  CARD_MARGIN,
} from "./assets/config";
import { WALLET_DATA } from "./assets/demoData";
import type { DemoWalletItem } from "./assets/demoData";
import PassContent from "./components/pass/PassContent";
import PaymentCardContent from "./components/payment-card/PaymentCardContent";
import TransactionDetails from "./components/payment-card/TransactionDetails";
import { Wallet } from "./components/wallet";
import type { WalletRenderItemInfo } from "./components/wallet";

const WalletRefactorScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  const renderWalletItem = ({ item }: WalletRenderItemInfo<DemoWalletItem>) => {
    switch (item.variant) {
      case "cardWithDetails":
        return (
          <PaymentCardContent
            title={item.card.title}
            image={item.card.image}
            textColor={item.card.textColor}
            lastFourDigits={item.card.lastFourDigits}
          />
        );
      case "expandableCard":
        return <PassContent item={item.pass} />;
      default:
        return null;
    }
  };

  const renderWalletDetails = ({
    item,
  }: WalletRenderItemInfo<DemoWalletItem>) => {
    switch (item.variant) {
      case "cardWithDetails":
        return <TransactionDetails transactions={item.transactions} />;
      case "expandableCard":
      default:
        return null;
    }
  };

  return (
    <Flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Wallet
        data={WALLET_DATA}
        renderItem={renderWalletItem}
        renderDetails={renderWalletDetails}
        layout={{
          cardHeight: CARD_HEIGHT_CLOSED,
          expandedCardHeight: CARD_HEIGHT_OPEN,
          stackSpacing: CARD_MARGIN,
        }}
        contentInset={{
          top: BACK_BUTTON_HEIGHT + top + s(20),
          bottom,
        }}
      />
      <BackButton height={BACK_BUTTON_HEIGHT} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: s(16),
  },
});

export default WalletRefactorScreen;
