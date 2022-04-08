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

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  const onResetPressed = () => {
    console.warn("reset pw pressed");
  };

  const onBackToLoginPressed = () => {
    console.warn("back 2 loginpressed");
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
          Palauta salasanasi
        </Text>

        <CustomInput
          placeholder="Syötä tiliisi liitetty sähköpostiosoite"
          value={email}
          setValue={setEmail}
        />

        <View style={styles.textContainer}>
          <Text style={{ color: colors.greyish }}>
            Jos antamallesi sähköpostiosoitteelle löytyy käyttäjätili, lähetämme
            sähköpostiisi koodin, jolla voit vaihtaa salasanasi. Tarkistathan
            myös roskapostikansion, jos koodi ei näytä tulleen sähköpostiisi.
            Sen saapumisessa voi kestää joitain minuutteja.
          </Text>
        </View>

        <CustomButton
          text="Palauta salasana"
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

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
