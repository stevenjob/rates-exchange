import * as React from 'react';
import ExchangeForm from './exchangeForm';
import ExchangeConfirmation from './exchangeConfirmation';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import styled from 'styled-components';

const PaddedContainer = styled.div`
  margin: auto;
  max-width: 500px;
`;

function Exchange() {
  const shouldShowConfirmation = useSelector(
    exchangeSelectors.shouldShowConfirmation
  );

  return (
    <PaddedContainer>
      <Container fluid="sm">
        <h3>Exchange</h3>
        {shouldShowConfirmation ? <ExchangeConfirmation /> : <ExchangeForm />}
      </Container>
    </PaddedContainer>
  );
}

export default Exchange;
