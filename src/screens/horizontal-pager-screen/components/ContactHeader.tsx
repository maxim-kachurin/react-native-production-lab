import { StyleSheet, Text, View } from "react-native";
import { mvs, s } from "@utils";
import { theme } from "../assets/theme";
import { ContactHeaderProps } from "./types";

const ContactHeader = ({ item }: ContactHeaderProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    height: s(56),
    paddingLeft: s(14),
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: mvs(16),
    fontWeight: "600",
    color: theme.colors.offWhite,
  },
});

export default ContactHeader;
