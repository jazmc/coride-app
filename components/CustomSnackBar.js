import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Snackbar } from "react-native-paper";
import React, { useState, useEffect } from "react";
import { colors } from "../assets/Colors";

export default function CustomSnackBar({ snackmuuttujat }) {
  const [snackProperties, setSnackProperties] = snackmuuttujat;

  const onDismiss = () =>
    setSnackProperties({ ...snackProperties, visible: false });

  useEffect(() => {
    if (snackProperties.visible === true) {
      setTimeout(() => {
        setSnackProperties({ ...snackProperties, visible: false });
      }, 4000);
    }
  }, [snackProperties]);

  return (
    <Snackbar
      style={{
        backgroundColor: snackProperties.bgcolor,
        width: Dimensions.get("window").width - 120,
      }}
      visible={snackProperties.visible}
      duration={5}
      onDismiss={() => onDismiss}
      action={{
        label: "OK",
        onPress: () => {
          onDismiss();
        },
        color: colors.lightSecondary,
      }}
    >
      {snackProperties.message}
    </Snackbar>
  );
}
