import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import AdjustmentWheelScreen from "@screens/adjustment-wheel-screen";
import HorizontalPagerScreen from "@screens/horizontal-pager-screen";
import AppleWalletScreen from "@screens/apple-wallet-screen";
import HomeScreen from "@screens/home-screen";

import { Routes } from "./routes";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: false,
};

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={Routes.Home} component={HomeScreen} />
      <Stack.Screen
        name={Routes.HorizontalPager}
        component={HorizontalPagerScreen}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.AdjustmentWheel}
        component={AdjustmentWheelScreen}
      />
      <Stack.Screen name={Routes.AppleWallet} component={AppleWalletScreen} />
    </Stack.Navigator>
  );
};
