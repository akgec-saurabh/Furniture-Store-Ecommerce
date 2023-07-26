import { configureStore } from "@reduxjs/toolkit";
import sideCartSlice from "./sideCart-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    sideCart: sideCartSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
