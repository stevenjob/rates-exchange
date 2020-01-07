import * as React from 'react';
import SwitchCurrencies from './switchCurrencies';
import ExchangeRate from './exchangeRate';
import BaseExchangePanel from './baseExchangePanel';
import ContraExchangePanel from './contraExchangePanel';
import { useSelector } from 'react-redux';
import * as currenciesSelectors from '../store/currencies/currenciesSelectors';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';

export interface ExchangeProps {}

const PaddedContainer = styled.div`
  margin: auto;
  max-width: 500px;
`;

function Exchange(props: ExchangeProps) {
  const currencies = useSelector(currenciesSelectors.getCurrenices);

  return (
    <PaddedContainer>
      <Container fluid="sm">
        <header>Exchange</header>
        <BaseExchangePanel currencies={currencies} />
        <Row>
          <Col>
            <SwitchCurrencies onClick={() => console.log('clicked')} />
          </Col>
          <Col>
            <ExchangeRate />
          </Col>
        </Row>
        <ContraExchangePanel currencies={currencies} />
      </Container>
    </PaddedContainer>
  );
}

export default Exchange;
