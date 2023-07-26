import { createSlice } from "@reduxjs/toolkit";

const initalSideCartState = {
  open: false,
};

const sideCartSlice = createSlice({
  name: "sidecart",
  initialState: initalSideCartState,
  reducers: {
    toggleSideCart(state) {
      state.open = !state.open;
    },
  },
});

export const sideCartSliceActions = sideCartSlice.actions;
export default sideCartSlice;
