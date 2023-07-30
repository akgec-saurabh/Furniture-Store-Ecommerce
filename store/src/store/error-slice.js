import { createSlice } from "@reduxjs/toolkit";

const initalErrorState = {
  message: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState: initalErrorState,
  reducers: {
    setError(state, action) {
      state.message = action.payload;
    },
    clearError(state) {
      state.message = null;
    },
  },
});

export const errorSliceActions = errorSlice.actions;
export default errorSlice;
