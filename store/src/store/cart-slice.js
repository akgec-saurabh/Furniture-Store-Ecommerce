import { createSlice } from "@reduxjs/toolkit";

const intialCartState = {
  cart: [],
  total: 0,
  shipping: 10,
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

      state.total =
        state.cart.reduce(
          (total, product) => total + product.price * product.qty,
          0
        ) + state.shipping;
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

      state.total =
        state.cart.reduce(
          (total, product) => total + product.price * product.qty,
          0
        ) + state.shipping;
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

      state.total =
        state.cart.reduce(
          (total, product) => total + product.price * product.qty,
          0
        ) + state.shipping;
    },
    removeItemCart(state, action) {
      //find which item to remove
      const pid = action.payload.id;
      const productExist = state.cart.find((product) => product.id === pid);
      if (productExist) {
        state.cart = state.cart.filter((product) => product.id !== pid);
      }

      state.total =
        state.cart.reduce(
          (total, product) => total + product.price * product.qty,
          0
        ) + state.shipping;
    },
    setCart(state, action) {
      try {
        localStorage.setItem(
          "cart",
          JSON.stringify({
            cart: state.cart,
            total: state.total,
            shipping: state.shipping,
          })
        );
      } catch (error) {
        console.log(error);
      }
    },

    getCart(state) {
      let item;
      try {
        item = localStorage.getItem("cart");
      } catch (error) {
        console.log(error);
      }
      console.log(item);

      if (item) {
        const data = JSON.parse(item);
        state.cart = data.cart;
        state.total = data.total;
        state.shipping = data.shipping;
      }
    },

    removeCart(state) {
      let item;
      try {
        item = localStorage.removeItem("cart");
      } catch (error) {
        console.log(error);
      }
    },

    updateShipping(state, action) {
      state.shipping = action.payload;

      state.total =
        state.cart.reduce(
          (total, product) => total + product.price * product.qty,
          0
        ) + state.shipping;
    },
  },
});

export const cartSliceActions = cartSlice.actions;

export default cartSlice;
