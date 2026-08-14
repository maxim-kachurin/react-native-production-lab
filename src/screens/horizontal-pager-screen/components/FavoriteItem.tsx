import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { mvs, s } from "@utils";
import { getFullName, getInitials } from "../assets/text-utils";
import { ContactListItem } from "./types";

const FavoriteItem = ({ item }: ContactListItem) => (
  <View
    style={[
      { backgroundColor: item.color },
      styles.container,
      !item.image && styles.nameContainer,
    ]}>
    {item.image ? (
      <>
        <Image source={item.image} style={styles.image} />
        <ImageBackground
          style={styles.gradientContainer}
          resizeMode="stretch"
          source={require("@assets/images/gradient.png")}>
          <Text style={styles.name}>
            {getFullName(item.firstName, item.lastName)}
          </Text>
        </ImageBackground>
      </>
    ) : (
      <>
        <Text style={styles.initials}>
          {getInitials(item.firstName, item.lastName)}
        </Text>
        <Text style={styles.name}>
          {getFullName(item.firstName, item.lastName)}
        </Text>
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { height: s(183), width: "100%" },
  image: { width: "100%", height: "100%" },
  nameContainer: {
    justifyContent: "flex-end",
    paddingBottom: mvs(20),
  },
  initials: {
    color: "white",
    fontWeight: "700",
    fontSize: mvs(84),
    paddingLeft: s(19),
    opacity: 0.25,
  },
  name: {
    color: "white",
    fontWeight: "500",
    fontSize: mvs(15),
    paddingLeft: s(19),
  },
  gradientContainer: {
    width: "100%",
    height: s(40),
    justifyContent: "center",
    position: "absolute",
    paddingBottom: s(4),
    bottom: 0,
  },
});

export default FavoriteItem;
