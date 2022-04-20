import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const getDocById = async (db, coll, id) => {
  const snap = await getDoc(doc(db, coll, id));
  if (snap.exists()) {
    return snap.data();
  } else return Promise.reject(Error(`No such document: ${coll}.${id}`));
};

export { getDocById };
