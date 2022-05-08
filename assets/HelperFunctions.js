import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  collection,
  collectionGroup,
  query,
  where,
  getFirestore,
  getDoc,
  getDocs,
  doc,
  setDoc,
  arrayUnion,
  Timestamp,
  orderBy,
} from "firebase/firestore";

const getDocById = async (db, coll, id) => {
  const snap = await getDoc(doc(db, coll, id));
  if (snap.exists()) {
    return snap.data();
  } else return Promise.reject(Error(`No such document: ${coll}.${id}`));
};

const getEventsByDateAndId = async (db, stableId, date) => {
  const currentDate = new Date(date);
  const timeStamp = Timestamp.fromMillis(
    currentDate.setDate(currentDate.getDate() - 7)
  );
  var events = [];

  const eventRef = query(
    collectionGroup(db, "lessons"),
    where("stable_id", "==", stableId),
    where("startTime", ">=", timeStamp)
  );
  const snaps = await getDocs(eventRef);

  snaps.forEach(async (document) => {
    events.push({ id: document.id, data: document.data() });
  });
  return events;
};

const joinStableWithKey = async (db, key, uid) => {
  const keyDoc = query(collectionGroup(db, "keys"), where("key", "==", key));
  const snaps = await getDocs(keyDoc);

  console.log("noniiiin");

  if (snaps.empty === true) {
    console.log("Snaps empty:");
    return Promise.reject(Error("Virheellinen talliavain."));
  }

  snaps.forEach(async (document) => {
    const stableId = document.get("stable_id");
    const newRole = document.get("name");

    await setDoc(
      doc(db, "junction_users_stables", uid + "_" + stableId),
      {
        primary: false,
        role: arrayUnion(newRole),
        stable_id: stableId,
        uid: uid,
      },
      { merge: true }
    );
  });
};

const setUsersNames = async (db, uid, firstName, lastName) => {
  await setDoc(
    doc(db, "users", uid),
    {
      first_name: firstName,
      last_name: lastName,
    },
    { merge: true }
  );
};

const returnUsersStableDocs = async (db, uid) => {
  return await getDocs(
    query(
      collection(db, "junction_users_stables"),
      where("uid", "==", uid),
      orderBy("primary", "desc")
    )
  );
};

export {
  getDocById,
  joinStableWithKey,
  getEventsByDateAndId,
  setUsersNames,
  returnUsersStableDocs,
};
