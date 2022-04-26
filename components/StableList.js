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
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { colors } from "../assets/Colors";
import { getDocById } from "../assets/HelperFunctions";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

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

  const updateFavoriteStable = (stable_id) => {
    const userDoc = doc(db, "users", uid);
    setDoc(userDoc, { favorite_stable: stable_id }, { merge: true });
    setFavoriteStable(stable_id);
  };

  useEffect(async () => {
    const userDoc = await getDocById(db, "users", uid);
    setUserProfile(userDoc);
    setFavoriteStable(userDoc.favorite_stable);
  }, []);

  return (
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
        {usersStables.map((stable, index) => (
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
          <CustomButton text="Liity" bgcolor={colors.darkPrimary} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

StableList.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
