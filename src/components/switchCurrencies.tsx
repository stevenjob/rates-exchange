import * as React from 'react';
import styled from 'styled-components';

export interface SwitchCurrenciesProps {
  onClick: () => void;
}

const SwitchButton = styled.div`
  border: #ccc solid 1px;
  border-radius: 50%;
  cursor: pointer;
`;

function SwitchCurrencies(props: SwitchCurrenciesProps) {
  return (
    <SwitchButton data-testid="switch-currencies" onClick={props.onClick}>
      <i className="material-icons">swap_vert</i>
    </SwitchButton>
  );
}

export default SwitchCurrencies;
