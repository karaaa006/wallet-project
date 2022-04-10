import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await api.user.login(userData);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.user.getUserData();

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  "user/fetchRegistration",
  async (registrationData, { rejectWithValue }) => {
    try {
      const data = await api.user.registration(registrationData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
