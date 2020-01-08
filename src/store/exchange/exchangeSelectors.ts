import StoreState from '../storeState';
import * as accountBalancesSelectors from '../accountBalances/accountBalancesSelectors';
import * as currenciesSelectors from '../currencies/currenciesSelectors';

export const getContraCurrency = (state: StoreState): string => {
  const { currencyPair } = state.exchange;
  return currencyPair ? currencyPair.substring(3) : '';
};

export const getBaseCurrency = (state: StoreState): string => {
  const { currencyPair } = state.exchange;
  return currencyPair ? currencyPair.substring(0, 3) : '';
};

export const getCurrencyPair = (state: StoreState) => {
  return state.exchange.currencyPair || '';
};

export const getBaseAmount = (state: StoreState): number => {
  return state.exchange.baseAmount;
};

export const getContraAmount = (state: StoreState): number => {
  return state.exchange.contraAmount;
};

export const isBaseFixed = (state: StoreState): boolean => {
  return state.exchange.isBaseFixed;
};

export const isBaseAmountValid = (state: StoreState): boolean => {
  const amount = getBaseAmount(state);
  const baseCurrency = getBaseCurrency(state);
  const balance = accountBalancesSelectors.getBalance(state, baseCurrency);
  return balance >= amount;
};

export const isExchangeEnabled = (state: StoreState): boolean => {
  return isBaseAmountValid(state) && getBaseAmount(state) !== 0;
};

export const getBaseCurrencySymbol = (state: StoreState): string => {
  const baseCurrency = getBaseCurrency(state);
  return currenciesSelectors.getSymbol(state, baseCurrency);
};

export const getContraCurrencySymbol = (state: StoreState): string => {
  const currency = getContraCurrency(state);
  return currenciesSelectors.getSymbol(state, currency);
};

export const shouldShowConfirmation = (state: StoreState): boolean => {
  return Boolean(state.exchange.shouldShowConfirmation);
};

export const getConfirmationBaseAmount = (state: StoreState): number => {
  return state.exchange.confirmationBaseAmount || 0;
};

export const getConfirmationContraAmount = (state: StoreState): number => {
  return state.exchange.confirmationContraAmount || 0;
};
