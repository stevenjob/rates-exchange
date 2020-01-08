import * as React from 'react';
import * as exchangeActions from '../store/exchange/exchangeActions';
import { Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import * as exchangeSelectors from '../store/exchange/exchangeSelectors';
import formatAmount from '../formatAmount';
import styled from 'styled-components';

const ConfirmationContent = styled.div`
  height: 244px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ConfirmationText = styled.div``;
const ConfirmationIcon = styled.div`
  width: 50px;
`;

function ExchangeForm() {
  const dispatch = useDispatch();

  const onClick = () => dispatch(exchangeActions.hideConfirmation());

  const baseSymbol = useSelector(exchangeSelectors.getBaseCurrencySymbol);
  const contraSymbol = useSelector(exchangeSelectors.getContraCurrencySymbol);
  const baseAmount = formatAmount(
    useSelector(exchangeSelectors.getConfirmationBaseAmount)
  );
  const contraAmount = formatAmount(
    useSelector(exchangeSelectors.getConfirmationContraAmount)
  );

  return (
    <>
      <ConfirmationContent>
        <ConfirmationIcon>
          <i className="material-icons" style={{ fontSize: '50px' }}>
            check_circle
          </i>
        </ConfirmationIcon>
        <ConfirmationText data-testid="confirmation-text">
          {`You exchanged ${baseSymbol}${baseAmount} to ${contraSymbol}${contraAmount}`}
        </ConfirmationText>
      </ConfirmationContent>
      <Button color="primary" block onClick={onClick} data-testid="done-button">
        Done
      </Button>
    </>
  );
}

export default ExchangeForm;
