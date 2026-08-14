import { StyleSheet, View } from "react-native";
import { s, vs } from "@utils";
import { TABS_CONFIG } from "../assets/tab-config";
import AnimatedTab from "./AnimatedTab";
import { TopBarProps } from "./types";

const TopBar = ({ onPress, progress }: TopBarProps) => {
  return (
    <View style={styles.container}>
      {TABS_CONFIG.map((item, index) => (
        <AnimatedTab
          iconName={item.iconName}
          iconSize={item.iconSize}
          iconScaleFactor={item.iconScaleFactor}
          onPress={() => onPress(index)}
          progress={progress}
          index={index}
          key={index}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: vs(12),
    paddingHorizontal: s(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default TopBar;
