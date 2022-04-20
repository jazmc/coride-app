import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import WeekCalendar from "../screens/WeekCalendar";
import ProfileStack from "../navigation/ProfileStack";
import StableList from "../components/StableList";
import SideMenu from "react-native-side-menu-updated";

import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../assets/Colors";

export default function TabNavigator({ route }) {
  const Tab = createBottomTabNavigator();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [usersStables, setUsersStables] = useState([]);
  const [currentStable, setCurrentStable] = useState({});

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
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.darkPrimary },
        tabBarInactiveTintColor: colors.lightPrimary,
        tabBarActiveTintColor: colors.offWhite,
        tabBarActiveBackgroundColor: "rgba(0,0,0,.1)",
      }}
    >
      <Tab.Screen
        name="Home2"
        children={() => (
          <SideMenu
            menu={menu}
            menuPosition="right"
            isOpen={drawerOpen}
            onChange={(drawerOpen) => setDrawerOpen(drawerOpen)}
            overlayColor="rgba(255,255,255,.8)"
          >
            <HomeScreen
              usersStables={usersStables}
              setUsersStables={setUsersStables}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              currentStable={currentStable}
              setCurrentStable={setCurrentStable}
            />
          </SideMenu>
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        children={() => (
          <SideMenu
            menu={menu}
            menuPosition="right"
            isOpen={drawerOpen}
            onChange={(drawerOpen) => setDrawerOpen(drawerOpen)}
            overlayColor="rgba(255,255,255,.8)"
          >
            <WeekCalendar
              usersStables={usersStables}
              setUsersStables={setUsersStables}
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              currentStable={currentStable}
              setCurrentStable={setCurrentStable}
            />
          </SideMenu>
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-alt" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => (
          <ProfileStack
            usersStables={usersStables}
            setUsersStables={setUsersStables}
            drawerOpen={drawerOpen}
            setDrawerOpen={setDrawerOpen}
            setCurrentStable={setCurrentStable}
            currentStable={currentStable}
          />
        )}
        options={{
          tabBarBadge: route.params.profileNotices.filter(
            (notice) => notice === true
          ).length,
          tabBarBadgeStyle: {
            backgroundColor: colors.darkSecondary,
            color: colors.offWhite,
          },
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} solid />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
