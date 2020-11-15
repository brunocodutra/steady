import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';

import * as Phasors from 'lib/phasor';
import { Phasor, polar } from 'lib/phasor';

import * as Quadripoles from 'lib/quadripole';
import { isQuadripole, Quadripole } from 'lib/quadripole';

type T = number | Phasor | Quadripole | T[];

const closeTo = (x: T, y: T, e: number): boolean => (
  (x instanceof Phasor && y instanceof Phasor)
    ? Phasors.closeTo(x, y, e)
    : (typeof x === 'number' && typeof y === 'number')
      ? Phasors.closeTo(polar(x), polar(y))
      : (isQuadripole(x) && isQuadripole(y))
        ? Quadripoles.closeTo(x, y, e)
        : (Array.isArray(x) && Array.isArray(y))
          ? x.length === y.length && x.every((a, i) => closeTo(a, y[i], e))
          : false
);

export default {
  toBeCloseTo(x: T, y: T, e = 1E-5) {
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

    return { message, pass };
  },
};

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeCloseTo(y: T, e?: number): R;
    }
  }
}
