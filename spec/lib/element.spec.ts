import {pack, unpack} from 'lib/element';

import {elements} from './element.spec/util';

describe('Element', () => {
it('should be packable', () => {
  elements.forEach((element) => {
      expect(unpack(pack(element))).toEqual(element);
    });

    expect(() => unpack([])).toThrowError();
    expect(() => unpack([null])).toThrowError();
  });
});
