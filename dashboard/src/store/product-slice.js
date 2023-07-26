import { createSlice } from "@reduxjs/toolkit";

const initialProductState = {
  id: "",
  name: "",
  price: "",
  variant: "",
  discount: "",
  mainImage: "",
  hoverImage: "",
  shortDescription: "",
  longDescription: "",
  additionalInformation: {
    weightInKg: "",
    dimenstions: "",
    materials: "",
    otherInfo: "",
    size: "",
  },
  colorVariant: [],
  reviews: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    addProduct(state, action) {
      return action.payload;
    },
    addVariant(state, action) {
      state.colorVariant.push(action.payload);
    },
  },
});

export const productSliceActions = productSlice.actions;

export default productSlice;