import StoreState from '../storeState';

export const getBalance = (state: StoreState, currency: string): number => {
  return state.accountBalances[currency] || 0;
};
