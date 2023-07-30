import { createSlice } from "@reduxjs/toolkit";

const initalAuthState = {
  userId: null,
  token: null,
  authModalOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalAuthState,
  reducers: {
    updateToken(state, action) {
      state.token = action.payload;
    },
    updateUserId(state, action) {
      state.userId = action.payload;
    },

    toggleAuthModal(state) {
      state.authModalOpen = !state.authModalOpen;
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
