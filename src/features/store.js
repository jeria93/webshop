import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice.js";
import loginReducer from "./loginSlice.js";

export const store = configureStore({
  reducer: { cart: cartReducer,
              login: loginReducer,
  },
});
