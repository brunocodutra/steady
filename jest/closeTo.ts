import {matcherHint, printExpected, printReceived} from 'jest-matcher-utils';

import {equal, isPhasor, Phasor} from 'lib/phasor';
import {isQuadripole, Quadripole} from 'lib/quadripole';

type T = number | Phasor | Quadripole | T[];

const closeTo = (x: T, y: T, e: number): boolean => (
    (typeof x === 'number' && typeof y === 'number')
  ? (x === y) || (Math.abs(x - y) < e) || (Math.abs(x - y) / Math.hypot(x, y)) < e
  : (x instanceof Array && y instanceof Array)
  ? x.reduce((a, b, i) => a && closeTo(b, y[i], e), x.length === y.length)
  : (isPhasor(x) && isPhasor(y))
  ? equal(x, y, e)
  : (isQuadripole(x) && isQuadripole(y))
  ? closeTo(x.r, y.r, e) && closeTo(x.t, y.t, e)
  : false
);

export default {
  toBeCloseTo(x: T, y: T, e = 1E-6) {
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
