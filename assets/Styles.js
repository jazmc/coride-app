import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "./Colors";

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    padding: 0,
    margin: 0,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 50,
    fontSize: 15,
  },
  logo: {
    maxHeight: 200,
    maxWidth: 200,
    width: "70%",
    overflow: "visible",
    marginVertical: 20,
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderColor: "#e9e9e9",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  input: {
    fontSize: 16,
    width: "100%",
  },
  inputIcon: {
    marginRight: 10,
  },
  buttonContainer: {
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
    width: "100%",
  },
  buttonText: {
    fontWeight: "bold",
  },
  titleText: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
  },
  h2Text: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
  },
  textContainer: {
    width: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  link: {
    color: colors.darkSecondary,
  },
});

export default styles;
