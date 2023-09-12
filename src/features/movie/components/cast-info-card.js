import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getPoster } from "../../../services/movie/movie.service";
import { Colors } from "../constants/colors";
import { images } from "../constants/images";

export const CastInfoCard = ({ realName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: getPoster(image) } : images.NO_IMAGE}
        resizeMode={image ? "cover" : "contain"}
        style={styles.image}
      />
      <Text style={styles.realName} numberOfLines={2}>
        {realName}
      </Text>
      <Text style={styles.characterName} numberOfLines={2}>
        {characterName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 120,
    width: 80,
    borderRadius: 10,
  },
  realName: {
    width: 80,
    color: Colors.BLACK,
    fontWeight: "bold",
    fontSize: 12,
  },
  characterName: {
    width: 80,
    color: Colors.LIGHT_GRAY,
    fontWeight: "bold",
    fontSize: 10,
  },
});
