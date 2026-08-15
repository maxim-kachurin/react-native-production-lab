import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { mvs, s, vs } from "@utils";
import { colors } from "@theme";
import { Icon } from "@components";
import { type RouteName } from "@navigation";
import { ScreenListEntry } from "../assets/screen-list";

export type ScreenListItemProps = {
  item: ScreenListEntry;
  onPress: (destination: RouteName) => void;
};

const ScreenListItem = ({ item, onPress }: ScreenListItemProps) => {
  return (
    <TouchableHighlight
      underlayColor={"#111111"}
      onPress={() => onPress(item.destination)}>
      <View style={styles.row}>
        <Text style={styles.label}>{item.title}</Text>
        <Icon name="chevronForward" size={s(20)} color="foregroundSecondary" />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: s(20),
    paddingTop: vs(23),
    paddingBottom: vs(23),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: colors.text,
    fontSize: mvs(16),
  },
});

export default ScreenListItem;
