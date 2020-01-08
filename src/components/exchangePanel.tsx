import * as React from 'react';
import Balance from './balance';
import AmountInput from './amountInput';
import CurrencySelector from './currencySelector';
import { Row, Col } from 'reactstrap';
import { InputGroup, InputGroupAddon } from 'reactstrap';
import styled from 'styled-components';

export interface ExchangePanelProps {
  currencies: string[];
  amount: number;
  selectedCurrency: string;
  shouldHighlightBalance?: boolean;
  symbol: string;
  balance: number;
  onAmountChange: (value: number) => void;
  onAmountFocus: (value: number) => void;
  onCurrencySelected: (currencyName: string) => void;
  onBalanceClick: () => void;
}

const PanelContainer = styled.div`
  margin-bottom: 30px;
`;

function ExchangePanel(props: ExchangePanelProps) {
  const {
    amount,
    selectedCurrency,
    shouldHighlightBalance = false,
    symbol,
    balance,
    currencies,
    onAmountChange,
    onAmountFocus,
    onCurrencySelected,
    onBalanceClick
  } = props;

  return (
    <PanelContainer>
      <Row>
        <Col>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <CurrencySelector
                value={selectedCurrency}
                options={currencies}
                onChange={onCurrencySelected}
              />
            </InputGroupAddon>
            <AmountInput
              value={amount}
              onChange={onAmountChange}
              onFocus={onAmountFocus}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Balance
            onClick={onBalanceClick}
            shouldHighlight={shouldHighlightBalance}
            balance={balance}
            symbol={symbol}
          />
        </Col>
      </Row>
    </PanelContainer>
  );
}

export default ExchangePanel;
