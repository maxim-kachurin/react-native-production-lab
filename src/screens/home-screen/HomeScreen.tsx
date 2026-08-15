import { Screen } from "@components";
import {
  FlatList,
  ListRenderItem,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { Routes, RouteName, type ScreenProps } from "@navigation";
import ScreenListItem from "./components/ScreenListItem";
import { ScreenListEntry, SCREEN_LIST } from "./assets/screen-list";
import { mvs, s } from "@utils";
import { colors } from "@theme";

const HomeScreen = ({ navigation }: ScreenProps<typeof Routes.Home>) => {
  const handleItemPress = (destination: RouteName) => {
    navigation.navigate(destination);
  };

  const renderItem: ListRenderItem<ScreenListEntry> = ({ item }) => {
    return <ScreenListItem item={item} onPress={handleItemPress} />;
  };

  const ItemSeparatorComponent = () => {
    return <View style={styles.separator} />;
  };

  return (
    <Screen barStyle="light-content">
      <FlatList
        data={SCREEN_LIST}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: Platform.OS === "android" ? mvs(20) : 0,
  },
  separator: {
    height: 1,
    backgroundColor: colors.separator,
    marginHorizontal: s(20),
  },
});

export default HomeScreen;
