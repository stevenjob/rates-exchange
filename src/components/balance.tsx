import * as React from 'react';
export interface BalanceProps {
  onClick: () => void;
  symbol: string;
  shouldHighlight: boolean;
  balance: number;
}

function Balance(props: BalanceProps) {
  const { symbol, balance, onClick } = props;
  return (
    <div onClick={onClick}>
      Balance: {symbol}
      {balance}
    </div>
  );
}

export default Balance;
