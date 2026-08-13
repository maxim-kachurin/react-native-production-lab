import { Flex, BackButton } from "@components";
import { StatusBar, StyleSheet } from "react-native";
import { theme } from "./assets/theme";
import Picker from "./components/Picker";
import { vs } from "@utils";

const AdjustmentWheelScreen = () => {
  return (
    <Flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Picker />
      <BackButton />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: vs(42),
  },
});

export default AdjustmentWheelScreen;
