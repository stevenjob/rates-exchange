import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import ExchangeButton from './exchangeButton';
import * as exchangeActions from '../store/exchange/exchangeActions';
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const PaddedContainer = styled.div`
  margin: auto;
  max-width: 500px;
`;

function Exchange() {
  const dispatch = useDispatch();
  return (
    <PaddedContainer>
      <Container fluid="sm">
        <header>Exchange</header>
        <BaseExchangePanel />
        <Row>
          <Col>
            <SwitchCurrencies
              onClick={() => dispatch(exchangeActions.onSwitchCurrencies())}
            />
          </Col>
          <Col>
            <ExchangeRate />
          </Col>
        </Row>
        <ContraExchangePanel />
        <ExchangeButton />
      </Container>
    </PaddedContainer>
  );
}

export default Exchange;
