import { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../context/UserContext";

import MyTabs from "./MyTabNavigator";
import LauncherScreen from "../screens/LauncherScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EnterOTPScreen from "../screens/EnterOTPScreen";
import SearchScreen from "../components/search/SearchScreen";
import Chatting from "../components/messages/Chatting";
import QRScanner from "../components/camera/QRScannerScreen";
import ProfileInformation from "../components/profile/ProfileInformation";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(UserContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={MyTabs} />
          <Stack.Screen
            name="ProfileInformation"
            component={ProfileInformation}
          />
          <Stack.Screen name="Chatting" component={Chatting} />
          <Stack.Screen name="QRScanner" component={QRScanner} />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ animation: "fade" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Launcher" component={LauncherScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="EnterOTPScreen" component={EnterOTPScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
