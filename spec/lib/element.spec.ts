import { pack, unpack } from 'lib/element';

import { elements } from '../util';

describe('Element', () => {
  it('should be packable', () => {
    elements.forEach((element) => {
      expect(unpack(pack(element))).toBe(element);
    });

    expect(() => unpack([])).toThrowError();
    expect(() => unpack([null])).toThrowError();
  });
});
