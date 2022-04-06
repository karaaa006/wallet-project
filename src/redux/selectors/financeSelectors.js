const getFinance = (state) => state.finance.financeData;
const getFinanceLoading = (state) => state.finance.loading;
const getFinanceHasError = (state) => state.finance.hasError;
const getFinanceError = (state) => state.finance.error;

export { getFinance, getFinanceLoading, getFinanceHasError, getFinanceError };
