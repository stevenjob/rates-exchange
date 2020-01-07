import * as React from 'react';
import { useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as accountBalanceSelectors from '../store/accountBalances/accountBalancesSelectors';
import StoreState from '../store/storeState';
import ExchangePanel from './exchangePanel';

export interface ContraExchangePanelProps {
  currencies: string[];
}

function ContraExchangePanel(props: ContraExchangePanelProps) {
  const amount = useSelector(exchangeSelectors.getContraAmount);

  const selectedCurrency = useSelector(exchangeSelectors.getContraCurrency);

  const shouldHighlightBalance = !useSelector(
    exchangeSelectors.isContraAmountValid
  );

  const symbol = useSelector(exchangeSelectors.getContraCurrencySymbol);

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

export default ContraExchangePanel;
