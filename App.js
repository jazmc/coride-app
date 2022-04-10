import React, { useState, useEffect } from "react";
// navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// screens
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ConfirmEmailScreen from "./screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import TermsOfUse from "./screens/TermsOfUse";
import ErrorScreen from "./screens/ErrorScreen";
// firebase imports
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// navigation components
import TabNavigator from "./navigation/TabNavigator";

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

  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const auth = getAuth();
  const [authenticatedUser, setAuthenticatedUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [profileNotices, setProfileNotices] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User " + user.email + " is signed in");
        setAuthenticatedUser(user);
        if (user.emailVerified === true) {
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
        console.warn("No user signed in");
        setAuthenticatedUser({});
      }
    });
  }, []);

  useEffect(() => {
    setProfileNotices([
      !("displayName" in authenticatedUser == null),
      !("phoneNumber" in authenticatedUser == null),
    ]);
  }, [authenticatedUser]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              initialParams={{
                profileNotices: profileNotices,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              children={() => <LoginScreen setIsLoggedIn={setIsLoggedIn} />}
            />
            <Stack.Screen
              name="Sign Up"
              children={() => <SignUpScreen setIsLoggedIn={setIsLoggedIn} />}
            />
            <Stack.Screen name="Terms of Use" component={TermsOfUse} />
            <Stack.Screen
              name="Forgot Password"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="Reset Password"
              component={ResetPasswordScreen}
            />
            <Stack.Screen
              name="Confirm Email"
              children={() => (
                <ConfirmEmailScreen setIsLoggedIn={setIsLoggedIn} />
              )}
            />
            <Stack.Screen name="Error Screen" component={ErrorScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
