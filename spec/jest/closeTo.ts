import {matcherHint, printExpected, printReceived} from 'jest-matcher-utils';

import {isPhasor, Phasor} from 'lib/phasor';
import {isQuadripole, Quadripole} from 'lib/quadripole';

interface ArrayOfT extends Array<T> {}
type T = number | Phasor | Quadripole | ArrayOfT;

const closeTo = (x: T, y: T, e: number): boolean => {
  const f = (t: number, u: number = 0) =>
    (1 + (t && u && (t * u))) / (Math.hypot(1, t) * Math.hypot(1, u));

  return (
      (typeof x === 'number' && typeof y === 'number')
    ? (x === y) || (Math.abs(x - y) < e) || (Math.abs(x - y) / Math.hypot(x, y)) < e
    : (x instanceof Array && y instanceof Array)
    ? x.reduce((a, b, i) => a && closeTo(b, y[i], e), x.length === y.length)
    : (isPhasor(x) && isPhasor(y))
    ? closeTo(Math.abs(x.mag), Math.abs(y.mag), e) && (
        closeTo(f(x.tan, y.tan), 1, e) ||
        closeTo(f(1 / x.tan, 1 / y.tan), 1, e) || (
          closeTo(f(x.tan) * x.mag, f(y.tan) * y.mag, e) &&
          closeTo(f(1 / x.tan) * x.mag, f(1 / y.tan) * y.mag, e)
        )
      )
    : (isQuadripole(x) && isQuadripole(y))
    ? closeTo(x.r, y.r, e) && closeTo(x.t, y.t, e)
    : false
  );
};

export default {
  toBeCloseTo(x: T, y: T, e = 1E-9) {
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

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(y: T, e?: number): R;
    }
  }
}
