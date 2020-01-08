import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import ExchangeButton from './exchangeButton';
import * as exchangeActions from '../store/exchange/exchangeActions';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

const SwitchAndRateContainer = styled.div`
  height: 30px;
  position: relative;
  padding: 2px;
  margin-bottom: 30px;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
`;

function ExchangeForm() {
  const dispatch = useDispatch();
  return (
    <>
      <BaseExchangePanel />
      <SwitchAndRateContainer>
        <SwitchCurrencies
          onClick={() => dispatch(exchangeActions.onSwitchCurrencies())}
        />

        <ExchangeRate />
      </SwitchAndRateContainer>
      <ContraExchangePanel />
      <ExchangeButton />
    </>
  );
}

export default ExchangeForm;
