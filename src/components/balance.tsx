import * as React from 'react';
import formatAmount from '../formatAmount';
import styled from 'styled-components';

export interface BalanceProps {
  onClick: () => void;
  symbol: string;
  shouldHighlight: boolean;
  balance: number;
}

const span: any = styled.span;

const BalanceContainer = span`
  cursor: pointer;
  color: ${(props: any) => (props.shouldHighlight ? 'red' : 'black')};
`;

function Balance(props: BalanceProps) {
  const { shouldHighlight, symbol, balance, onClick } = props;
  return (
    <BalanceContainer
      shouldHighlight={shouldHighlight}
      data-testid="balance"
      onClick={onClick}
    >
      Balance: {symbol}
      {formatAmount(balance)}
    </BalanceContainer>
  );
}

export default Balance;
