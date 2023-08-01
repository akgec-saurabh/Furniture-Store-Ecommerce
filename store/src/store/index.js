import { configureStore } from "@reduxjs/toolkit";
import sideCartSlice from "./sideCart-slice";
import cartSlice from "./cart-slice";
import authSlice from "./auth-slice";
import productsSlice from "./products-slice";
import errorSlice from "./error-slice";
import countryApi from "./country-slice";
import productApi from "./product-api";

const store = configureStore({
  reducer: {
    sideCart: sideCartSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    error: errorSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(countryApi.middleware),
});

export default store;
