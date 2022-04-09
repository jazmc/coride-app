import React, { useState } from "react";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
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
// firebase imports
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyBcw5GKBGYC50tbub8kjlhM_wIcE0tqdIk",
    authDomain: "coride-app-dbd2b.firebaseapp.com",
    projectId: "coride-app-dbd2b",
    storageBucket: "coride-app-dbd2b.appspot.com",
    messagingSenderId: "75453118165",
    appId: "1:75453118165:web:13cf50f7b73bee5f93145c",
  };
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authParams = {
    auth: auth,
    authenticatedUser: authenticatedUser,
    setAuthenticatedUser: setAuthenticatedUser,
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("User " + user.email + " is signed in");
      setAuthenticatedUser(user);
    } else {
      setIsLoggedIn(false);
      console.warn("No user signed in");
      setAuthenticatedUser({});
    }
    console.log(authenticatedUser);
  });

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
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              initialParams={authParams}
            />
            <Stack.Screen
              name="Sign Up"
              component={SignUpScreen}
              initialParams={authParams}
            />
            <Stack.Screen name="Confirm Email" component={ConfirmEmailScreen} />
            <Stack.Screen name="Terms of Use" component={TermsOfUse} />
            <Stack.Screen
              name="Forgot Password"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="Reset Password"
              component={ResetPasswordScreen}
            />
            <Stack.Screen name="Error Screen" component={ErrorScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
