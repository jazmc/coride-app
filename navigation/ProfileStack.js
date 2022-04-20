import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ProfileScreen from "../screens/ProfileScreen";
import AccountSettings from "../screens/AccountSettings";

// side menu
import SideMenu from "react-native-side-menu-updated";
import StableList from "../components/StableList";

export default function ProfileStack({
  route,
  usersStables,
  setUsersStables,
  drawerOpen,
  setDrawerOpen,
  currentStable,
  setCurrentStable,
}) {
  const Stack = createNativeStackNavigator();

  const onItemSelected = (item) => {
    setDrawerOpen(false);
  };
  const menu = (
    <StableList
      onItemSelected={onItemSelected}
      usersStables={usersStables}
      currentStable={currentStable}
      setCurrentStable={setCurrentStable}
    />
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfilePage"
        children={() => (
          <SideMenu
            menu={menu}
            menuPosition="right"
            isOpen={drawerOpen}
            onChange={(drawerOpen) => setDrawerOpen(drawerOpen)}
            overlayColor="rgba(255,255,255,.8)"
          >
            <ProfileScreen
              usersStables={usersStables}
              setUsersStables={setUsersStables}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
            />
          </SideMenu>
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tilin hallinta" component={AccountSettings} />
    </Stack.Navigator>
  );
}
