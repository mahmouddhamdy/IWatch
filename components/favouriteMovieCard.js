import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../redux/slices/movieSlice";

const FavouriteMovieCard = ({ movie }) => {
  const [isLiked, setIsLiked] = useState(null);
  const dispatch = useDispatch();
  const favouriteList = useSelector((state) => state.movies.favoriteMovies);

  const handleLikeChange = (liked) => {
    if (liked) {
      dispatch(addFavoriteMovie(movie));
    } else {
      dispatch(removeFavoriteMovie(movie));
    }
  };

  const toggleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    handleLikeChange(newIsLiked);
  };

  useEffect(() => {
    favouriteList.forEach((mov) => {
      if (mov.id == movie.id) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseYear}>{movie.release_date}</Text>
      </View>
      <TouchableOpacity onPress={toggleLike}>
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={30}
          color={isLiked ? "red" : "gray"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 40,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "PoppinsSemiBold",
  },
  releaseYear: {
    marginTop: 10,
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins",
  },
});

export default FavouriteMovieCard;
