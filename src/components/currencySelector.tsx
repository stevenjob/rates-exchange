import * as React from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

export interface CurrencySelectorProps {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

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
      <DropdownToggle caret>{value}</DropdownToggle>
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
