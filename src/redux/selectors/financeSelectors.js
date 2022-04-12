const getFinance = (state) => state.finance.financeData;
const getFinanceLoading = (state) => state.finance.loading;
const getFinanceHasError = (state) => state.finance.hasError;
const getFinanceError = (state) => state.finance.error;

const getBalance = (state) => {
  if (state?.finance?.financeData?.length > 0) {
    const transactions = getFinance(state);
    const lastTransaction = transactions[0];
    const balance = lastTransaction.balance;

    return balance;
  }

  return "0";
};

export {
  getFinance,
  getFinanceLoading,
  getFinanceHasError,
  getFinanceError,
  getBalance,
};
