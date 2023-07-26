import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    updateProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export const productsSliceAction = productsSlice.actions;
export default productsSlice;
