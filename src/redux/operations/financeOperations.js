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

export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const data = await api.transactions.addTransaction(transactionData);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);