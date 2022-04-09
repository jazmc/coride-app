import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Platform,
  Image,
  useWindowDimensions,
  ScrollView,
  Alert,
} from "react-native";
import SvgComponent from "./../assets/Coridesvg";
import { LinearGradient } from "expo-linear-gradient";
import CustomInput from "../components/CustomInput";
import styles from "../assets/Styles";
import { colors } from "../assets/Colors";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const auth = getAuth();

  const onSignInPressed = () => {
    if (email == "" || password == "") {
      Alert.alert("Täytä molemmat kentät.");
      return false;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode);

        if (
          errorCode == "auth/user-not-found" ||
          errorCode == "auth/wrong-password"
        ) {
          navigation.navigate("Error Screen", {
            header: "Virheelliset tiedot",
            message: "Antamasi sähköpostiosoite tai salasana oli virheellinen.",
            navPrimary: "Login",
            navPrimaryText: "Yritä uudelleen",
          });
        } else if (errorCode == "auth/too-many-requests") {
          navigation.navigate("Error Screen", {
            header: "Liikaa kirjautumisyrityksiä",
            message:
              "Tähän tiliin liittyen on tehty lyhyen ajan sisään liikaa epäonnistuneita kirjautumisyrityksiä. Yritä myöhemmin uudelleen.",
            navPrimary: "Login",
            navPrimaryText: "Yritä uudelleen",
          });
        } else {
          navigation.navigate("Error Screen", {
            header: errorCode,
            message: errorMessage,
            navPrimary: "Login",
            navPrimaryText: "Palaa kirjautumissivulle",
          });
        }
      });
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
        keyboardShouldPersistTaps={"always"}
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
