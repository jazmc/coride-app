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

export default function ConfirmEmailScreen() {
  const [code, setCode] = useState("");

  const onRegisterPress = () => {
    console.warn("register pressed");
  };

  const onBackToSignUpPressed = () => {
    console.warn("back 2 sign up pressed");
  };

  const onEmailFailPressed = () => {
    console.warn("email fail pressed");
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
          Vahvista rekisteröitymisesi
        </Text>

        <CustomInput
          placeholder="Syötä sähköpostiin saamasi vahvistuskoodi"
          value={code}
          setValue={setCode}
        />

        <CustomButton
          text="Vahvista rekisteröityminen"
          bgcolor={colors.darkPrimary}
          onPress={onRegisterPress}
        />
        <CustomButton
          text="Takaisin rekisteröitymissivulle"
          bgcolor="transparent"
          fontcolor={colors.darkPrimary}
          onPress={onBackToSignUpPressed}
          outlined={true}
        />
        <CustomButton
          text="En saanut koodia sähköpostiini"
          bgcolor="transparent"
          fontcolor={colors.greyish}
          onPress={onEmailFailPressed}
        />

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
