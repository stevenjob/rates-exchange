import * as React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import styled from 'styled-components';

export interface CurrencySelectorProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

const StyledDropdownToggle = styled(DropdownToggle)`
  width: 70px;
`;

function CurrencySelector(props: CurrencySelectorProps) {
  const { options, value, onChange } = props;

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown
      isOpen={dropdownOpen}
      toggle={toggle}
      data-testid="currency-selector"
    >
      <StyledDropdownToggle caret>{value}</StyledDropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Choose Source</DropdownItem>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => onChange(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}

export default CurrencySelector;
