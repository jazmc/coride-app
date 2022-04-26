import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "./Colors";

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: colors.lightPrimary,
  },
  drawerContent: {
    margin: 10,
  },
  tabViewContainer: {
    flex: 1,
    paddingHorizontal: 10,
    margin: 0,
    width: "100%",
    fontSize: 15,
    backgroundColor: colors.background,
  },
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
  h3Text: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  stableListContainer: {
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOpacity: 0.7,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "#000",
    shadowRadius: 5,
    maxHeight: 60,
  },
  stableListItem: {
    paddingVertical: 5,
    width: "110%",
    height: "110%",
    paddingHorizontal: "5%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stableListIcon: {
    borderRadius: 25,
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  stableListText: {
    color: colors.offWhite,
    fontSize: 20,
    lineHeight: 0,
    flex: 1,
  },
  textContainer: {
    width: "100%",
    justifyContent: "flex-start",
    marginVertical: 10,
  },
  link: {
    color: colors.darkSecondary,
  },
  rowFlex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iosPadding: 40,
});

export default styles;
