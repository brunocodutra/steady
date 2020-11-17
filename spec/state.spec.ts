import {isKind, Kind, make} from 'lib/element';
import {init, pack, serialize, unpack, unserialize} from 'state';

const Base64 = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%]+$/;

const elements = Object.keys(Kind).filter(isKind).map(make);

describe('State', () => {
  it('should be packable', () => {
    elements.forEach((element) => {
      const state = init(element);
      expect(unpack(pack(state))).toBe(state);
    });

    expect(() => unpack([])).toThrowError();
    expect(() => unpack([null, null])).toThrowError();
    expect(() => unpack([null, [null]])).toThrowError();
  });

  it('should be serializable', () => {
    expect(serialize(init())).toEqual(expect.stringMatching(Base64));
    expect(unserialize(serialize(init()))).toBe(init());

    expect(unserialize('')).toBeUndefined();
    expect(unserialize('?')).toBeUndefined();
    expect(unserialize('#')).toBeUndefined();
  });
});
