import * as React from 'react';

export interface BalanceProps {
  onClick: () => void;
  symbol: string;
  shouldHighlight: boolean;
  balance: number;
}

const formatBalance = (balance: number) => {
  return balance.toLocaleString('en-US', { minimumFractionDigits: 2 });
};

function Balance(props: BalanceProps) {
  const { symbol, balance, onClick } = props;
  return (
    <div data-testid="balance" onClick={onClick}>
      Balance: {symbol}
      {formatBalance(balance)}
    </div>
  );
}

export default Balance;
