import { AnimatedFlashList, ListRenderItem } from "@shopify/flash-list";
import { useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { mvs, s } from "@utils";
import { HEADER_HEIGHT_BASE, HEADER_HEIGHT_EXT } from "../assets/list-config";
import { ContactRowType, Recent, RECENT_LIST } from "../assets/contacts";
import { theme } from "../assets/theme";
import ContactHeader from "./ContactHeader";
import ContactItem from "./ContactItem";
import Header from "./Header";

const RecentList = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  const renderItem: ListRenderItem<Recent | string> = ({ item }) => {
    switch (typeof item) {
      case "string":
        return <ContactHeader item={item} />;
      case "object":
        return (
          <ContactItem
            item={item.contact}
            titleColor={item.missed ? theme.colors.red : undefined}
          />
        );
      default:
        return null;
    }
  };

  const getItemType = (item: Recent | string) => {
    return typeof item === "string"
      ? ContactRowType.Header
      : ContactRowType.Contact;
  };

  const ListFooterComponent = () => <View style={styles.section} />;

  return (
    <View style={styles.container}>
      <Header title="Recent" subtitle={`3 missed`} scrollY={scrollY} />
      <View style={styles.listContainer}>
        <AnimatedFlashList
          data={RECENT_LIST}
          keyExtractor={(_, index) => String(index)}
          renderItem={renderItem}
          getItemType={getItemType}
          ListFooterComponent={ListFooterComponent}
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
  content: { paddingTop: HEADER_HEIGHT_EXT - s(100) },
  section: {
    height: s(56),
    paddingLeft: s(14),
    justifyContent: "center",
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: mvs(18),
    fontWeight: "500",
    color: theme.colors.white,
  },
});

export default RecentList;
