import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import { colors } from "../assets/Colors";
import { getAuth, signOut } from "firebase/auth";
import styles from "../assets/Styles";
import TabHeader from "../components/TabHeader";

import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen({ drawerOpen, setDrawerOpen }) {
  const auth = getAuth();
  const navigation = useNavigation();

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
    <ScrollView
      style={[
        styles.tabViewContainer,
        Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
      ]}
    >
      <TabHeader
        header="Profiili"
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
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
    </ScrollView>
  );
}
