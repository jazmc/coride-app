import React, { useState, useEffect } from "react";
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
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

export default function SignUpScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [noMatchError, setNoMatchError] = useState(false);
  const [weakPasswordError, setWeakPasswordError] = useState(false);

  const navigation = useNavigation();

  const auth = getAuth();

  useEffect(() => {
    if (password !== passwordagain) {
      setNoMatchError(true);
    } else {
      setNoMatchError(false);
    }
    if (password != "" && password.length < 6) {
      setWeakPasswordError(true);
    } else {
      setWeakPasswordError(false);
    }
  }, [password, passwordagain]);

  const onRegisterPress = () => {
    if (noMatchError === true || weakPasswordError === true) {
      return false;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // success -> automatic sign in
        sendEmailVerification(userCredential.user)
          .then(() => {
            // Email verification sent!
            setIsLoggedIn(false);
          })
          .then(() => {
            navigation.navigate("Confirm Email");
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode);

        if (errorCode == "auth/email-already-in-use") {
          navigation.navigate("Error Screen", {
            header: "Sähköposti käytössä",
            message:
              "Sähköpostille löytyi jo olemassaoleva käyttäjätili järjestelmästämme, joten uuden käyttäjätilin luonti epäonnistui. Jos et muista salasanaasi, voit palauttaa sen käyttämällä 'unohdin salasanani'-toimintoa.",
            navPrimary: "Login",
            navPrimaryText: "Siirry kirjautumaan",
          });
        } else {
          navigation.navigate("Error Screen", {
            header: errorCode,
            message: errorMessage,
            navPrimary: "Sign Up",
            navPrimaryText: "Palaa rekisteröitymiseen",
          });
        }
      });
  };

  const onReadMorePress = () => {
    navigation.navigate("Terms of Use");
  };

  const onLoginPressed = () => {
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      start={{ x: 0.4, y: 0.1 }}
      end={{ x: 0.6, y: 1.0 }}
      colors={[colors.lightSecondary, colors.lightPrimary]}
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
        <Text style={[styles.titleText, { color: colors.darkPrimary }]}>
          Rekisteröidy
        </Text>

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
        {weakPasswordError === true ? (
          <View style={styles.textContainer}>
            <Text style={{ color: "red" }}>
              Salasanan on oltava vähintään 6 merkkiä pitkä.
            </Text>
          </View>
        ) : null}

        <CustomInput
          placeholder="Salasana (uudelleen)"
          value={passwordagain}
          setValue={setPasswordagain}
          icon="lock"
          secureTextEntry={true}
        />
        {noMatchError === true ? (
          <View style={styles.textContainer}>
            <Text style={{ color: "red" }}>Salasanat eivät täsmää!</Text>
          </View>
        ) : null}
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
