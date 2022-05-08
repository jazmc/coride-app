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
import {
  getDocById,
  joinStableWithKey,
  returnUsersStableDocs,
} from "../assets/HelperFunctions";
import TabHeader from "../components/TabHeader";

export default function HomeScreen({
  usersStables,
  setUsersStables,
  currentStable,
  setCurrentStable,
  drawerOpen,
  setDrawerOpen,
}) {
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [userProfile, setUserProfile] = useState({});

  // sivunlatauksessa tehdään seuraavaa:
  useEffect(async () => {
    // pengo käyttäjän profiilin tiedot
    const profileDoc = await getDocById(db, "users", user.uid);
    setUserProfile(profileDoc);

    // pengo käyttäjän tallit
    const junctionsUsersStables = await returnUsersStableDocs(db, user.uid);

    updateCurrentStable(junctionsUsersStables, profileDoc);
  }, []);

  const updateCurrentStable = (junctionsUsersStables, profileDoc) => {
    junctionsUsersStables.forEach(async (doc) => {
      const stable = await getDocById(db, "stables", doc.data().stable_id);
      setUsersStables((usersStables) => [
        ...usersStables,
        { id: doc.data().stable_id, data: stable },
      ]);
      console.log("haara1");
      if (
        "favorite_stable" in profileDoc &&
        doc.data().stable_id == profileDoc.favorite_stable
      ) {
        console.log("haara2");
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      } else if (
        "favorite_stable" in profileDoc === false &&
        Object.keys(currentStable).length == 0
      ) {
        console.log("haara3");
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      }
    });
  };

  const joinStableAndUpdate = async () => {
    joinStableWithKey(db, stableKey, user.uid);
    const junctionsUsersStables = await returnUsersStableDocs(db, user.uid);
    updateCurrentStable(junctionsUsersStables, userProfile);
  };

  // kaikki tallit joihin käyttäjä on liittynyt

  const [stableKey, setStableKey] = useState("");

  console.log("currentStable:");
  console.log(currentStable);

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
          (userProfile.first_name != null
            ? userProfile.first_name + "!"
            : "CoRider" + "!")
        }
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        currentStable={currentStable}
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
      {stableKey != "" ? (
        <CustomButton
          text="Liity"
          bgcolor={colors.darkPrimary}
          onPress={joinStableAndUpdate}
        />
      ) : (
        <></>
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}
