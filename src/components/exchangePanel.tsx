import * as React from 'react';
import Balance from './balance';
import AmountInput from './amountInput';
import CurrencySelector from './currencySelector';
import { useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import StoreState from '../store/storeState';
import { prependOnceListener } from 'cluster';

export interface ExchangePanelProps {
  currencies: string[];
  amount: number;
  selectedCurrency: string;
  shouldHighlightBalance: boolean;
  symbol: string;
  balance: number;
  onAmountChange: (value: number) => void;
  onCurrencySelected: (currencyName: string) => void;
  onBalanceClick: () => void;
}

function ExchangePanel(props: ExchangePanelProps) {
  const {
    amount,
    selectedCurrency,
    shouldHighlightBalance,
    symbol,
    balance,
    currencies,
    onAmountChange,
    onCurrencySelected,
    onBalanceClick
  } = props;

  return (
    <div>
      <div>
        <CurrencySelector
          value={selectedCurrency}
          options={currencies}
          onChange={onCurrencySelected}
        />
        <Balance
          onClick={onBalanceClick}
          shouldHighlight={shouldHighlightBalance}
          balance={balance}
          symbol={symbol}
        />
      </div>
      <AmountInput value={amount} onChange={onAmountChange} />
    </div>
  );
}

export default ExchangePanel;
