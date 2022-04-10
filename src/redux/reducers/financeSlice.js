import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions, addTransaction } from "../operations/financeOperations";

const initialState = {
  financeData: [],
  transactionData: {},
  loading: false,
  hasError: false,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  extraReducers: {
    [fetchTransactions.pending]: (state) => {
      state.financeData = [];
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
  },
});

export default financeSlice.reducer;
