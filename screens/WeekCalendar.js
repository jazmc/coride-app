import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import styles from "../assets/Styles";
import TabHeader from "../components/TabHeader";
import CalendarView from "../components/CalendarView";
import { colors } from "../assets/Colors";

export default function WeekCalendar({
  usersStables,
  setUsersStables,
  currentStable,
  setCurrentStable,
  drawerOpen,
  setDrawerOpen,
}) {
  return (
    <>
      <View
        style={[
          styles.tabViewContainer,
          Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
          { flex: "none" },
        ]}
      >
        <TabHeader
          header={currentStable.data.name}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
          currentStable={currentStable}
        />
      </View>
      <View style={{ flex: 5, backgroundColor: colors.background }}>
        <CalendarView currentStable={currentStable} />
      </View>
      <StatusBar style="auto" />
    </>
  );
}
