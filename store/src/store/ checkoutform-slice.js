import { createSlice } from "@reduxjs/toolkit";

const initialCheckoutFormSlice = {
  firstname: "",
  lastname: "",
  country: "",
  housenumber: "",
  apartment: "",
  state: "",
  city: "",
  zipcode: "",
  phone: "",
  email: "",
  error: {},
};

const checkoutFormSlice = createSlice({
  name: "checkoutform",
  initialState: initialCheckoutFormSlice,
  reducers: {
    updateForm(state, action) {
      state[action.payload.name] = action.payload.value;
      if (state[action.payload.name] === "") {
        state.error[action.payload.name] = "Required";
      } else {
        state.error[action.payload.name] = "";
      }
    },
  },
});

export const checkoutFormSliceActions = checkoutFormSlice.actions;
export default checkoutFormSlice;
