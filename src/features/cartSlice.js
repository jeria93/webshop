import { createSlice } from "@reduxjs/toolkit";
import { priceFromId } from "../utils/format.js";
import testImg from '../assets/batman.jpg'  //ta bort när det fungerar med alla knappar

/*Här har jag lagt till lite test data, ta bort när vi får det att fungera med köp, hyr mm. knappar*/
const sampleData = [
  {
    title: "Batman nr23",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 1
  },
  {
    title: "Superman nr5",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 1,
    id: 2
  },
  {
    title: "Spider-Man nr12",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 1,
    id: 3
  },
  {
    title: "Wonder Woman nr7",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 4
  },
  {
    title: "Iron Man nr10",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 1,
    id: 5
  },
  {
    title: "Thor nr8",
    quantity: 1,
    poster_logo: testImg,
    type: "RENTAL",
    price: 1,
    id: 6
  },
  {
    title: "Hulk nr15",
    quantity: 1,
    poster_logo: testImg,
    type: "POSTER",
    price: 1,
    id: 7

  },
  {
    title: "Black Widow nr3",
    quantity: 1,
    poster_logo: testImg,
    type: "MOVIE",
    price: 490,
    id: 8

  }
];

const initialState = { 
  items: sampleData,        //Ändra till items: [], när logiken med knappar
};

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
      prepare(movie) {
        const id = Number(movie?.id);
        return {
          payload: {
            id,
            title: movie?.title ?? movie?.original_title ?? "No title",
            price: priceFromId(id),
            poster_path: movie?.poster_path ?? null,
            quantity: 1,
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
      existingItem.quantity -= 1;
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
