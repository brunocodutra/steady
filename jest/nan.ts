import {matcherHint, printReceived} from 'jest-matcher-utils';

import {isPhasor, Phasor} from 'lib/phasor';

export default {
  toBeNaN(x: number | Phasor) {
    const pass = (
        (typeof x === 'number')
      ? isNaN(x)
      : isPhasor(x)
      ? isNaN(x.mag) && isNaN(x.tan)
      : false
    );

    const message = (
        pass
      ? () =>
        matcherHint('.not.toBeNaN', 'received') +
        '\n\n' +
        `Expected ${printReceived(x)} not to be NaN\n`
      : () =>
        matcherHint('.toBeNaN', 'received') +
        '\n\n' +
        `Expected ${printReceived(x)} to be NaN\n`
    );

    return {message, pass};
  },
};
