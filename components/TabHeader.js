import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../assets/Styles";
import { colors } from "../assets/Colors";

export default function TabHeader({ header, setDrawerOpen, drawerOpen }) {
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.rowFlex}>
      <Text style={[styles.h2Text, { color: colors.darkPrimary }]}>
        {header}
      </Text>
      <Icon name="map-marked" size={30} onPress={toggleDrawer} />
    </View>
  );
}
