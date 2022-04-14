import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  fetchStatistics,
  fetchNextTransactions,
} from "../operations/financeOperations";

const initialState = {
  financeData: [],
  transactionData: {},
  currentPage: 1,
  loading: false,
  hasError: false,
  statistics: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    clearPage: (state) => {
      state.currentPage = initialState.currentPage;
    },
  },
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.loading = true;
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.financeData = action.payload;
      state.currentPage = initialState.currentPage;
      state.loading = false;
      state.hasError = false;
    },
    [fetchTransactions.rejected]: (state, action) => {
      state.financeData = [];
      state.loading = false;
      state.hasError = true;
    },
    [fetchNextTransactions.pending]: (state) => {
      state.loading = true;
    },
    [fetchNextTransactions.fulfilled]: (state, action) => {
      state.financeData = [...state.financeData, ...action.payload];
      state.loading = false;
      state.hasError = false;
      state.currentPage = state.currentPage + 1;
    },
    [fetchNextTransactions.rejected]: (state, action) => {
      state.loading = false;
      state.hasError = true;
    },
    [addTransaction.pending]: (state) => {
      state.loading = true;
    },
    [addTransaction.fulfilled]: (state, action) => {
      state.transactionData = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    [addTransaction.rejected]: (state, action) => {
      state.financeData = {};
      state.loading = false;
      state.hasError = true;
    },
    [fetchStatistics.fulfilled]: (state, action) => {
      state.statistics = action.payload;
    },
  },
});

export const { clearPage } = financeSlice.actions;

export default financeSlice.reducer;
