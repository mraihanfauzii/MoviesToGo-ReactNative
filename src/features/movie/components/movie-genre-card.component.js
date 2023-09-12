import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { Colors } from "../constants/colors";

const { width } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;

export const MovieGenreCard = ({ genreName, active, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: active ? Colors.ACTIVE : Colors.WHITE,
      }}
      activeOpacity={0.5}
      onPress={() => onPress(genreName)}
    >
      <Text
        style={{
          ...styles.genreText,
          color: active ? Colors.WHITE : Colors.BLACK,
        }}
      >
        {genreName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    elevation: 3,
    marginVertical: 2,
    width: setWidth(25),
  },
  genreText: {
    fontSize: 13,
    color: Colors.ACTIVE,
  },
});
