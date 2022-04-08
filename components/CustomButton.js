import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "../assets/Styles";

export default function CustomButton({
  bgcolor,
  fontcolor = "#fff",
  onPress,
  text,
  outlined = false,
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.buttonContainer,
        bgcolor ? { backgroundColor: bgcolor } : {},
        outlined === true ? { borderWidth: 1 } : {},
        fontcolor && outlined === true ? { borderColor: fontcolor } : {},
      ]}
    >
      <Text style={[styles.buttonText, fontcolor ? { color: fontcolor } : {}]}>
        {text}
      </Text>
    </Pressable>
  );
}
