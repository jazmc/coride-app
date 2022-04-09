import React, { useState } from "react";
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

export default function TermsOfUse() {
  return (
    <View>
      <Text>Terms of Use</Text>
      <StatusBar style="auto" />
    </View>
  );
}
