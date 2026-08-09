import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
// import { RootNavigator } from "@navigation/index";
import { StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationContainer>
          <StatusBar backgroundColor="transparent" translucent={true} />
          {/* <RootNavigator /> */}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
