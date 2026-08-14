import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { FAVORITES } from "../assets/contacts";
import FavoriteItem from "./FavoriteItem";
import Header from "./Header";
import { AnimatedFlashList, ListRenderItem } from "@shopify/flash-list";
import { s } from "@utils";
import { HEADER_HEIGHT_BASE, HEADER_HEIGHT_EXT } from "../assets/list-config";
import { Contact } from "./types";

const FavoriteList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  const renderFavoriteItem: ListRenderItem<Contact> = ({ item }) => {
    return <FavoriteItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <Header
        title="Favorites"
        subtitle={`${FAVORITES.length} contacts`}
        scrollY={scrollY}
      />
      <View style={styles.listContainer}>
        <AnimatedFlashList
          data={FAVORITES}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderFavoriteItem}
          numColumns={2}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContainer: {
    marginTop: HEADER_HEIGHT_BASE,
    flexGrow: 1,
  },
  content: { paddingTop: HEADER_HEIGHT_EXT },
});

export default FavoriteList;
