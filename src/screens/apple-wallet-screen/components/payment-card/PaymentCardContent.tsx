import { colors } from "@theme";
import { mvs, s } from "@utils";
import { Image, StyleSheet, Text, View } from "react-native";
import type { ImageSourcePropType } from "react-native";

type PaymentCardContentProps = {
  title: string;
  image: ImageSourcePropType;
  textColor?: string;
  lastFourDigits: string;
};

const PaymentCardContent = ({
  title,
  image,
  textColor = colors.text,
  lastFourDigits,
}: PaymentCardContentProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.cardFace} resizeMode="cover" />

      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      <Text style={[styles.cardNumber, { color: textColor }]}>
        •••• {lastFourDigits}
      </Text>

      <View style={styles.borderOverlay} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: s(25),
    paddingVertical: s(22),
    borderRadius: s(12),
    overflow: "hidden",
  },
  borderOverlay: {
    ...StyleSheet.absoluteFill,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: s(12),
  },
  title: {
    fontSize: mvs(19),
    fontWeight: "700",
    textTransform: "uppercase",
  },
  cardFace: {
    ...StyleSheet.absoluteFill,
    // Clear intrinsic image dimensions so it fills the container with absoluteFill.
    width: undefined,
    height: undefined,
  },
  cardNumber: {
    fontSize: mvs(15),
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
    letterSpacing: mvs(0.5),
  },
});

export default PaymentCardContent;
