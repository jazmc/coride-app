import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { colors } from "../assets/Colors";
import { getAuth, signOut } from "firebase/auth";

export default function ProfileScreen() {
  const auth = getAuth();

  const logOutPressed = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  return (
    <View>
      <Text>ProfileScreen</Text>
      <CustomButton
        text="Kirjaudu ulos"
        bgcolor={colors.darkSecondary}
        onPress={logOutPressed}
      />
    </View>
  );
}
