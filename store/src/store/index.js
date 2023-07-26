import { configureStore } from "@reduxjs/toolkit";
import sideCartSlice from "./sideCart-slice";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";
import productsSlice from "./products-slice";

const store = configureStore({
  reducer: {
    sideCart: sideCartSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
