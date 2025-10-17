import { createSlice } from "@reduxjs/toolkit";
import { buyPriceFromId, posterPriceFromId, priceFromId, rentPriceFromId } from "../utils/format.js";


//Sätt pris efter vilken köpform av film. hyr, köp eller poster
function setPricebyType(type,movie) {
        let price;

        switch(type){
          case "POSTER":
            price = posterPriceFromId(movie.id);
            console.log("Poster: ", price)
            break;
          case "PURCHASED":
            price = buyPriceFromId(movie.id);
             console.log("Köp: ", price)
            break;
          case "RENTAL":
            price = rentPriceFromId(movie.id);
             console.log("Hyr: ", price)
            break;
          default:
            break;
        }

        return price;
}


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
          if(item.type == "POSTER"){ //endast kunna öka antalet om det är posters
          existing.quantity += 1;
          }
        } else {
          state.items.push(item);
        }
      },
      prepare(movie, type) {
        const id = Number(movie?.id);
        const price = setPricebyType(type, movie);
        console.log(price)

        return {
          payload: {
            id,
            title: movie?.title ?? movie?.original_title ?? "No title",
            price,
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
        const {id, type} = action.payload;
        state.items = state.items.filter((cartItem) => !(cartItem.id === id && cartItem.type === type));
      },
      prepare(id, type) {
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
