import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as accountBalanceSelectors from '../store/accountBalances/accountBalancesSelectors';
import StoreState from '../store/storeState';
import ExchangePanel from './exchangePanel';
import * as exchangeActions from '../store/exchange/exchangeActions';
import * as currenciesSelectors from '../store/currencies/currenciesSelectors';

function BaseExchangePanel() {
  const currencies = useSelector(currenciesSelectors.getCurrenices);
  const amount = useSelector(exchangeSelectors.getBaseAmount);

  const selectedCurrency = useSelector(exchangeSelectors.getBaseCurrency);

  const shouldHighlightBalance = !useSelector(
    exchangeSelectors.isBaseAmountValid
  );

  const symbol = useSelector(exchangeSelectors.getBaseCurrencySymbol);

  const balance = useSelector((state: StoreState) =>
    accountBalanceSelectors.getBalance(state, selectedCurrency)
  );

  const dispatch = useDispatch();

  const panelProps = {
    currencies,
    amount,
    selectedCurrency,
    shouldHighlightBalance,
    symbol,
    balance,
    onAmountChange: (value: number) =>
      dispatch(exchangeActions.onBaseAmountChange(value)),
    onAmountFocus: () => dispatch(exchangeActions.setBaseFixed()),
    onCurrencySelected: (currency: string) =>
      dispatch(exchangeActions.onBaseCurrencyChange(currency)),
    onBalanceClick: () => dispatch(exchangeActions.onBaseAmountChange(balance))
  };

  return <ExchangePanel {...panelProps} />;
}

export default BaseExchangePanel;
