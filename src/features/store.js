import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import loginReducer from "./loginSlice.js";
import favoritesReducer from "./favoritesSlice.js";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
    favorites: favoritesReducer,
  },
});
