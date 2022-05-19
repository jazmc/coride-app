import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  ImageBackground,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../assets/Styles";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  doc,
  setDoc,
  getFirestore,
  where,
  collection,
  documentId,
  getDocs,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { colors } from "../assets/Colors";
import {
  getDocById,
  joinStableWithKey,
  returnUsersStableDocs,
} from "../assets/HelperFunctions";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import CustomSnackBar from "./CustomSnackBar";

export default function StableList({
  usersStables,
  setUsersStables,
  setCurrentStable,
  currentStable,
}) {
  const db = getFirestore();
  const uid = getAuth().currentUser.uid;
  const [userProfile, setUserProfile] = useState({});
  const [favoriteStable, setFavoriteStable] = useState("");
  const [stableKey, setStableKey] = useState("");
  const [stablesToMap, setStablesToMap] = useState(usersStables);

  const [snackProperties, setSnackProperties] = useState({
    visible: false,
    message: "",
    bgcolor: "#78C491",
  });

  const updateFavoriteStable = async (stable_id) => {
    try {
      const userDoc = doc(db, "users", uid);
      setDoc(userDoc, { favorite_stable: stable_id }, { merge: true });
      const usersOtherStables = query(
        collection(db, "junction_users_stables"),
        where("uid", "==", uid),
        where(documentId(), "!=", uid + "_" + stable_id)
      );
      const otherStables = await getDocs(usersOtherStables);

      otherStables.forEach(async (document) => {
        console.log(document.data());
        await setDoc(document.ref, { primary: false }, { merge: true });
      });

      setDoc(
        doc(db, "junction_users_stables", uid + "_" + stable_id),
        { primary: true },
        { merge: true }
      );
      setFavoriteStable(stable_id);
      setSnackProperties({
        bgcolor: "#78C491",
        message: "Suosikkitallin päivitys onnistui.",
        visible: true,
      });
    } catch (error) {
      setSnackProperties({
        ...snackProperties,
        message: "Jokin meni pieleen.",
        visible: true,
        bgcolor: "#CC6854",
      });
      console.log(error);
    }
  };

  const joinStableAndUpdate = async () => {
    joinStableWithKey(db, stableKey, uid)
      .then(
        // onnistuu:
        (resp) => setUsersStables([]),
        // epäonnistuu:
        (resp) => {
          throw new Error("Virheellinen talliavain");
        }
      )
      .then(
        async () => {
          const junctionsUsersStables = await returnUsersStableDocs(db, uid);

          junctionsUsersStables.forEach(async (doc) => {
            const stable = await getDocById(
              db,
              "stables",
              doc.data().stable_id
            );
            setUsersStables((usersStables) => [
              ...usersStables,
              { id: doc.data().stable_id, data: stable },
            ]);
          });
          setSnackProperties({
            bgcolor: "#78C491",
            message: "Tallille liittyminen onnistui.",
            visible: true,
          });
        },
        () => {
          throw new Error("Jokin meni pieleen");
        }
      )
      .catch((error) => {
        setSnackProperties({
          bgcolor: "#CC6854",
          message: "Tallille liittyminen epäonnistui.",
          visible: true,
        });
      });
    setStableKey("");
  };

  useEffect(async () => {
    const userDoc = await getDocById(db, "users", uid);
    setUserProfile(userDoc);
    setFavoriteStable(userDoc.favorite_stable);
  }, []);

  // päivitä tallilistaus
  useEffect(() => {
    setStablesToMap(usersStables);
  }, [usersStables]);

  return (
    <>
      <View
        style={[
          styles.drawer,
          Platform.OS == "ios" ? { paddingTop: styles.iosPadding } : null,
        ]}
      >
        <Text
          style={[
            styles.h2Text,
            { marginHorizontal: 10, color: colors.offWhite },
          ]}
        >
          Tallilistaus
        </Text>
        <ScrollView style={{ flex: 2 }}>
          {stablesToMap.map((stable, index) => (
            <TouchableHighlight
              key={index}
              style={[
                styles.stableListContainer,
                "id" in currentStable && currentStable.id == stable.id
                  ? {}
                  : { opacity: 0.5 },
              ]}
              onPress={() => setCurrentStable(stable)}
              onLongPress={() => updateFavoriteStable(stable.id)}
            >
              <ImageBackground
                source={{ uri: stable.data.image }}
                imageStyle={{ resizeMode: "cover" }}
                blurRadius={5}
                style={styles.stableListItem}
              >
                <Image
                  source={{ uri: stable.data.image }}
                  style={styles.stableListIcon}
                  resizeMode="cover"
                />
                <Text style={styles.stableListText}>{stable.data.name}</Text>
                <Icon
                  name="heart"
                  size={20}
                  color={colors.offWhite}
                  solid={favoriteStable != null && favoriteStable == stable.id}
                  style={{ textAlign: "right", marginRight: 10 }}
                  onPress={() => updateFavoriteStable(stable.id)}
                />
              </ImageBackground>
            </TouchableHighlight>
          ))}
        </ScrollView>
        <View style={[styles.drawerContent]}>
          <Text style={styles.h3Text}>Liity uudelle tallille</Text>
          <CustomInput
            value={stableKey}
            setValue={setStableKey}
            placeholder="A1B2-C3D4-E5F6"
            icon="key"
            outline={colors.darkPrimary}
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
        </View>
      </View>
      <CustomSnackBar
        key={snackProperties.visible}
        snackmuuttujat={[snackProperties, setSnackProperties]}
      />
    </>
  );
}

StableList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
