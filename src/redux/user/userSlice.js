import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  fetchLogin,
  fetchLogout,
} from "../operations/userOperations";

const initialState = {
  name: "",
  token: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchLogout.fulfilled]: (state, action) => {
      state.name = "";
      state.token = "";
      state.isAuth = false;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.name = action.payload.user.name;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.name = action.payload.name;
      state.isAuth = true;
    },
  },
});

export default userSlice.reducer;
