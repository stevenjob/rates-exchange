import { subscribe, unsubscribe } from './ratesSubscription';

jest.useFakeTimers();

describe('ratesSubscription', () => {
  function mockFetch(data: any) {
    return jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => data
      })
    );
  }

  test('can subscribe to rates and make a get request', done => {
    window.fetch = mockFetch({
      timestamp: 1578412800,
      base: 'EUR',
      rates: {
        USD: 1.114175
      }
    });

    subscribe('EURUSD', () => {
      done();
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);

    unsubscribe('EURUSD');
  });

  test('can call callback with response data ', done => {
    window.fetch = mockFetch({
      timestamp: 1578412800,
      base: 'EUR',
      rates: {
        USD: 1.114175
      }
    });

    const mockCallback = jest.fn(rates => {
      expect(rates).toEqual({ EURUSD: 1.114175 });
      done();
    });

    subscribe('EURUSD', mockCallback);

    expect(window.fetch).toHaveBeenCalledTimes(1);

    unsubscribe('EURUSD');
  });

  test('when subscribed it makes requests every ten seconds', done => {
    window.fetch = mockFetch({
      timestamp: 1578412800,
      base: 'EUR',
      rates: {
        USD: 1.114175
      }
    });

    let count = 0;
    const ratesRecieved: any[] = [];

    const mockCallback = jest.fn(rates => {
      ratesRecieved.push(rates);

      count++;
      if (count === 4) {
        expect(ratesRecieved).toEqual([
          { EURUSD: 1.114175 },
          { EURUSD: 1.11418 },
          { EURUSD: 1.114175 },
          { EURUSD: 1.114175 }
        ]);
        done();
      }
    });

    window.fetch = mockFetch({
      timestamp: 1578412800,
      base: 'EUR',
      rates: {
        USD: 1.114175
      }
    });

    subscribe('EURUSD', mockCallback);

    expect(window.fetch).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(window.fetch).toHaveBeenCalledTimes(1);

    (window.fetch as any).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => ({
          base: 'EUR',
          rates: {
            USD: 1.11418
          }
        })
      })
    );

    jest.advanceTimersByTime(9000);

    expect(window.fetch).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(20000);

    expect(window.fetch).toHaveBeenCalledTimes(4);

    unsubscribe('EURUSD');
  });
});
