import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchLogout = createAsyncThunk(
  "user/fetchLogout",
  async (_, { rejectWithValue }) => {
    try {
      await api.user.logout();
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
