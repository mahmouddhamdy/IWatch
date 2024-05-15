import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchMoviesByName } from "../redux/slices/movieSlice";

const SearchBar = () => {
  const [searchValue, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (text) => {
    setSearch(text);
    if (text === "") {
      dispatch(fetchMovies());
    } else {
      dispatch(fetchMoviesByName(text));
    }
  };
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.textInputStyle}
        value={searchValue}
        onChangeText={handleSearch}
        placeholder="Search.."
      ></TextInput>
      <IconButton icon="magnify" size={20}></IconButton>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "88%",
    margin: 25,
    marginTop: 20,
    backgroundColor: "white",
    shadowOpacity: 0,
    borderRadius: 15,
  },
  textInputStyle: {
    flex: 1,
    borderRadius: 15,
    height: 50,
    paddingHorizontal: 20,
  },
});

export default SearchBar;
