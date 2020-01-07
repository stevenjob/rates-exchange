export enum AccountBalanceActionTypes {
  SET_ACCOUNT_BALANCE = 'SET_ACCOUNT_BALANCE'
}

export const setAccountBalanceForCurrency = (
  currency: string,
  balance: number
) => ({
  type: 'SET_ACCOUNT_BALANCE',
  currency,
  balance
});
