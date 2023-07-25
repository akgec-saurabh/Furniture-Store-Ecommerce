import { createSlice } from "@reduxjs/toolkit";

const intialCartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: intialCartState,
  reducers: {
    increaseQty(state, action) {
      const pid = action.payload.id;
      const productExist = state.cart.find((product) => product.id === pid);
      if (productExist) {
        //find index of product that exist
        const index = state.cart.findIndex((product) => product.id === pid);
        state.cart[index].qty += 1;
      }
    },
    decreaseQty(state, action) {
      const pid = action.payload.id;
      const productExist = state.cart.find((product) => product.id === pid);
      if (productExist) {
        //find index of product that exist
        const index = state.cart.findIndex((product) => product.id === pid);
        if (state.cart[index].qty === 1) {
          return;
        }
        state.cart[index].qty -= 1;
      }
    },

    addToCart(state, action) {
      const pid = action.payload.id;
      const productExist = state.cart.find((product) => product.id === pid);
      if (productExist) {
        //find index of product that exist
        const index = state.cart.findIndex((product) => product.id === pid);
        state.cart[index].qty += action.payload.qty;
      } else {
        state.cart = [...state.cart, action.payload];
      }
    },
    removeItemCart(state, action) {
      //find which item to remove
      const pid = action.payload.id;
      const productExist = state.cart.find((product) => product.id === pid);
      if (productExist) {
        state.cart = state.cart.filter((product) => product.id !== pid);
      }
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
