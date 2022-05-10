import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
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
import CustomSnackBar from "../components/CustomSnackBar";
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
import LessonTable from "../components/LessonTable";

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
  const [snackProperties, setSnackProperties] = useState({
    visible: false,
    message: "",
    bgcolor: "#78C491",
  });

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
      if (
        "favorite_stable" in profileDoc &&
        doc.data().stable_id == profileDoc.favorite_stable
      ) {
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      } else if (
        "favorite_stable" in profileDoc === false &&
        Object.keys(currentStable).length == 0
      ) {
        setCurrentStable({ id: doc.data().stable_id, data: stable });
      }
    });
  };

  const joinStableAndUpdate = async () => {
    joinStableWithKey(db, stableKey, user.uid)
      .then(
        // onnistuu:
        async (resp) => {
          const junctionsUsersStables = await returnUsersStableDocs(
            db,
            user.uid
          );
          updateCurrentStable(junctionsUsersStables, userProfile);
        },
        // epäonnistuu:
        (resp) => {
          throw new Error("Virheellinen talliavain");
        }
      )
      .then(() =>
        setSnackProperties({
          bgcolor: "#78C491",
          message: "Tallille liittyminen onnistui.",
          visible: true,
        })
      )
      .catch((error) => {
        setSnackProperties({
          message: "Jokin meni pieleen.",
          visible: true,
          bgcolor: "#CC6854",
        });
      });
    setStableKey("");
  };

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
          (userProfile.first_name != null
            ? userProfile.first_name + "!"
            : "CoRider" + "!")
        }
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        currentStable={currentStable}
      />
      {Object.keys(userProfile).length > 0 &&
      Object.keys(currentStable).length < 1 ? (
        <>
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
          {stableKey != "" ? (
            <CustomButton
              text="Liity"
              bgcolor={colors.darkPrimary}
              onPress={joinStableAndUpdate}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {
        // jos current stable on asetettu, tulosta sen tiedot etusivulle
        Object.keys(currentStable).length > 0 ? (
          <View>
            <Text style={[styles.titleText, { color: colors.darkSecondary }]}>
              {
                // tallin otsikko / nimi
                currentStable.data.name
              }
            </Text>
            <Text style={[styles.h3Text, { color: colors.greyish }]}>
              Tallin ilmoitukset
            </Text>
            {
              // jos ilmoitukset-array ei ole tyhjä:
              currentStable.data.info.length > 0 ? (
                currentStable.data.info.map((msg, i) => (
                  <View key={i} style={styles.infoMessage}>
                    <Text>{msg}</Text>
                  </View>
                ))
              ) : (
                // jos ei ilmoituksia:
                <View style={styles.infoMessage}>
                  <Text>Ei ilmoituksia.</Text>
                </View>
              )
            }
            {
              // päivän ratsastustunnit
            }
            <Text style={[styles.h3Text, { color: colors.greyish }]}>
              Tunnit tänään
            </Text>
            <LessonTable currentStable={currentStable} />
          </View>
        ) : null
      }

      <View testID="SNACKBAR" style={{ flex: 1, alignItems: "center" }}>
        <CustomSnackBar
          key={snackProperties.visible}
          snackmuuttujat={[snackProperties, setSnackProperties]}
          sidemenu={false}
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}
