const getFinance = (state) => state.finance.financeData;
const getFinanceLoading = (state) => state.finance.loading;
const getFinanceHasError = (state) => state.finance.hasError;
const getFinanceError = (state) => state.finance.error;

const getBalance = (state) => {
  if (state?.finance?.financeData?.length > 0) {
    const transactions = getFinance(state);
    const lastTransaction = transactions[0];
    const balance = lastTransaction.balance;

    const balanceToString = balance.toString();

    if (balanceToString.length > 3) {
      const formatedBalance = BalanceFormater(balanceToString);

      return formatedBalance;
    }
    return;
  }

  return "0";
};

function BalanceFormater(value) {
  const reversedValue = value.toString().split("").reverse().join("");

  const splitedValue = reversedValue.match(/.{1,3}/g).join();

  const formatedValue = splitedValue
    .split("")
    .reverse()
    .join("")
    .replace(",", " ");

  return formatedValue;
}

export {
  getFinance,
  getFinanceLoading,
  getFinanceHasError,
  getFinanceError,
  getBalance,
};
