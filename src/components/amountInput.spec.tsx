import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AmountInput from './amountInput';

describe('AmountInput tests', () => {
  test('renders amount input component with inital value formatted correctly', () => {
    const { getByTestId } = render(<AmountInput value={1234.56} />);

    expect((getByTestId('amount-input') as HTMLInputElement).value).toBe(
      '1,234.56'
    );
  });
});
