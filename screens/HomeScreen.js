import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
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
import { getAuth } from "firebase/auth";

export default function HomeScreen() {
  const auth = getAuth();

  const user = auth.currentUser;

  const [stableKey, setStableKey] = useState("");

  return (
    <ScrollView
      style={[
        styles.tabViewContainer,
        Platform.OS == "ios" ? { paddingTop: 30 } : null,
      ]}
    >
      <Text style={[styles.h2Text, { color: colors.darkPrimary }]}>
        {new Date().getHours() < 10 && new Date().getHours() >= 4
          ? "Huomenta"
          : new Date().getHours() > 18
          ? "Iltaa"
          : "Hei"}
        ,{" "}
        {user.displayName != null ? (
          user.displayName
        ) : (
          <Text style={{ fontStyle: "italic" }}>nimetön CoRider</Text>
        )}
        !
      </Text>

      <View style={styles.textContainer}>
        <Text style={{ color: colors.blackish }}>
          Hmmm... Et nähtävästi ole vielä liittynyt yhdellekään
          CoRide-jäsentallille. Aloita matkasi CoRiderina syöttämällä
          talliavain, jonka saat tallin henkilökunnalta.
        </Text>
      </View>
      <CustomInput
        value={stableKey}
        setValue={setStableKey}
        placeholder="A1B2-C3D4-E5F6"
        icon="key"
        outline={colors.darkSecondary}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}
