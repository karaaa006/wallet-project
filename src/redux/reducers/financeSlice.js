import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "../operations/financeOperations";

const initialState = {
  financeData: [],
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
  },
});

export default financeSlice.reducer;
