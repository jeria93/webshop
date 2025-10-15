import { createSlice } from "@reduxjs/toolkit";
import { priceFromId } from "../utils/format.js";




const initialState = { 
  items: [],       
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      reducer(state, action) {
        const item = action.payload;
        const existing = state.items.find(
          (cartItem) => cartItem.id === item.id
        );
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push(item);
        }
      },
      prepare(movie, type = "RENTAL") {
        const id = Number(movie?.id);
        return {
          payload: {
            id,
            title: movie?.title ?? movie?.original_title ?? "No title",
            price: priceFromId(id),
            poster_path: movie?.poster_path ?? null,
            quantity: 1,
            type,
          },
        };
      },
    },
    addQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload)
      existingItem.quantity += 1;
    },
    subQuantity: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload)
        if(existingItem.quantity <= 1){
          const id = action.payload;
          state.items = state.items.filter((cartItem) => cartItem.id !== id);
        }else {
          existingItem.quantity -= 1;
        }
    },
    removeFromCart: {
      reducer(state, action) {
        const id = action.payload;
        state.items = state.items.filter((cartItem) => cartItem.id !== id);
      },
      prepare(id) {
        return { payload: Number(id) };
      },
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, addQuantity, subQuantity } = cartSlice.actions;
export default cartSlice.reducer;

/* Selectors */
export const selectCartItems = (state) => state.cart.items; // returns the cart items array. Starts empty (reducers add/remove)
export const selectCartCount = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0); //returns total items in cart, initial value is 0
export const selectCartTotal = (state) => state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0); // returns total sum in price in cart, initial value is 0
