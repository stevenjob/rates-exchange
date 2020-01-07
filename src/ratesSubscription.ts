const APP_ID = process.env.REACT_APP_ORA_APP_ID;

const tenSeconds = 10000;

const requestRatesForPair = (currencyPair: string) => {
  const base = currencyPair.substring(0, 3);
  const contra = currencyPair.substring(3);
  return requestRates(base, [contra]);
};

const requestRates = async (
  base: string,
  contraCurrencies: string[] = []
): Promise<{ [pair: string]: number }> => {
  const symbols = contraCurrencies.join(',');

  let url = `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}&base=${base}`;
  if (symbols !== '') {
    url = `${url}&symbols=${symbols}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  const a = Object.keys(data.rates).reduce((result, contraCurrency) => {
    const currencyPair = `${data.base}${contraCurrency}`;

    return {
      ...result,
      [currencyPair]: data.rates[contraCurrency]
    };
  }, {});
  console.log(a);
  return a;
};

const pairIdMap: any = {};

export const subscribe = (
  currencyPair: string,
  callback: (rates: { [rate: string]: number }) => void
) => {
  requestRatesForPair(currencyPair).then(callback);
  const intervalId = setInterval(() => {
    requestRatesForPair(currencyPair).then(callback);
  }, tenSeconds);

  pairIdMap[currencyPair] = intervalId;
};

export const unsubscribe = (currencyPair: string) => {
  pairIdMap[currencyPair] && clearInterval(pairIdMap[currencyPair]);
};
