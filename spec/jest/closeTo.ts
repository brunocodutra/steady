import {matcherHint, printReceived, printExpected} from 'jest-matcher-utils';
import {isPhasor} from 'lib/phasor';

const closeTo = (x, y, e) => {
  const f = (t, u = 0) => (1 + (t && u && (t * u))) / (Math.hypot(1, t) * Math.hypot(1, u));

  return (
      (typeof x === 'number' && typeof y === 'number')
    ? (x === y) || (Math.abs(x - y) < e) || (Math.abs(x - y) / Math.hypot(x, y)) < e
    : (isPhasor(x) && isPhasor(y))
    ? closeTo(Math.abs(x.mag), Math.abs(y.mag), e) && (
        closeTo(f(x.tan, y.tan), 1, e) ||
        closeTo(f(1 / x.tan, 1 / y.tan), 1, e) || (
          closeTo(f(x.tan) * x.mag, f(y.tan) * y.mag, e) &&
          closeTo(f(1 / x.tan) * x.mag, f(1 / y.tan) * y.mag, e)
        )
      )
    : (x.constructor === Array && y.constructor === Array)
    ? x.reduce((a, b, i) => a && closeTo(b, y[i], e), x.length === y.length)
    : false
  );
};

export default {
  toBeCloseTo(x, y, e = 1E-9) {
    const pass = closeTo(x, y, e);
    const message = (
        pass
      ? () =>
        matcherHint('.not.toBeCloseTo', 'received', 'expected, precision') +
        '\n\n' +
        `Expected value not to be close to (with relative precision of ${printExpected(e)}):\n` +
        `  ${printExpected(y)}\n` +
        `Received:\n` +
        `  ${printReceived(x)}`
      : () =>
        matcherHint('.toBeCloseTo', 'received', 'expected, precision') +
        '\n\n' +
        `Expected value to be close to (with relative precision of ${printExpected(e)}):\n` +
        `  ${printExpected(y)}\n` +
        `Received:\n` +
        `  ${printReceived(x)}`
    );

    return {message, pass};
  },
};

