import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail, signOut } from "firebase/auth";
import CustomButton from "../components/CustomButton";
import { colors } from "../assets/Colors";
import styles from "../assets/Styles";
import CustomSnackBar from "../components/CustomSnackBar";

export default function AccountSettings() {
  const auth = getAuth();

  const [snackProperties, setSnackProperties] = useState({
    visible: false,
    message: "",
    bgcolor: "#78C491",
  });

  const onResetPressed = () => {
    // validate and send to email
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then(() => {
        // Password reset email sent!
        signOut(auth)
          .then(() => {
            // Sign-out successful.
          })
          .catch((error) => {
            setSnackProperties({
              message: "Jokin meni pieleen.",
              visible: true,
              bgcolor: "#CC6854",
            });
            console.error(error);
          });
      })
      .catch((error) => {
        setSnackProperties({
          message: "Jokin meni pieleen.",
          visible: true,
          bgcolor: "#CC6854",
        });
      });
  };

  return (
    <ScrollView
      style={styles.tabViewContainer}
      keyboardShouldPersistTaps="always"
    >
      <Text style={[styles.h3Text, { color: colors.greyish }]}>
        Salasanatoiminnot
      </Text>
      <CustomButton
        text="Lähetä salasanan vaihtolinkki"
        bgcolor={colors.darkPrimary}
        onPress={onResetPressed}
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
