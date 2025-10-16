import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: {
      reducer(state, action) {
        const existing = state.items.find((item) => item.id === action.payload.id);
        if (existing) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        } else {
          state.items.push(action.payload);
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
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export const selectFavorites = (state) => state.favorites.items;
export const selectIsFavorite = (state, id) => state.favorites.items.some((item) => item.id === id);

export default favoritesSlice.reducer;
