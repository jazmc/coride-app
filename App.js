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
import HomeScreen from "./screens/HomeScreen";
import TermsOfUse from "./screens/TermsOfUse";
import ErrorScreen from "./screens/ErrorScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBcw5GKBGYC50tbub8kjlhM_wIcE0tqdIk",
  authDomain: "coride-app-dbd2b.firebaseapp.com",
  projectId: "coride-app-dbd2b",
  storageBucket: "coride-app-dbd2b.appspot.com",
  messagingSenderId: "75453118165",
  appId: "1:75453118165:web:13cf50f7b73bee5f93145c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Sign Up"
          component={SignUpScreen}
          initialParams={{ app: app, auth: auth }}
        />
        <Stack.Screen name="Confirm Email" component={ConfirmEmailScreen} />
        <Stack.Screen name="Terms of Use" component={TermsOfUse} />
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="Reset Password" component={ResetPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Error Screen" component={ErrorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
