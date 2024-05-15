import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWUwM2RmYTRlNjAxZjEwOWFjMWVjNTM4YjU3MzEzOCIsInN1YiI6IjY2M2Y0ODRjN2RmYTJlNTQzMmQ1ZjU3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0PdlNRi0d5snaM8-PIf4Qkh66ayQdkR5NwYeBU-YDVY",
};
const initialState = {
  movies: [],
  favoriteMovies: [],
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing",
    {
      method: "GET",
      headers: headers,
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies.");
  }
  const data = await response.json();
  return data;
});

export const fetchMoviesByCategory = createAsyncThunk(
  "movies/fetchMoviesByCategory",
  async (category) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${category}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchMoviesByName = createAsyncThunk(
  "movies/fetchMoviesByName",
  async (name) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}`,
      {
        method: "GET",
        headers: headers,
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }
    const data = await response.json();
    return data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addFavoriteMovie(state, action) {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie(state, action) {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(fetchMoviesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = movieSlice.actions;

export default movieSlice.reducer;
