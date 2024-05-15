import { useFonts } from "expo-font";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { fetchMoviesByCategory } from "../redux/slices/movieSlice";

const Categories = () => {
  let [fontsLoaded, fontError] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });
  const [selectedCategory, setSelectedCategory] = useState("now_playing");
  const dispatch = useDispatch();
  const handleCategoryPress = (categoryType) => {
    if (selectedCategory === categoryType) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryType);
      dispatch(fetchMoviesByCategory(categoryType));
    }
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.scrollViewStyle}
    >
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === "now_playing" && styles.selectedCategory,
        ]}
        onPress={() => handleCategoryPress("now_playing")}
      >
        <View style={styles.categoryContent}>
          <Text style={styles.categoryText}>Now Playing</Text>
          {selectedCategory === "now_playing" && (
            <View style={styles.selectedDot} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === "popular" && styles.selectedCategory,
        ]}
        onPress={() => handleCategoryPress("popular")}
      >
        <View style={styles.categoryContent}>
          <Text style={styles.categoryText}>Popular</Text>
          {selectedCategory === "popular" && (
            <View style={styles.selectedDot} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === "top_rated" && styles.selectedCategory,
        ]}
        onPress={() => handleCategoryPress("top_rated")}
      >
        <View style={styles.categoryContent}>
          <Text style={styles.categoryText}>Top Rated</Text>
          {selectedCategory === "top_rated" && (
            <View style={styles.selectedDot} />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.categoryContainer,
          selectedCategory === "upcoming" && styles.selectedCategory,
        ]}
        onPress={() => handleCategoryPress("upcoming")}
      >
        <View style={styles.categoryContent}>
          <Text style={styles.categoryText}>Upcoming</Text>
          {selectedCategory === "upcoming" && (
            <View style={styles.selectedDot} />
          )}
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    marginHorizontal: 15,
    marginVertical: 5,
  },
  categoryContainer: {
    margin: 10,
    borderRadius: 10,
  },
  categoryContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  categoryText: {
    fontFamily: "Poppins",
    color: "white",
    fontSize: 18,
    letterSpacing: 1,
    marginRight: 12,
  },

  selectedDot: {
    width: 10,
    height: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    marginTop: 5,
    marginRight: 12,
  },
});

export default Categories;
