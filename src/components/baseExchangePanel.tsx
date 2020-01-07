import * as React from 'react';
import { useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as accountBalanceSelectors from '../store/accountBalances/accountBalancesSelectors';
import StoreState from '../store/storeState';
import ExchangePanel from './exchangePanel';

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

  const panelProps = {
    ...props,
    amount,
    selectedCurrency,
    shouldHighlightBalance,
    symbol,
    balance,
    onAmountChange: () => console.log('onAmountChange'),
    onCurrencySelected: () => console.log('onCurrencySelected'),
    onBalanceClick: () => console.log('onBalanceClick')
  };

  return <ExchangePanel {...panelProps} />;
}

export default BaseExchangePanel;
