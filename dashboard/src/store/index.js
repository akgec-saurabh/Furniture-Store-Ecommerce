import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import pageSlice from "./page-slice";
import productApi from "./product-api";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    page: pageSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

export default store;
