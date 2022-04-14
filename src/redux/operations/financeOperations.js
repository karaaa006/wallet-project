import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { addCategoryColor } from "../../utils/addCategoryColor";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.transactions.getTransactions();

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchNextTransactions = createAsyncThunk(
  "finance/fetchNextTransactions",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { currentPage } = getState().finance;

      const data = await api.transactions.getTransactions(currentPage + 1, 5);

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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

export const fetchStatistics = createAsyncThunk(
  "finance/fetchStatistics",
  async ({ month, year }, { rejectWithValue }) => {
    try {
      const data = await api.transactions.getStatistics({ month, year });

      if (data.length > 0) {
        const expense = data.filter((item) => item.isExpense)[0];
        const revenue = data.filter((item) => !item.isExpense)[0];

        expense.categories = addCategoryColor(expense.categories);
        revenue.categories = addCategoryColor(revenue.categories);

        return { expense, revenue };
      }
      return { expense: {}, revenue: {} };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
