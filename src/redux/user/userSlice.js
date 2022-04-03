import { createSlice } from "@reduxjs/toolkit";
import { fetchLogout } from "../operations/userOperations";

const initialState = {
  name: "Имя",
  token: "",
  isAuth: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: {
    [fetchLogout.fulfilled]: (state, action) => {
      state.name = "";
      state.token = "";
      state.isAuth = false;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
