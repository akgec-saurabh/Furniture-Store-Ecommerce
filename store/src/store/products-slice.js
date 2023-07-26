import { createSlice } from "@reduxjs/toolkit";

const initialProductsState = {
  products: [],
  activeProduct: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {
    updateProducts(state, action) {
      state.products = action.payload;
    },
    setActiveProduct(state, action) {
      state.activeProduct = action.payload;
    },
  },
});

export const productsSliceAction = productsSlice.actions;
export default productsSlice;
