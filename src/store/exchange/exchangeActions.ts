import { subscribe, unsubscribe } from '../../ratesSubscription';
import { updateRates } from '../rates/ratesActions';
import StoreState from '../storeState';
import { Dispatch } from 'redux';
import * as selectors from './exchangeSelectors';
import * as ratesSelectors from '../rates/ratesSelectors';

export enum ExchangeActionTypes {
  SET_CURRENCY_PAIR = 'SET_CURRENCY_PAIR',
  SET_BASE_AMOUNT = 'SET_BASE_AMOUNT',
  SET_CONTRA_AMOUNT = 'SET_CONTRA_AMOUNT',
  SET_BASE_FIXED = 'SET_BASE_FIXED',
  SET_CONTRA_FIXED = 'SET_CONTRA_FIXED'
}

export interface SetCurrencyPairAction {
  type: ExchangeActionTypes.SET_CURRENCY_PAIR;
  currencyPair: string;
}

export type ExchangeAction = SetCurrencyPairAction | any;

const setCurrencyPair = (currencyPair: string) => ({
  type: ExchangeActionTypes.SET_CURRENCY_PAIR,
  currencyPair
});

export const onBaseCurrencyChange = (newBaseCurrency: string) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const contraCurrency = selectors.getContraCurrency(state);

  dispatch(setBaseFixed());
  dispatch(recalculateNonFixedAmount());

  let newContraCurrency = contraCurrency;
  if (contraCurrency === newBaseCurrency) {
    newContraCurrency = selectors.getBaseCurrency(state);
  }

  dispatch(changeCurrencyPair(`${newBaseCurrency}${newContraCurrency}`));
};

export const onContraCurrencyChange = (newContraCurrency: string) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const baseCurrency = selectors.getBaseCurrency(state);

  dispatch(setContraFixed());
  dispatch(recalculateNonFixedAmount());

  let newBaseCurrency = baseCurrency;
  if (baseCurrency === newContraCurrency) {
    newBaseCurrency = selectors.getContraCurrency(state);
  }

  dispatch(changeCurrencyPair(`${newBaseCurrency}${newContraCurrency}`));
};

export const changeCurrencyPair = (newCurrencyPair: string) => (
  dispatch: any,
  getState: any
) => {
  const state: StoreState = getState();
  const oldCurrencyPair = selectors.getCurrencyPair(state);

  unsubscribe(oldCurrencyPair);
  subscribe(newCurrencyPair, rates => dispatch(updateRates(rates)));
  dispatch(setCurrencyPair(newCurrencyPair));
};

const changeContraCurrency = (contra: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const base = selectors.getBaseCurrency(state);
  const newCurrencyPair = `${base}${contra}`;
  changeCurrencyPair(newCurrencyPair)(dispatch, getState);
};

const changeBaseCurrency = (base: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const contra = selectors.getContraCurrency(state);
  const newCurrencyPair = `${base}${contra}`;
  changeCurrencyPair(newCurrencyPair)(dispatch, getState);
};

export const recalculateNonFixedAmount = () => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const isBaseFixed = selectors.isBaseFixed(state);

  if (isBaseFixed) {
    const baseAmount = selectors.getBaseAmount(state);
    const currencyPair = selectors.getCurrencyPair(state);
    const exchangeRate = ratesSelectors.getRate(state, currencyPair);
    const newAmount = baseAmount * exchangeRate;
    dispatch(setContraAmount(newAmount));
  } else {
    const contraAmount = selectors.getContraAmount(state);
    const currencyPair = selectors.getCurrencyPair(state);
    const exchangeRate = ratesSelectors.getRate(state, currencyPair);
    const newAmount = contraAmount / exchangeRate;
    dispatch(setBaseAmount(newAmount));
  }
};

export const onBaseAmountChange = (newBaseAmount: number) => (
  dispatch: any
) => {
  dispatch(setBaseFixed());
  dispatch(setBaseAmount(newBaseAmount));
  dispatch(recalculateNonFixedAmount());
};

export const onContraAmountChange = (newContraAmount: number) => (
  dispatch: any
) => {
  dispatch(setContraFixed());
  dispatch(setContraAmount(newContraAmount));
  dispatch(recalculateNonFixedAmount());
};

const setBaseAmount = (amount: number) => ({
  type: ExchangeActionTypes.SET_BASE_AMOUNT,
  amount
});

const setContraAmount = (amount: number) => ({
  type: ExchangeActionTypes.SET_CONTRA_AMOUNT,
  amount
});

export const setBaseFixed = () => ({
  type: ExchangeActionTypes.SET_BASE_FIXED
});

export const setContraFixed = () => ({
  type: ExchangeActionTypes.SET_CONTRA_FIXED
});
