import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-slice";
import pageSlice from "./page-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    page: pageSlice.reducer,
  },
});

export default store;
