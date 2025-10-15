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
          (cartItem) => cartItem.id === item.id && cartItem.type === item.type
        );
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push(item);
        }
      },
      prepare(movie, type) {
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
      const {id, type} = action.payload
      const existingItem = state.items.find((item) => item.id === id && item.type === type)
      existingItem.quantity += 1;
    },
    subQuantity: (state, action) => {
      const {id, type} = action.payload
      const existingItem = state.items.find((item) => item.id === id && item.type === type)
        if(existingItem.quantity <= 1){
          
          state.items = state.items.filter((cartItem) => !(cartItem.id === id && cartItem.type === type));
        }else {
          existingItem.quantity -= 1;
        }
    },
    removeFromCart: {
      reducer(state, action) {
        console.log("Reducer körs")
        const {id, type} = action.payload;
        state.items = state.items.filter((cartItem) => !(cartItem.id === id && cartItem.type === type));
      },
      prepare(id, type) {
        console.log("preapre");
        return { payload: {id, type} };
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
