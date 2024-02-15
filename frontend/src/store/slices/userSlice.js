import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  loginUser,
  registerUser,
  resetPassword,
  sendPasswordResetOtp,
  verifyPasswordResetOtp,
} from "../thunks/userThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    loggedIn: false,
    resetPassword: {}
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

    //case : send password reset request
    builder.addCase(sendPasswordResetOtp.fulfilled, (state, action) => {
      state.resetPassword = action.payload;
    });

    //case : verifying password reset otp
    builder.addCase(verifyPasswordResetOtp.fulfilled, (state, action) => {
      state.resetPassword = action.payload;
    });

    // : reset password
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.resetPassword = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
export const { logoutUser } = userSlice.actions;
