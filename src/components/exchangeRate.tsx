import * as React from 'react';
import { useSelector } from 'react-redux';
import StoreState from '../store/storeState';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as ratesSelectors from '../store/rates/ratesSelectors';

const getRate = (state: StoreState) => {
  const currencyPair = exchangeSelectors.getCurrencyPair(state);
  return ratesSelectors.getRate(state, currencyPair);
};

function ExchangeRate() {
  const rate = useSelector(getRate);

  return <div>{rate}</div>;
}

export default ExchangeRate;
