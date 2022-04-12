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
   
    if (balanceToString.length > 0) {
      return BalanceFormater(balanceToString);     
    }
    return;
  }

   return "0";
};

function BalanceFormater(value) {
  if (value.includes(".")) {
   return decimalValuesHandler(value);
    
  }
  return integerValueHandler(value); 
}

function integerValueHandler(value) {
  if (value.length <= 3) {
    return value;
  }
  const reversedValue = value.toString().split("").reverse().join("");
 
  const splitedValue = reversedValue.match(/.{1,3}/g).join();
  
  const formatedValue = splitedValue
    .split("")
    .reverse()
    .join("")
    .replace(/\,/g, " ");

  return formatedValue;
}

function decimalValuesHandler(value) {
  const integer = value.slice(0, value.indexOf("."));
  const decimal = value.slice(value.indexOf(".") - value.length + 1, value.length);
  const formatedInteger = integerValueHandler(integer);
  const balance = formatedInteger.concat(".",decimal);  
  return balance;
  
}








export {
  getFinance,
  getFinanceLoading,
  getFinanceHasError,
  getFinanceError,
  getBalance,
};
