import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import SvgComponent from "./../assets/Coridesvg";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import styles from "../assets/Styles";
import { colors } from "../assets/Colors";
import CustomButton from "../components/CustomButton";

import { useNavigation } from "@react-navigation/native";

export default function ResetPasswordScreen({ route }) {
  const header = route.params.header;
  const message = route.params.message;
  const navPrimary = route.params.navPrimary;
  const navPrimaryText = route.params.navPrimaryText;

  const navigation = useNavigation();

  const onNavPrimaryPressed = () => {
    navigation.navigate(navPrimary);
  };

  const onGoBackPressed = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      start={{ x: 0.4, y: 0.1 }}
      end={{ x: 0.6, y: 1.0 }}
      colors={["#ffddd2", "#83c5be"]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.h2Text, { color: colors.darkPrimary }]}>
          {header}
        </Text>

        <View style={styles.textContainer}>
          <Text style={{ color: "#000" }}>{message}</Text>
        </View>

        <CustomButton
          text={navPrimaryText}
          bgcolor={colors.darkPrimary}
          onPress={onNavPrimaryPressed}
        />
        <CustomButton
          text="Takaisin edelliselle sivulle"
          bgcolor="transparent"
          onPress={onGoBackPressed}
          outlined={true}
          fontcolor={colors.darkPrimary}
        />

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
