import { init, pack, serialize, unpack, unserialize } from 'state';

import { elements } from './util';

const Base64 = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%]+$/;

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

  it('should be serializable', () => {
    elements.forEach((e) => {
      const state = init(e);
      expect(serialize(state)).toEqual(expect.stringMatching(Base64));
      expect(JSON.parse(JSON.stringify(unserialize(serialize(state)))))
        .toEqual(JSON.parse(JSON.stringify(state)));
    })

    expect(unserialize('')).toBeUndefined();
    expect(unserialize('?')).toBeUndefined();
    expect(unserialize('#')).toBeUndefined();
  });
});
