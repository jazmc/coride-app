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

export default function SignUpScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");

  const onRegisterPress = () => {
    console.warn("register pressed");
  };

  const onReadMorePress = () => {
    console.warn("read more pressed");
  };

  const onLoginPressed = () => {
    console.warn("login pressed");
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
        <Text style={[styles.titleText, { color: colors.darkPrimary }]}>
          Rekisteröidy
        </Text>

        <CustomInput
          placeholder="Käyttäjätunnus"
          value={username}
          setValue={setUsername}
          icon="user"
        />
        <CustomInput
          placeholder="Sähköposti"
          value={email}
          setValue={setEmail}
          icon="at"
        />
        <CustomInput
          placeholder="Salasana"
          value={password}
          setValue={setPassword}
          icon="lock"
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Salasana (uudelleen)"
          value={passwordagain}
          setValue={setPasswordagain}
          icon="lock"
          secureTextEntry={true}
        />

        <CustomButton
          text="Rekisteröidy"
          bgcolor={colors.darkPrimary}
          onPress={onRegisterPress}
        />

        <View style={styles.textContainer}>
          <Text style={{ color: colors.greyish }}>
            Rekisteröitymällä hyväksyt käyttöehtomme ja yksityisyyskäytäntömme.{" "}
            <Text onPress={onReadMorePress} style={styles.link}>
              Lue lisää.
            </Text>
          </Text>
        </View>

        <CustomButton
          bgcolor="transparent"
          fontcolor={colors.greyish}
          text="Onko sinulla jo käyttäjätunnus? Kirjaudu sisään"
          onPress={onLoginPressed}
        />

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
