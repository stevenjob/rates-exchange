import * as React from 'react';
export interface BalanceProps {
  onClick: () => void;
  symbol: string;
  shouldHighlight: boolean;
  balance: number;
}

function Balance(props: BalanceProps) {
  const { symbol, balance } = props;
  return (
    <div>
      Balance: {symbol}
      {balance}
    </div>
  );
}

export default Balance;
