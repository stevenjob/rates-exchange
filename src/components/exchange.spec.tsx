import * as React from 'react';
import Exchange from './exchange';
import renderWithRedux from '../testUtils/renderWithRedux';
import StoreState from '../store/storeState';
import { fireEvent } from '@testing-library/react';
import * as ratesActions from '../store/rates/ratesActions';
import * as exchangeActions from '../store/exchange/exchangeActions';

// mock currency selector as its bootstrap dropdown does not play well with react-testing-libary events
jest.mock('./currencySelector', () => (props: any) => {
  const { options, value, onChange } = props;
  function handleChange(event: any) {
    const option = options.find(
      (option: any) => option === event.currentTarget.value
    );
    onChange(option);
  }
  return (
    <select data-testid="select" value={value} onChange={handleChange}>
      {options.map((option: string, index: number) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
});

jest.mock('../ratesSubscription', () => {
  return {
    unsubscribe: () => {},
    subscribe: () => {}
  };
});

const render = (mockStore: Partial<StoreState>) => {
  const result = renderWithRedux(<Exchange />, mockStore);
  const { store } = result;
  store.dispatch(exchangeActions.changeCurrencyPair('GBPUSD'));

  store.dispatch(
    ratesActions.updateRates({
      GBPUSD: 0.8965,
      USDGBP: 1.169,
      EURUSD: 1.1111,
      GBPEUR: 0.9
    })
  );
  return result;
};

describe('Exchange tests', () => {
  let mockStore: StoreState;
  beforeEach(() => {
    mockStore = {
      accountBalances: {
        GBP: 1000,
        USD: 1000,
        EUR: 1000
      },
      rates: {},
      currencies: {
        USD: {
          symbol: '$'
        },
        GBP: {
          symbol: '£'
        },
        EUR: {
          symbol: '€'
        }
      },
      exchange: {
        baseAmount: 0,
        contraAmount: 0,
        isBaseFixed: true
      }
    };
  });

  afterEach(() => {});

  test('button is disabled when amount is 0', () => {
    const { getByTestId, getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    expect(baseAmountInput.value).toBe('0.00');

    expect(getByTestId('exchange-button')).toBeDisabled();
  });

  test('balance is highlighted when amount is greater than balance', () => {
    mockStore.exchange.baseAmount = 2000;

    const { getByTestId, getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    expect(baseAmountInput.value).toBe('2,000.00');

    expect(getByTestId('exchange-button')).toBeDisabled();

    // TODO assert balance
  });

  test('recalculates non-fixed amount when rate updates', () => {
    mockStore.exchange.baseAmount = 2000;

    const { getAllByTestId, store } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    expect(baseAmountInput.value).toBe('2,000.00');

    expect(contraAmountInput.value).toBe('1,793.00');

    store.dispatch(ratesActions.updateRates({ GBPUSD: 0.5 }));

    expect(baseAmountInput.value).toBe('2,000.00');

    expect(contraAmountInput.value).toBe('1,000.00');
  });

  test('can switch currencies', () => {
    mockStore.exchange.baseAmount = 2000;
    const { getByTestId, getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;
    const baseCurrencySelector: HTMLElement = getAllByTestId('select')[0];
    const contraCurrencySelector: HTMLElement = getAllByTestId('select')[1];

    expect(baseCurrencySelector).toHaveTextContent('GBP');
    expect(contraCurrencySelector).toHaveTextContent('USD');
    expect(baseAmountInput.value).toBe('2,000.00');
    expect(contraAmountInput.value).toBe('1,793.00');
    // TODO check balances swap

    fireEvent.click(getByTestId('switch-currencies'));

    expect(baseCurrencySelector).toHaveTextContent('USD');
    expect(contraCurrencySelector).toHaveTextContent('GBP');
    expect(baseAmountInput.value).toBe('1,710.86');
    expect(contraAmountInput.value).toBe('2,000.00');
  });

  test('can select new base currency', () => {
    mockStore.exchange.baseAmount = 2000;
    const { getAllByTestId } = render(mockStore);
    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    expect(baseAmountInput.value).toBe('2,000.00');
    expect(contraAmountInput.value).toBe('1,793.00');

    const baseCurrencySelector: HTMLElement = getAllByTestId('select')[0];
    expect(baseCurrencySelector).toHaveTextContent('GBP');

    fireEvent.change(baseCurrencySelector, { target: { value: 'EUR' } });

    expect(baseCurrencySelector).toHaveTextContent('EUR');

    expect(baseAmountInput.value).toBe('2,000.00');
    expect(contraAmountInput.value).toBe('2,222.20');
  });

  test('can select new contra currency', () => {
    mockStore.exchange.baseAmount = 2000;
    const { getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    expect(baseAmountInput.value).toBe('2,000.00');
    expect(contraAmountInput.value).toBe('1,793.00');

    const contraCurrencySelector: HTMLElement = getAllByTestId('select')[1];
    expect(contraCurrencySelector).toHaveTextContent('USD');

    fireEvent.change(contraCurrencySelector, { target: { value: 'EUR' } });

    expect(contraCurrencySelector).toHaveTextContent('EUR');

    expect(contraAmountInput.value).toBe('1,793.00');
    expect(baseAmountInput.value).toBe('1,992.22');
  });

  test('when base balance pressed populates base currency input', () => {
    const { getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    expect(baseAmountInput.value).toBe('0.00');
    expect(contraAmountInput.value).toBe('0.00');

    const baseBalance = getAllByTestId('balance')[0];

    expect(baseBalance).toHaveTextContent('£1,000.00');

    fireEvent.click(baseBalance);

    expect(baseAmountInput.value).toBe('1,000.00');
    expect(contraAmountInput.value).toBe('896.50');
  });

  test('when contra balance pressed populates contra currency input', () => {
    const { getAllByTestId } = render(mockStore);

    const baseAmountInput = getAllByTestId(
      'amount-input'
    )[0] as HTMLInputElement;
    const contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    expect(baseAmountInput.value).toBe('0.00');
    expect(contraAmountInput.value).toBe('0.00');

    const contraBalance = getAllByTestId('balance')[1];

    expect(contraBalance).toHaveTextContent('$1,000.00');

    fireEvent.click(contraBalance);

    expect(baseAmountInput.value).toBe('1,115.45');
    expect(contraAmountInput.value).toBe('1,000.00');
  });

  test('can press button to exchange', () => {
    mockStore.accountBalances['GBP'] = 2000;
    const { getAllByTestId, getByTestId } = render(mockStore);

    let baseAmountInput = getAllByTestId('amount-input')[0] as HTMLInputElement;
    let contraAmountInput = getAllByTestId(
      'amount-input'
    )[1] as HTMLInputElement;

    let baseBalance = getAllByTestId('balance')[0];
    let contraBalance = getAllByTestId('balance')[1];

    expect(baseBalance).toHaveTextContent('£2,000.00');
    expect(contraBalance).toHaveTextContent('$1,000.00');

    fireEvent.click(contraBalance);

    expect(baseAmountInput.value).toBe('1,115.45');
    expect(contraAmountInput.value).toBe('1,000.00');

    const exchangeButton = getByTestId('exchange-button');

    fireEvent.click(exchangeButton);

    const confirmText = getByTestId('confirmation-text');

    expect(confirmText).toHaveTextContent(
      'You exchanged £1,115.45 to $1,000.00'
    );

    const doneButton = getByTestId('done-button');

    fireEvent.click(doneButton);

    baseBalance = getAllByTestId('balance')[0];
    contraBalance = getAllByTestId('balance')[1];

    baseAmountInput = getAllByTestId('amount-input')[0] as HTMLInputElement;
    contraAmountInput = getAllByTestId('amount-input')[1] as HTMLInputElement;

    expect(baseBalance).toHaveTextContent('£884.55');
    expect(contraBalance).toHaveTextContent('$2,000.00');

    expect(baseAmountInput.value).toBe('0.00');
    expect(contraAmountInput.value).toBe('0.00');
  });
});
