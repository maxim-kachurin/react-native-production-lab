import { Text, View, StyleSheet, FlexAlignType } from "react-native";
import { colors } from "@theme";
import Svg, { Path } from "react-native-svg";
import { mvs } from "@utils";

export const PassContentHeader = ({
  airline,
  flightNumber,
}: {
  airline: string;
  flightNumber: string;
}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.textBase, styles.airline]}>{airline}</Text>
      <PassContentField
        label="Flight"
        value={flightNumber}
        gap={2}
        alignItems="flex-end"
      />
    </View>
  );
};

export const PassContentField = ({
  label,
  value,
  gap = 5,
  alignItems,
}: {
  label: string;
  value: string;
  gap?: number;
  alignItems?: FlexAlignType;
}) => {
  return (
    <View style={{ alignItems, gap }}>
      <Text style={[styles.textBase, styles.labelBase, styles.fieldLabel]}>
        {label}
      </Text>
      <Text style={[styles.textBase, styles.fieldValue]}>{value}</Text>
    </View>
  );
};

export const PassContentRoute = ({
  city,
  code,
  time,
  alignItems = "flex-start",
}: {
  city: string;
  code: string;
  time: string;
  alignItems?: FlexAlignType;
}) => {
  return (
    <View style={[styles.routeContainer, { alignItems }]}>
      <Text style={[styles.textBase, styles.labelBase, styles.city]}>
        {city}
      </Text>
      <Text style={[styles.textBase, styles.code]}>{code}</Text>
      <Text style={[styles.textBase, styles.labelBase, styles.time]}>
        {time}
      </Text>
    </View>
  );
};

export const RouteIcon = ({ size = 36 }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 22">
      <Path
        d="M29 11 L8 1 L12.6 11 L8 21 Z"
        fill="white"
        stroke="white"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  textBase: { color: colors.text, fontFamily: "Switzer-Regular" },
  labelBase: { textTransform: "uppercase", opacity: 0.67 },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  airline: {
    fontSize: mvs(18),
    fontFamily: "Switzer-Bold",
    textTransform: "uppercase",
  },
  fieldLabel: { fontSize: mvs(10.5) },
  fieldValue: { fontSize: mvs(14.5) },

  routeContainer: { flex: 1 },
  city: { fontSize: mvs(9.5), letterSpacing: mvs(1.24) },
  code: { fontSize: mvs(42), fontFamily: "Switzer-Bold" },
  time: { fontSize: mvs(10.5) },
});
