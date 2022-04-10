import { createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";

import {
  fetchCurrentUser,
  fetchLogin,
  fetchLogout,
  fetchRegistration,
} from "../operations/userOperations";

const initialState = {
  name: "",
  token: "",
  isAuth: false,
  isLoading: false,
  error: null,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [fetchLogout.fulfilled]: (state, action) => {
      state.name = "";
      state.token = "";
      state.isAuth = false;
      state.errorMessage = "";
    },
    [fetchLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.name = action.payload.user.name;
      state.token = action.payload.token;
      state.error = null;
      state.errorMessage = "";
      state.isAuth = true;
    },
    [fetchLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
      state.errorMessage = action.payload.response.data.message;
      toast.error(action.payload.response.data.message);
    },
    [fetchCurrentUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.name = action.payload.name;
      state.isAuth = true;
      state.isLoading = false;
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.name = "";
      state.token = "";
      state.isAuth = false;
      state.isLoading = false;
      state.error = null;
      state.errorMessage = "";
    },
    [fetchRegistration.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.name = action.payload.user.name;
      state.token = action.payload.token;
      state.error = null;
      state.errorMessage = "";
      state.isAuth = true;
    },
    [fetchRegistration.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchRegistration.rejected]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.errorMessage = action.payload.response.data.message;
      toast.error(action.payload.response.data.message);
    },
  },
});

export default userSlice.reducer;
