import { subscribe, unsubscribe } from '../../ratesSubscription';
import { updateRates } from '../rates/ratesActions';
import StoreState from '../storeState';
import { Dispatch } from 'redux';
import * as selectors from './exchangeSelectors';
import * as ratesSelectors from '../rates/ratesSelectors';

export enum ExchangeActionTypes {
  SET_CURRENCY_PAIR = 'SET_CURRENCY_PAIR',
  SET_BASE_AMOUNT = 'SET_BASE_AMOUNT',
  SET_CONTRA_AMOUNT = 'SET_CONTRA_AMOUNT'
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

export const onBaseCurrencyChange = (baseCurrency: string) => {
  // if contra currency is the base currency that has been selected then
  // make the previous base currency the contra
  // fix the base currency
  // clear the contra rate
  // change currency pair
};

export const onContraCurrencyChange = (contraCurrency: string) => {
  // if base currency is the contra currency that has been selected then
  // make the previous contra currency the base
  // fix the contra currency
  // clear the base rate
  // change currency pair
};

export const changeCurrencyPair = (newCurrencyPair: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const oldCurrencyPair = selectors.getCurrencyPair(state);

  unsubscribe(oldCurrencyPair);
  subscribe(newCurrencyPair, rates => dispatch(updateRates(rates)));
  dispatch(setCurrencyPair(newCurrencyPair));
};

export const changeContraCurrency = (contra: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const base = selectors.getBaseCurrency(state);
  const newCurrencyPair = `${base}${contra}`;
  changeCurrencyPair(newCurrencyPair)(dispatch, getState);
};

export const changeBaseCurrency = (base: string) => (
  dispatch: Dispatch,
  getState: any
) => {
  const state: StoreState = getState();
  const contra = selectors.getContraCurrency(state);
  const newCurrencyPair = `${base}${contra}`;
  changeCurrencyPair(newCurrencyPair)(dispatch, getState);
};

const recalculateNonFixedAmount = () => (dispatch: Dispatch, getState: any) => {
  const state: StoreState = getState();
  const isBaseFixed = selectors.isBaseFixed(state);

  if (isBaseFixed) {
    const baseAmount = selectors.getBaseAmount(state);
    const currencyPair = selectors.getCurrencyPair(state);
    const exchangeRate = ratesSelectors.getRate(state, currencyPair);
    const newAmount = baseAmount * exchangeRate;
    console.log(baseAmount, currencyPair, exchangeRate, newAmount);
    dispatch(setContraAmount(newAmount));
  } else {
    const contraAmount = selectors.getContraAmount(state);
    const currencyPair = selectors.getCurrencyPair(state);
    const exchangeRate = ratesSelectors.getRate(state, currencyPair);
    const newAmount = contraAmount / exchangeRate;
    console.log(contraAmount, currencyPair, exchangeRate, newAmount);
    dispatch(setBaseAmount(newAmount));
  }
};

export const onBaseAmountChange = (newBaseAmount: number) => (
  dispatch: any
) => {
  console.log('new base', newBaseAmount);
  dispatch(setBaseAmount(newBaseAmount));
  dispatch(recalculateNonFixedAmount());
};

export const onContraAmountChange = (newContraAmount: number) => (
  dispatch: any
) => {
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
  type: 'SET_BASE_FIXED'
});

export const setContraFixed = () => ({
  type: 'SET_CONTRA_FIXED'
});
