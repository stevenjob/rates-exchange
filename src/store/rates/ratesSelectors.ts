import StoreState from '../storeState';

export const getRate = (state: StoreState, currencyPair: string): number => {
  console.log(state);
  return state.rates[currencyPair];
};
