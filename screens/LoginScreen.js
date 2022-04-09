import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, Image, useWindowDimensions, ScrollView } from "react-native";
import SvgComponent from "./../assets/Coridesvg";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import styles from "../assets/Styles";
import { colors } from "../assets/Colors";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignInPressed = () => {
    // validation
    //auth.signInWithEmailAndPassword();
    navigation.navigate("Home");
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate("Forgot Password");
  };

  const onSignUpPressed = () => {
    navigation.navigate("Sign Up");
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
        {Platform.OS === "ios" ? (
          <Image
            source={require("./../assets/coride.png")}
            style={[styles.logo, { height: height * 0.3 }]}
            resizeMode="contain"
          />
        ) : (
          <SvgComponent style={[styles.logo, { height: height * 0.3 }]} />
        )}
        <CustomInput
          placeholder="Sähköpostiosoite"
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
        <CustomButton
          bgcolor={colors.darkPrimary}
          fontcolor="#fff"
          text="Kirjaudu sisään"
          onPress={onSignInPressed}
        />
        <CustomButton
          bgcolor="transparent"
          fontcolor={colors.greyish}
          text="Unohdin salasanani"
          onPress={onForgotPasswordPressed}
        />
        <CustomButton
          bgcolor="transparent"
          fontcolor={colors.darkPrimary}
          text="Ei käyttäjätunnusta? Rekisteröidy"
          onPress={onSignUpPressed}
        />
        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
