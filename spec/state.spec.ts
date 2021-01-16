import { init, pack, unpack } from 'state';

import { elements } from './util';

describe('State', () => {
  it('should be packable', () => {
    elements.forEach((e) => {
      const state = init(e);
      expect(JSON.parse(JSON.stringify(unpack(pack(state)))))
        .toEqual(JSON.parse(JSON.stringify(state)));
    });

    expect(() => unpack([])).toThrowError();
    expect(() => unpack([null, null])).toThrowError();
    expect(() => unpack([null, [null]])).toThrowError();
  });
});
