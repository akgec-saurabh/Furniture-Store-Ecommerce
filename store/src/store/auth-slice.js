import { createSlice } from "@reduxjs/toolkit";

const initalAuthState = {
  email: null,
  firstname: null,
  token: null,
  authModalIsOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initalAuthState,
  reducers: {
    updateUserData(state, action) {
      const { firstname, email, token } = action.payload;
      state.firstname = firstname;
      state.email = email;
      state.token = token;
    },

    openAuthModal(state) {
      state.authModalIsOpen = true;
    },

    toggleAuthModal(state) {
      state.authModalIsOpen = !state.authModalIsOpen;
    },
    closeAuthModal(state) {
      state.authModalIsOpen = false;
    },

    openRegister(state) {
      state.isLogin = false;
    },
    onLogin(state) {
      state.isLogin = true;
    },

    getToken(state, action) {
      let data;
      try {
        data = localStorage.getItem("userData");
        if (!data) {
          throw new Error("Token is null");
        }

        // IF TOKEN FOUND AND IS NOT NULL
        const { firstname, email, token } = JSON.parse(data);
        state.firstname = firstname;
        state.email = email;
        state.token = token;
        console.log("Token Found and state updated");
      } catch (error) {
        console.log("Token not found ", error);
      }
    },

    clearToken(state) {
      try {
        localStorage.removeItem("userData");
      } catch (error) {
        console.log(error);
      }

      state.firstname = "";
      state.email = "";
      state.token = "";
    },
  },
});

export const authSliceActions = authSlice.actions;
export default authSlice;
