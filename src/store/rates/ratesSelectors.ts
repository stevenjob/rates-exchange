import StoreState from '../storeState';

export const getRate = (state: StoreState, currencyPair: string): number => {
  return state.rates[currencyPair] || 0;
};
