import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.transactions.getTransactions();

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
