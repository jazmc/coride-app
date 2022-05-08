import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "../assets/Styles";
import { colors } from "../assets/Colors";

export default function TabHeader({
  header,
  setDrawerOpen,
  drawerOpen,
  currentStable,
}) {
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <View style={styles.rowFlex}>
      <Text style={[styles.h2Text, { color: colors.darkPrimary }]}>
        {header}
      </Text>
      <ImageBackground
        source={{
          uri:
            currentStable != {} && currentStable.hasOwnProperty("data")
              ? currentStable.data.image
              : null,
        }}
        imageStyle={{ resizeMode: "cover" }}
        style={[
          styles.stableListIcon,
          {
            borderRadius: 50,
            marginHorizontal: 0,
            overflow: "hidden",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Icon
          name="map-marked"
          size={20}
          onPress={toggleDrawer}
          style={{ color: colors.offWhite }}
        />
      </ImageBackground>
    </View>
  );
}
