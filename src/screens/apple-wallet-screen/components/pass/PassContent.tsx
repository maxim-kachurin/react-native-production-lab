import { Flex, HStack } from "@components";
import { s } from "@utils";
import { Image, StyleSheet, View } from "react-native";
import { CARD_HEIGHT_CLOSED, CARD_HEIGHT_OPEN } from "../../assets/config";
import { BoardingPass } from "../../assets/demoData";
import {
  PassContentField,
  PassContentHeader,
  PassContentRoute,
  RouteIcon,
} from "./PassContentBlocks";

type PassContentProps = {
  item: BoardingPass;
};

const PassContent = ({ item }: PassContentProps) => {
  return (
    <Flex style={styles.container}>
      <View style={styles.cardTop}>
        <PassContentHeader
          airline={item.airline}
          flightNumber={item.flightNumber}
        />

        <HStack style={styles.routeContainer}>
          <PassContentRoute
            city={item.originCity}
            code={item.originCode}
            time={item.departureTime}
          />
          <RouteIcon />
          <PassContentRoute
            city={item.destinationCity}
            code={item.destinationCode}
            time={item.arrivalTime}
            alignItems="flex-end"
          />
        </HStack>
      </View>

      <Flex style={styles.cardBottom}>
        <View style={styles.boardingTopRow}>
          <PassContentField label="Boards" value={item.boardingTime} />
          <PassContentField
            label="Term"
            value={item.terminal}
            alignItems="center"
          />
          <PassContentField
            label="Gate"
            value={item.gate}
            alignItems="flex-end"
          />
        </View>

        <View style={styles.boardingBottomRow}>
          <PassContentField label="Passenger" value={item.passengerName} />
          <PassContentField
            label="Seat"
            value={item.seat}
            alignItems="flex-end"
          />
        </View>

        <View style={styles.barcodeContainer}>
          <Image
            source={item.barcode}
            style={styles.barcode}
            resizeMode="cover"
          />
        </View>
      </Flex>

      <View style={styles.borderOverlay} />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: "space-between", paddingHorizontal: s(18) },
  cardTop: {
    height: CARD_HEIGHT_CLOSED,
    justifyContent: "space-between",
    paddingTop: s(18),
    paddingBottom: s(18),
  },
  cardBottom: {
    height: CARD_HEIGHT_OPEN - CARD_HEIGHT_CLOSED,
    marginTop: s(14),
  },
  routeContainer: { alignItems: "center" },
  boardingTopRow: { flexDirection: "row", justifyContent: "space-between" },
  boardingBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: s(28),
  },
  barcodeContainer: {
    height: s(82),
    backgroundColor: "white",
    borderRadius: s(6),
    alignItems: "center",
    justifyContent: "center",
    marginTop: s(32),
  },
  barcode: { height: s(78), width: s(290) },
  borderOverlay: {
    ...StyleSheet.absoluteFill,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: s(12),
  },
});

export default PassContent;
