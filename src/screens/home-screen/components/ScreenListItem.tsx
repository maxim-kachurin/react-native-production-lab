import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { mvs, s } from "@utils";
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
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPress(item.destination)}>
      <Text style={styles.label}>{item.title}</Text>
      <Icon name="chevronForward" size={s(20)} color="darkGray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    marginHorizontal: s(20),
    paddingTop: mvs(25),
    paddingBottom: mvs(17),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
  },
  label: {
    color: colors.black,
    fontSize: mvs(16),
  },
});

export default ScreenListItem;
