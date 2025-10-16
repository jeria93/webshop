import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: {
      reducer(state, action) {
        const existing = state.movies.find(
          (movie) => movie.id === action.payload.id
        );

        if (existing) {
          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload.id
          );
        } else {
          state.movies.push(action.payload);
        }
      },
      prepare(movie) {
        const id = Number(movie?.id);

        return {
          payload: {
            id,
            title: movie?.title ?? movie?.original_title ?? "No title",
            poster_path: movie?.poster_path ?? null,
          },
        };
      },
    },
    clearFavorites(state) {
      state.movies = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;

/* Selectors  */
export const selectFavorites = (state) => state.favorites.movies;
export const selectIsFavorite = (state, id) => {
  const normalizedId = Number(id);
  return state.favorites.movies.some((movie) => movie.id === normalizedId);
};