import StoreState from '../storeState';

const EMPTY_OBJECT = {};

const getCurrencyData = (state: StoreState, currencyName: string) =>
  state.currencies[currencyName] || EMPTY_OBJECT;

export const getSymbol = (state: StoreState, currencyName: string): string => {
  return getCurrencyData(state, currencyName).symbol || '?';
};

export const getCurrenices = (state: StoreState): string[] => {
  return Object.keys(state.currencies);
};
