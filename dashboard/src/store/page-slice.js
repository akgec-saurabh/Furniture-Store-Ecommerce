import { createSlice } from "@reduxjs/toolkit";

const initialPageState = {
  page: 1,
};

const pageSlice = createSlice({
  name: "name",
  initialState: initialPageState,
  reducers: {
    goToVariantPage(state) {
      state.page = 2;
    },
    goToAddNewProductPage(state) {
      state.page = 1;
    },
  },
});

export const pageSliceActions = pageSlice.actions;

export default pageSlice;
