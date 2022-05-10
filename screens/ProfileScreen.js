import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  View,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { colors } from "../assets/Colors";
import {
  getAuth,
  signOut,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import styles from "../assets/Styles";
import TabHeader from "../components/TabHeader";
import { setUsersNames, getDocById } from "../assets/HelperFunctions";

import { useNavigation } from "@react-navigation/native";
import CustomInput from "../components/CustomInput";
import CustomSnackBar from "../components/CustomSnackBar";
import { getFirestore } from "firebase/firestore";

export default function ProfileScreen({
  drawerOpen,
  setDrawerOpen,
  currentStable,
}) {
  const db = getFirestore();
  const auth = getAuth();
  const navigation = useNavigation();

  const [snackProperties, setSnackProperties] = useState({
    visible: false,
    message: "",
    bgcolor: "#78C491",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const logOutPressed = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const updateInfoPressed = () => {
    Keyboard.dismiss();
    if (firstName == "") {
      setSnackProperties({
        message: "Anna etunimi",
        visible: true,
        bgcolor: "#CC6854",
      });
      return;
    }
    if (lastName == "") {
      setSnackProperties({
        message: "Anna sukunimi.",
        visible: true,
        bgcolor: "#CC6854",
      });
      return;
    }

    setUsersNames(db, auth.currentUser.uid, firstName, lastName)
      .then(() => {
        setSnackProperties({
          bgcolor: "#78C491",
          message: "Päivitys onnistui.",
          visible: true,
        });
      })
      .catch((error) => {
        setSnackProperties({
          message: "Jokin meni pieleen.",
          visible: true,
          bgcolor: "#CC6854",
        });
        console.error(error);
      });
  };

  // hae käyttäjän nimet
  useEffect(async () => {
    const profileDoc = await getDocById(db, "users", auth.currentUser.uid);
    setFirstName(profileDoc.first_name);
    setLastName(profileDoc.last_name);
  }, []);

  return (
    <ScrollView
      style={[
        styles.tabViewContainer,
        Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
      ]}
      keyboardShouldPersistTaps="always"
    >
      <TabHeader
        header="Profiili"
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        currentStable={currentStable}
      />
      <Text style={[styles.h3Text, { color: colors.greyish }]}>
        Muokkaa tietojasi
      </Text>
      <CustomInput
        placeholder="Etunimi / kutsumanimi"
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
      <CustomButton
        text="Päivitä tiedot"
        bgcolor={colors.darkPrimary}
        onPress={updateInfoPressed}
      />
      <Text style={[styles.h3Text, { color: colors.greyish }]}>Toiminnot</Text>
      <CustomButton
        text="Kirjaudu ulos"
        bgcolor={colors.darkSecondary}
        onPress={logOutPressed}
      />
      <CustomButton
        text="Tilin hallinta"
        bgcolor="transparent"
        fontcolor={colors.darkSecondary}
        onPress={() => navigation.navigate("Tilin hallinta")}
        outlined={true}
      />
      <View testID="SNACKBAR" style={{ flex: 1, alignItems: "center" }}>
        <CustomSnackBar
          key={snackProperties.visible}
          snackmuuttujat={[snackProperties, setSnackProperties]}
          sidemenu={false}
        />
      </View>
    </ScrollView>
  );
}
