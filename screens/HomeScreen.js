import React, { useState, useEffect } from "react";
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
import {
  getFirestore,
  collection,
  query,
  doc,
  where,
  getDocs,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { getDocById } from "../assets/HelperFunctions";
import TabHeader from "../components/TabHeader";

export default function HomeScreen({
  usersStables,
  setUsersStables,
  currentStable,
  setCurrentStable,
}) {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  // sivunlatauksessa tehdään seuraavaa:
  useEffect(async () => {
    // pengo käyttäjän profiilin tiedot
    const userProfile = await getDocById(db, "users", user.uid);

    // pengo käyttäjän tallit
    const junctionsUsersStables = await getDocs(
      query(
        collection(db, "junction_users_stables"),
        where("uid", "==", user.uid),
        orderBy("primary", "desc")
      )
    );

    junctionsUsersStables.forEach(async (doc) => {
      const stable = await getDocById(db, "stables", doc.data().stable_id);
      setUsersStables((usersStables) => [
        ...usersStables,
        { id: doc.data().stable_id, data: stable },
      ]);
      if (
        "favorite_stable" in userProfile &&
        doc.data().stable_id == userProfile.favorite_stable
      ) {
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      } else if (
        !"favorite_stable" in userProfile &&
        Object.keys(currentStable).length == 0
      ) {
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      }
    });
  }, []);

  // kaikki tallit joihin käyttäjä on liittynyt

  const [stableKey, setStableKey] = useState("");

  return (
    <ScrollView
      style={[
        styles.tabViewContainer,
        Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
      ]}
    >
      <TabHeader
        header={
          (new Date().getHours() < 10 && new Date().getHours() >= 4
            ? "Huomenta, "
            : new Date().getHours() > 18
            ? "Iltaa, "
            : "Hei, ") +
          (user.displayName != null ? user.displayName : "CoRider" + "!")
        }
      />

      <View style={styles.textContainer}>
        <Text style={{ color: colors.blackish }}>
          Hmmm... Et nähtävästi ole vielä liittynyt yhdellekään
          CoRide-jäsentallille. Aloita matkasi CoRiderina syöttämällä
          talliavain, jonka saat tallin henkilökunnalta.
        </Text>
        {usersStables.map((stable, index) => (
          <Text key={index}>{stable.name}</Text>
        ))}
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
