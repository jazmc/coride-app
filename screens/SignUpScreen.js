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
import { setUsersNames } from "../assets/HelperFunctions";
import { getFirestore } from "firebase/firestore";

export default function SignUpScreen({ setIsLoggedIn }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordagain, setPasswordagain] = useState("");
  const [noMatchError, setNoMatchError] = useState(false);
  const [weakPasswordError, setWeakPasswordError] = useState(false);

  const navigation = useNavigation();

  const db = getFirestore();
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
    if (firstName == "" || lastName == "" || email == "" || password == "") {
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
            setUsersNames(db, userCredential.user.uid, firstName, lastName);
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
            header: "S??hk??posti k??yt??ss??",
            message:
              "S??hk??postille l??ytyi jo olemassaoleva k??ytt??j??tili j??rjestelm??st??mme, joten uuden k??ytt??j??tilin luonti ep??onnistui. Jos et muista salasanaasi, voit palauttaa sen k??ytt??m??ll?? 'unohdin salasanani'-toimintoa.",
            navPrimary: "Login",
            navPrimaryText: "Siirry kirjautumaan",
          });
        } else {
          navigation.navigate("Error Screen", {
            header: errorCode,
            message: errorMessage,
            navPrimary: "Sign Up",
            navPrimaryText: "Palaa rekister??itymiseen",
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
          Rekister??idy
        </Text>

        <CustomInput
          placeholder="Etunimi tai kutsumanimi"
          value={firstName}
          setValue={setFirstName}
          icon="user"
        />

        <CustomInput
          placeholder="Sukunimi"
          value={lastName}
          setValue={setLastName}
          icon="user"
        />

        <CustomInput
          placeholder="S??hk??posti"
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
              Salasanan on oltava v??hint????n 6 merkki?? pitk??.
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
            <Text style={{ color: "red" }}>Salasanat eiv??t t??sm????!</Text>
          </View>
        ) : null}
        <CustomButton
          text="Rekister??idy"
          bgcolor={colors.darkPrimary}
          onPress={onRegisterPress}
        />

        <View style={styles.textContainer}>
          <Text style={{ color: colors.greyish }}>
            Rekister??itym??ll?? hyv??ksyt k??ytt??ehtomme ja yksityisyysk??yt??nt??mme.{" "}
            <Text onPress={onReadMorePress} style={styles.link}>
              Lue lis????.
            </Text>
          </Text>
        </View>

        <CustomButton
          bgcolor="transparent"
          fontcolor={colors.greyish}
          text="Onko sinulla jo k??ytt??j??tunnus? Kirjaudu sis????n"
          onPress={onLoginPressed}
        />

        <StatusBar style="auto" />
      </ScrollView>
    </LinearGradient>
  );
}
