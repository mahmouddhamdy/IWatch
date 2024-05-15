import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import FavouriteMovieCard from "../components/favouriteMovieCard";

const FavoritesPage = () => {
  const favMovies = useSelector((state) => state.movies.favoriteMovies);
  return (
    favMovies && (
      <View>
        {favMovies.map((movie) => {
          return (
            <FavouriteMovieCard
              key={movie.id}
              movie={movie}
            ></FavouriteMovieCard>
          );
        })}
      </View>
    )
  );
};

const styles = StyleSheet.create({});

export default FavoritesPage;
