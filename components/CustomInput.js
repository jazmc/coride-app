import React from "react";
import { View, Text, TextInput, Platform } from "react-native";
import styles from "../assets/Styles";
import Icon from "react-native-vector-icons/FontAwesome5";
import { colors } from "../assets/Colors";

export default function CustomInput({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  icon,
  color,
  keyboardType = "default",
}) {
  return (
    <View style={styles.inputContainer}>
      {icon ? (
        <Icon
          name={icon}
          style={[
            styles.inputIcon,
            color ? { color: color } : { color: colors.darkPrimary },
          ]}
          size={18}
          solid
        />
      ) : null}
      <TextInput
        onChangeText={setValue}
        value={value}
        placeholder={placeholder}
        style={[styles.input, Platform.OS == "web" ? { outline: "none" } : {}]}
        secureTextEntry={secureTextEntry}
        returnKeyType="done"
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}
