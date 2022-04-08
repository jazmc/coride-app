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

export default function ResetPasswordScreen() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");

  const onResetPressed = () => {
    console.warn("reset pw pressed");
  };

  const onBackToLoginPressed = () => {
    console.warn("back 2 loginpressed");
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
          Vaihda salasanasi
        </Text>

        <CustomInput
          placeholder="Syötä sähköpostiin saamasi vahvistuskoodi"
          value={code}
          setValue={setCode}
        />

        <CustomInput
          placeholder="Uusi salasana"
          value={password}
          setValue={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Uusi salasana (uudelleen)"
          value={passwordagain}
          setValue={setPasswordagain}
          secureTextEntry={true}
        />

        <View style={styles.textContainer}>
          <Text style={{ color: colors.greyish }}>
            Jos et saanut sähköpostiisi koodia, tarkistathan ensin
            roskapostikansion.
          </Text>
        </View>

        <CustomButton
          text="Vahvista salasanan vaihto"
          bgcolor={colors.darkPrimary}
          onPress={onResetPressed}
        />
        <CustomButton
          text="Takaisin kirjautumissivulle"
          bgcolor="transparent"
          fontcolor={colors.darkPrimary}
          onPress={onBackToLoginPressed}
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
