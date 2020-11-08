import { matcherHint, printExpected, printReceived } from 'jest-matcher-utils';


export default {
  toBe(x: unknown, y: unknown) {
    const received = typeof x === 'object' ? JSON.stringify(x, null, 2) : x;
    const expected = typeof y === 'object' ? JSON.stringify(y, null, 2) : y;
    const pass = received === expected;
    const message = (
      pass
        ? () =>
          matcherHint('.not.toBe', 'received', 'expected') +
          '\n\n' +
          `Expected not:\n` +
          `  ${printExpected(expected)}\n`
        : () =>
          matcherHint('.toBe', 'received', 'expected') +
          '\n\n' +
          `Expected:\n` +
          `  ${printExpected(expected)}\n` +
          `Received:\n` +
          `  ${printReceived(received)}`
    );

    return { message, pass };
  },
};
