import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../api/api";

axios.defaults.baseURL = BASE_URL;

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/transactions");

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
