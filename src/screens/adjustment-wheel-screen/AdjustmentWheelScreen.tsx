import { BackButton, Screen } from "@components";
import { StyleSheet } from "react-native";
import Picker from "./components/Picker";
import { vs } from "@utils";

const AdjustmentWheelScreen = () => {
  return (
    <Screen barStyle="light-content" safeArea="none" style={styles.container}>
      <Picker />
      <BackButton />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: vs(42),
  },
});

export default AdjustmentWheelScreen;
