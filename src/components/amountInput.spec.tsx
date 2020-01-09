import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AmountInput from './amountInput';

describe('AmountInput tests', () => {
  const noop = () => {};

  test('renders amount input component with inital value formatted correctly', () => {
    const { getByTestId } = render(
      <AmountInput value={1234.56} onChange={noop} onFocus={noop} />
    );

    expect((getByTestId('amount-input') as HTMLInputElement).value).toBe(
      '1,234.56'
    );
  });

  test('Will trigger on change with correct number value', () => {
    const mockOnChange = jest.fn();

    const { getByTestId } = render(
      <AmountInput value={1234.56} onChange={mockOnChange} onFocus={noop} />
    );

    const input = getByTestId('amount-input') as HTMLInputElement;

    expect(input.value).toBe('1,234.56');

    fireEvent.change(input, { target: { value: '59.40' } });

    expect(input.value).toBe('59.40');
    expect(mockOnChange).toBeCalledWith(59.4);
  });
});
