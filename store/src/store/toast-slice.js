import { createSlice } from "@reduxjs/toolkit";

const initalToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState: initalToastState,
  reducers: {
    toast(state, action) {
      state.toasts.push({
        head: action.payload.head,
        message: action.payload.message,
        type: action.payload.type,
        enable: true,
      });

      // state.head = action.payload.head;
      // state.message = action.payload.message;
      // state.type = action.payload.type;
      // state.enable = true;
    },

    clearingToast(state, action) {
      state.toasts = false;
    },
  },
});

export const toastSliceActions = toastSlice.actions;
export default toastSlice;
