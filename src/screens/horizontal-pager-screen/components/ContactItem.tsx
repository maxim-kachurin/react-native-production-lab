import { HStack } from "@components";
import { Image, StyleSheet, Text, View } from "react-native";
import { mvs, s, vs } from "@utils";
import {
  formatPhoneNumber,
  getFullName,
  getInitials,
} from "../assets/text-utils";
import { theme } from "../assets/theme";
import { ContactListItem } from "./types";

const ContactItem = ({ item, titleColor }: ContactListItem) => {
  return (
    <HStack style={styles.container}>
      {item.image ? (
        <Image source={item.image} style={styles.image} />
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              backgroundColor: item.color,
            },
          ]}>
          <Text style={styles.initials}>
            {getInitials(item.firstName, item.lastName)}
          </Text>
        </View>
      )}
      <View style={styles.nameContainer}>
        <Text style={[styles.name, !!titleColor && { color: titleColor }]}>
          {getFullName(item.firstName, item.lastName)}
        </Text>
        <Text style={styles.contactInfo}>
          {item.phoneNumber ? formatPhoneNumber(item.phoneNumber) : item.email}
        </Text>
      </View>
    </HStack>
  );
};

const styles = StyleSheet.create({
  container: { height: s(90) },
  image: { height: "100%", width: s(90) },
  initialsContainer: {
    height: "100%",
    width: s(90),
    paddingLeft: s(9),
    justifyContent: "flex-end",
  },
  initials: {
    color: "white",
    fontWeight: "600",
    fontSize: mvs(52),
    opacity: 0.5,
  },
  nameContainer: {
    backgroundColor: theme.colors.black,
    flexGrow: 1,
    justifyContent: "center",
    paddingLeft: s(32),
  },
  name: {
    color: theme.colors.white,
    fontWeight: "800",
    fontSize: mvs(16),
    marginBottom: vs(5),
  },
  contactInfo: {
    color: theme.colors.lightGray,
  },
});

export default ContactItem;
