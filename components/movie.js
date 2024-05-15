import * as React from "react";
import { StyleSheet, ImageBackground, View } from "react-native";
import { Text } from "react-native-paper";

const imgPath = "https://image.tmdb.org/t/p/w500/";
const Movie = ({ movie }) => {
  return (
    <ImageBackground
      style={styles.cardBackground}
      imageStyle={{ borderRadius: 10, width: "100%" }}
      source={{ uri: `${imgPath}${movie.poster_path}` }}
    >
      <View style={styles.overlay}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  cardBackground: {
    margin: 25,
    width: "88%",
    height: 500,
    alignSelf: "center",
    borderRadius: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "ghostwhite",
    opacity: 0.8,
    letterSpacing: 6,
    textAlign: "center",
    margin: 1,
  },
});
export default Movie;
