import { subscribe, unsubscribe } from '../../ratesSubscription';
import { updateRates } from '../rates';
import StoreState from '../storeState';
import { Dispatch } from 'redux';
import * as selectors from './exchangeSelectors';

export enum ExchangeActionTypes {
  SET_CURRENCY_PAIR = 'SET_CURRENCY_PAIR'
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
