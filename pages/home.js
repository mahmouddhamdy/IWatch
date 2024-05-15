import React, { useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/movie";
import { fetchMovies, fetchMoviesByCategory } from "../redux/slices/movieSlice";
import SearchBar from "../components/searchBar";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import Categories from "../components/categories";

const HomePage = () => {
  const movies = useSelector((state) => state.movies.movies);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(fetchMoviesByCategory("now_playing"));
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigate("MovieDetails", {
          movie: item,
        });
      }}
    >
      <Movie key={item.id} movie={item} />
    </TouchableOpacity>
  );
  return (
    <>
      <FlatList
        style={{ flex: 1 }}
        data={movies}
        ListHeaderComponent={
          <>
            <SearchBar></SearchBar>
            <Categories></Categories>
          </>
        }
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
};

export default HomePage;
