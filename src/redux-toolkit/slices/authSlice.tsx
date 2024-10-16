// src/store/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
    name: "",
    // Set to true to simulate being logged in
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
    },
    addName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { logIn, logOut, addName } = authSlice.actions;
export default authSlice.reducer;
