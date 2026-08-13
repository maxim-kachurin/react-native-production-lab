import { StyleSheet, Text, View } from "react-native";
import {
  ITEM_WIDTH,
  LONG_MARK_HEIGHT,
  SHORT_MARK_HEIGHT,
} from "../../assets/config";
import { MarkViewProps } from "./types";

const MarkView = ({ item, width, color }: MarkViewProps) => {
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.label}>
        {item.value % 5 == 0 ? item.label : null}
      </Text>
      <View
        style={[
          styles.mark,
          {
            backgroundColor: color,
            height: item.value % 5 == 0 ? LONG_MARK_HEIGHT : SHORT_MARK_HEIGHT,
            width,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mark: {
    borderRadius: 2,
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: 13,
    lineHeight: ITEM_WIDTH,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default MarkView;
