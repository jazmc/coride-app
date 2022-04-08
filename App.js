import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform, Image } from "react-native";
import SvgComponent from "./assets/Coridesvg";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import styles from "./assets/Styles";
import LoginScreen from "./screens/LoginScreen";
import WeekCalendar from "./screens/WeekCalendar";
import ProfileScreen from "./screens/ProfileScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/*<Tab.Navigator>
        <Tab.Screen name="Calendar" component={ConfirmEmailScreen} />
        <Tab.Screen name="Profile" component={SignUpScreen} />
        <Tab.Screen name="Home" component={LoginScreen} />
        <Tab.Screen name="FP" component={ForgotPasswordScreen} />
        <Tab.Screen name="RP" component={ResetPasswordScreen} />
      </Tab.Navigator>*/}
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
