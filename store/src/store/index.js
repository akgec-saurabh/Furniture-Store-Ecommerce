import { configureStore } from "@reduxjs/toolkit";
import sideCartSlice from "./sideCart-slice";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";
import productsSlice from "./products-slice";
import countryApi from "./country-slice";
import productApi from "./product-api";
import checkoutFormSlice from "./ checkoutform-slice";
import toastSlice from "./toast-slice";

const store = configureStore({
  reducer: {
    sideCart: sideCartSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    checkoutForm: checkoutFormSlice.reducer,
    toast: toastSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(countryApi.middleware),
});

export default store;
