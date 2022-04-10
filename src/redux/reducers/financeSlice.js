import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  fetchStatistics,
} from "../operations/financeOperations";

const initialState = {
  financeData: [],
  transactionData: {},
  loading: false,
  hasError: false,
  statistics: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
<<<<<<< Updated upstream
      state.financeData = [];
=======
>>>>>>> Stashed changes
      state.loading = true;
      state.hasError = false;
    },
    [fetchTransactions.fulfilled]: (state, action) => {
      state.financeData = action.payload;
      state.loading = false;
      state.hasError = false;
    },
    [fetchTransactions.rejected]: (state) => {
      state.financeData = [];
      state.loading = false;
      state.hasError = true;
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
