import { subscribe, unsubscribe } from '../../ratesSubscription';
import * as ratesActions from '../rates/ratesActions';
import StoreState from '../storeState';
import { Dispatch } from 'redux';
import * as selectors from './exchangeSelectors';
import * as ratesSelectors from '../rates/ratesSelectors';
import * as accountBalancesSelectors from '../accountBalances/accountBalancesSelectors';
import * as accountBalancesActions from '../accountBalances/accountBalancesActions';
import * as math from 'mathjs';

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

  let newContraCurrency = contraCurrency;
  if (contraCurrency === newBaseCurrency) {
    newContraCurrency = selectors.getBaseCurrency(state);
  }

  dispatch(changeCurrencyPair(`${newBaseCurrency}${newContraCurrency}`));
  dispatch(recalculateNonFixedAmount());
};

export const onContraCurrencyChange = (newContraCurrency: string) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const baseCurrency = selectors.getBaseCurrency(state);

  dispatch(setContraFixed());

  let newBaseCurrency = baseCurrency;
  if (baseCurrency === newContraCurrency) {
    newBaseCurrency = selectors.getContraCurrency(state);
  }

  dispatch(changeCurrencyPair(`${newBaseCurrency}${newContraCurrency}`));
  dispatch(recalculateNonFixedAmount());
};

export const changeCurrencyPair = (newCurrencyPair: string) => (
  dispatch: any,
  getState: any
) => {
  const state: StoreState = getState();
  const oldCurrencyPair = selectors.getCurrencyPair(state);

  unsubscribe(oldCurrencyPair);
  subscribe(newCurrencyPair, rates =>
    dispatch(ratesActions.updateRates(rates))
  );
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
    const newAmount = Number(
      math.round(math.multiply(baseAmount, exchangeRate), 2)
    );
    console.log(newAmount);
    dispatch(setContraAmount(newAmount));
  } else {
    const contraAmount = selectors.getContraAmount(state);
    const currencyPair = selectors.getCurrencyPair(state);
    const exchangeRate = ratesSelectors.getRate(state, currencyPair);
    if (exchangeRate === 0) {
      dispatch(setBaseAmount(0));
      return;
    }
    const newAmount = Number(
      math.round(math.divide(contraAmount, exchangeRate), 2)
    );
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

export const onSwitchCurrencies = () => (dispatch: any, getState: any) => {
  const state = getState();
  const isBaseFixed = selectors.isBaseFixed(state);
  const baseCurrency = selectors.getBaseCurrency(state);
  const contraCurrency = selectors.getContraCurrency(state);
  const reverseCurrencyPair = `${contraCurrency}${baseCurrency}`;
  dispatch(changeCurrencyPair(reverseCurrencyPair));
  if (isBaseFixed) {
    const newContraAmount = selectors.getBaseAmount(state);
    dispatch(onContraAmountChange(newContraAmount));
  } else {
    const newBaseAmount = selectors.getContraAmount(state);
    dispatch(onBaseAmountChange(newBaseAmount));
  }
};

export const onExchangeButtonPress = () => (dispatch: any, getState: any) => {
  console.log('hello');
  const state = getState();
  const isExchangeEnabled = selectors.isExchangeEnabled(state);

  if (!isExchangeEnabled) {
    return;
  }

  const baseAmount = selectors.getBaseAmount(state);
  const baseCurrency = selectors.getBaseCurrency(state);
  const contraAmount = selectors.getContraAmount(state);
  const contraCurrency = selectors.getContraCurrency(state);

  const newBaseAccountBalance = Number(
    math.round(
      math.subtract(
        accountBalancesSelectors.getBalance(state, baseCurrency),
        baseAmount
      ) as number,
      2
    )
  );
  const newContraAccountBalance = Number(
    math.round(
      math.add(
        accountBalancesSelectors.getBalance(state, contraCurrency),
        contraAmount
      ) as number,
      2
    )
  );

  // dispatch() go to confirmation

  dispatch(
    accountBalancesActions.setAccountBalanceForCurrency(
      baseCurrency,
      newBaseAccountBalance
    )
  );

  dispatch(
    accountBalancesActions.setAccountBalanceForCurrency(
      contraCurrency,
      newContraAccountBalance
    )
  );

  // set amount to 0
};
