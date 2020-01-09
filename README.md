## Rates exchange app https://stevenjob.github.io/rates-exchange/

- react, redux and typescript
- bootstrap, styled-components
- jest, react-testing-libary
- CircleCI and github pages

Polls https://openexchangerates.org/ every 10 seconds for active currency pair and user can make mock exchanges.

Setup with 3 mock pockets of 1000 of GBP, USD and EUR

Uses text-mask for input validation

## Steps to run

`npm install`

`npm run start`

## Edge cases, performance, things missed

- There is no handling of errors or loading or setup for the rates, if a request for rates is slow or fails the component will not work correctly.

- The app is not fully tested, although most of the component tests try to cover the main flow.

- I expect some edge cases that were not covered like very large numbers
