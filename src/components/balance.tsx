import * as React from 'react';
import formatAmount from '../formatAmount';

export interface BalanceProps {
  onClick: () => void;
  symbol: string;
  shouldHighlight: boolean;
  balance: number;
}

function Balance(props: BalanceProps) {
  const { symbol, balance, onClick } = props;
  return (
    <div data-testid="balance" onClick={onClick}>
      Balance: {symbol}
      {formatAmount(balance)}
    </div>
  );
}

export default Balance;
