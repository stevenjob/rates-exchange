import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as accountBalanceSelectors from '../store/accountBalances/accountBalancesSelectors';
import StoreState from '../store/storeState';
import ExchangePanel from './exchangePanel';
import * as exchangeActions from '../store/exchange/exchangeActions';

export interface ContraExchangePanelProps {
  currencies: string[];
}

function ContraExchangePanel(props: ContraExchangePanelProps) {
  const amount = useSelector(exchangeSelectors.getContraAmount);

  const selectedCurrency = useSelector(exchangeSelectors.getContraCurrency);

  const symbol = useSelector(exchangeSelectors.getContraCurrencySymbol);

  const balance = useSelector((state: StoreState) =>
    accountBalanceSelectors.getBalance(state, selectedCurrency)
  );

  const dispatch = useDispatch();

  const panelProps = {
    ...props,
    amount,
    selectedCurrency,
    symbol,
    balance,
    onAmountChange: (value: number) =>
      dispatch(exchangeActions.onContraAmountChange(value)),
    onAmountFocus: () => dispatch(exchangeActions.setContraFixed()),
    onCurrencySelected: (currency: string) =>
      dispatch(exchangeActions.onContraCurrencyChange(currency)),
    onBalanceClick: () =>
      dispatch(exchangeActions.onContraAmountChange(balance))
  };

  return <ExchangePanel {...panelProps} />;
}

export default ContraExchangePanel;
