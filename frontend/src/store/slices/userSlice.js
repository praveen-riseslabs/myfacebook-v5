import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  loginUser,
  registerUser,
} from "../thunks/userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loggedIn: false,
  },
  reducers: {
    //user logout
    logoutUser(state) {
      state.user = {};
      state.loggedIn = false;
      localStorage.removeItem("user");
    },
  },
  extraReducers(builder) {
    //case : registering new user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });

    //case : login user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    });

    //case : get user details
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
