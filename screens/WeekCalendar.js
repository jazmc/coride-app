import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, ScrollView, Platform, Image } from "react-native";
import styles from "../assets/Styles";
import TabHeader from "../components/TabHeader";
import TimelineCalendarScreen from "../components/CalendarView";

export default function WeekCalendar({
  usersStables,
  setUsersStables,
  currentStable,
  setCurrentStable,
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <ScrollView
      style={[
        styles.tabViewContainer,
        Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
      ]}
    >
      <TabHeader
        header="Tuntikalenteri"
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
      <TimelineCalendarScreen />
      <StatusBar style="auto" />
    </ScrollView>
  );
}
