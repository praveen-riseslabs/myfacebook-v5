import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi, userApi } from "../api/user";

//registering new user
const registerUser = createAsyncThunk("user/register", async (data) => {
  try {
    const newUser = await authApi.post("/register", data);
    return newUser.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

//login user
const loginUser = createAsyncThunk("user/login", async (data) => {
  try {
    const user = await authApi.post("/login", data);

    return user.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

//get user details
const getUserDetails = createAsyncThunk("user/details", async () => {
  try {
    const user = await userApi.get(`/`);

    return user.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
});

export {
  registerUser,
  loginUser,
  getUserDetails,
};
