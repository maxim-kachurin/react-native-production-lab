import { SafeFlex } from "@components";
import {
  FlatList,
  ListRenderItem,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { Routes, RouteName, type ScreenProps } from "@navigation";
import ScreenListItem from "./components/ScreenListItem";
import { ScreenListEntry, SCREEN_LIST } from "./assets/screen-list";
import { mvs } from "@utils";

const HomeScreen = ({ navigation }: ScreenProps<typeof Routes.Home>) => {
  const handleItemPress = (destination: RouteName) => {
    navigation.navigate(destination);
  };

  const renderItem: ListRenderItem<ScreenListEntry> = ({ item }) => {
    return <ScreenListItem item={item} onPress={handleItemPress} />;
  };

  return (
    <SafeFlex>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={SCREEN_LIST}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeFlex>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: Platform.OS === "android" ? mvs(20) : 0,
  },
});

export default HomeScreen;
