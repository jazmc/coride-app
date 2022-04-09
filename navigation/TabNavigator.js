import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import WeekCalendar from "../screens/WeekCalendar";
import ProfileScreen from "../screens/ProfileScreen";
import { getAuth } from "firebase/auth";

import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../assets/Colors";

export default function TabNavigator({ route }) {
  const Tab = createBottomTabNavigator();
  const auth = getAuth();

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
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={WeekCalendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-alt" color={color} size={size} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
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
        }}
      />
    </Tab.Navigator>
  );
}
