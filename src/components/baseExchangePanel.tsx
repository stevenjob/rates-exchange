import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as accountBalanceSelectors from '../store/accountBalances/accountBalancesSelectors';
import StoreState from '../store/storeState';
import ExchangePanel from './exchangePanel';
import * as exchangeActions from '../store/exchange/exchangeActions';

export interface BaseExchangePanelProps {
  currencies: string[];
}

function BaseExchangePanel(props: BaseExchangePanelProps) {
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
    ...props,
    amount,
    selectedCurrency,
    shouldHighlightBalance,
    symbol,
    balance,
    onAmountChange: (value: number) => {
      dispatch(exchangeActions.onBaseAmountChange(value));
    },
    onCurrencySelected: () => console.log('onCurrencySelected'),
    onBalanceClick: () => console.log('onBalanceClick')
  };

  return <ExchangePanel {...panelProps} />;
}

export default BaseExchangePanel;
