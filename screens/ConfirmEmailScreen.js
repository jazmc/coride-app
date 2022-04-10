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

import { getAuth, sendEmailVerification, signOut } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";

export default function ConfirmEmailScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();

  const auth = getAuth();

  const onConfirmedPressed = () => {
    if (auth.currentUser.emailVerified === true) {
      setIsLoggedIn(true);
      navigation.navigate("Home");
    } else {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          navigation.navigate("Login");
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  };

  const onEmailFailPressed = () => {
    sendEmailVerification(getAuth().currentUser).then(() => {
      // Email verification sent!
    });
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

        <View style={styles.textContainer}>
          <Text style={{ color: colors.blackish }}>
            Kiitos rekisteröitymisestäsi CoRideen!
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: colors.blackish }}>
            Ennen kuin voit käyttää sovelluksen ominaisuuksia, sinun on
            vahvistettava tilisi. Olet saanut sähköpostiisi linkin, jota
            seuraamalla voit vahvistaa käyttäjätiliisi liitetyn
            sähköpostiosoitteen. Kun saat sähköpostisi vahvistettua, paina
            ylempää painiketta kirjautuaksesi sisään uudelleen.
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: colors.blackish }}>
            Tarkistathan myös sähköpostisi roskapostikansion, jos linkki ei
            näytä tulleen perille. Voit pyytää uuden linkin alemmasta
            painikkeesta. Linkin perille tulossa saattaa kestää joitakin
            minuutteja.
          </Text>
        </View>

        <CustomButton
          text="Kirjaudu sisään uudelleen"
          bgcolor={colors.darkPrimary}
          onPress={onConfirmedPressed}
        />

        <CustomButton
          text="Lähetä linkki uudelleen"
          bgcolor="transparent"
          fontcolor={colors.darkPrimary}
          onPress={onEmailFailPressed}
          outlined={true}
        />

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
