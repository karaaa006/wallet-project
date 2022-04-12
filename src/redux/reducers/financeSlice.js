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
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.loading = true;
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.financeData = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    [fetchTransactions.rejected]: (state, action) => {
      state.financeData = [];
      state.loading = false;
      state.hasError = action.payload;
    },
    [fetchNextTransactions.fulfilled]: (state, action) => {
      state.financeData = [...state.financeData, ...action.payload];
      state.loading = false;
      state.hasError = false;
      state.currentPage = state.currentPage + 1;
    },

    [addTransaction.fulfilled]: (state, action) => {
      state.transactionData = action.payload;
      state.loading = false;
      state.hasError = false;
    },

    [fetchStatistics.fulfilled]: (state, action) => {
      state.statistics = action.payload;
    },
  },
});

export default financeSlice.reducer;
