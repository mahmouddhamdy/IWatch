import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../redux/slices/movieSlice";

const MovieDetails = ({ route }) => {
  const { id, title, backdrop_path, vote_average, overview, release_date } =
    route.params.movie;
  const releaseYear = release_date.substring(0, 4);

  const [isLiked, setIsLiked] = useState(null);
  const dispatch = useDispatch();
  const favouriteList = useSelector((state) => state.movies.favoriteMovies);

  const handleLikeChange = (liked) => {
    if (liked) {
      dispatch(addFavoriteMovie({ id, title, release_date, backdrop_path }));
    } else {
      dispatch(removeFavoriteMovie({ id, title, release_date, backdrop_path }));
    }
  };

  const toggleLike = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    handleLikeChange(newIsLiked);
  };

  useEffect(() => {
    favouriteList.forEach((movie) => {
      if (movie.id == id) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ImageBackground
        source={{ uri: `https://image.tmdb.org/t/p/w500${backdrop_path}` }}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 1)"]}
          style={styles.gradient}
        >
          <TouchableOpacity
            style={styles.heartIconContainer}
            onPress={toggleLike}
          >
            <MaterialIcons
              name={isLiked ? "favorite" : "favorite-border"}
              size={50}
              color={isLiked ? "red" : "white"}
            />
          </TouchableOpacity>
        </LinearGradient>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.year, { paddingBottom: 5 }]}>{releaseYear}</Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons
              name="star"
              size={14}
              color="gold"
              style={styles.starIcon}
            />
            <Text style={styles.rating}>{Math.floor(vote_average)}/10</Text>
          </View>
        </View>
      </ImageBackground>
      <Text style={styles.overview}>{overview}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    marginTop: 20,
    alignItems: "center",
    paddingBottom: 20,
  },
  container: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 2,
  },
  imageBackground: {
    width: "100%",
    height: 500,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    alignSelf: "center",
  },
  gradient: {
    position: "relative",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
    zIndex: 1,
    overflow: "hidden",
  },
  heartIconContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 3,
  },
  title: {
    fontSize: 22,
    paddingVertical: 5,
    paddingRight: 22,
    color: "ghostwhite",
    fontFamily: "Poppins",
    letterSpacing: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 5,
  },
  rating: {
    fontSize: 15,
    color: "ghostwhite",
    fontFamily: "Poppins",
    opacity: 0.9,
  },
  year: {
    fontSize: 20,
    color: "ghostwhite",
    fontFamily: "Poppins",
    opacity: 0.9,
  },
  overview: {
    fontSize: 14,
    color: "ghostwhite",
    paddingHorizontal: 20,
    opacity: 0.7,
    fontFamily: "Karla",
    marginVertical: 15,
  },
});

export default MovieDetails;
