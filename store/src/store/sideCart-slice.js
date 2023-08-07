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
    openSideCart(state) {
      state.open = true;
    },
    closeSideCart(state) {
      state.open = false;
    },
  },
});

export const sideCartSliceActions = sideCartSlice.actions;
export default sideCartSlice;
