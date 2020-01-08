import * as React from 'react';
import { useSelector } from 'react-redux';
import StoreState from '../store/storeState';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import * as ratesSelectors from '../store/rates/ratesSelectors';
import styled from 'styled-components';

const getRate = (state: StoreState) => {
  const currencyPair = exchangeSelectors.getCurrencyPair(state);
  return ratesSelectors.getRate(state, currencyPair);
};

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 2px;
  display: flex;
  justify-content: center;
  pointer-events: none;
`;

const Content = styled.div`
  display: flex;
  width: 140px;
`;

function ExchangeRate() {
  const rate = useSelector(getRate);
  const contraSymbol = useSelector(exchangeSelectors.getContraCurrencySymbol);
  const baseSymbol = useSelector(exchangeSelectors.getBaseCurrencySymbol);

  return (
    <Container>
      <Content>
        <i className="material-icons">trending_up</i>
        <span data-testid="exchange-rate">{`${baseSymbol}1 = ${contraSymbol}${rate}`}</span>
      </Content>
    </Container>
  );
}

export default ExchangeRate;
