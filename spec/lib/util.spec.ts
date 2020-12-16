import { equal, hasProperty, prefix, traverse, unwrap } from 'lib/util';

import { rand } from '../util';

interface List {
  readonly value: number,
  readonly next?: List
}

describe('traverse', () => {
  it('should flatten a linked list into an array', () => {
    for (let length = 0; length < 10; ++length) {
      const a = Array.from({ length }, rand);
      const l = a.reduceRight((next: List | undefined, value) => ({ value, next }), undefined);

      expect(traverse(l).map((e) => e.value)).toEqual(a);
    }
  });
});

describe('prefix', () => {
  it('should check whether one array is a prefix of another', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        const y = x.slice(0, i);

        expect(prefix(y, x)).toEqual(i !== length);
        expect(prefix(x, y)).toEqual(false);
      }
    }
  });
});

describe('equal', () => {
  it('should check whether two arrays represent the same sequence', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        expect(equal(x, x.slice(0, i))).toEqual(i === length);
      }
    }
  });
});

describe('unwrap', () => {
  it('should throw an exception for absent values', () => {
    expect(() => unwrap()).toThrow();
    expect(() => unwrap(null)).toThrow();
    expect(() => unwrap(undefined)).toThrow();
    expect(() => unwrap(null, 'error')).toThrowError('error');
    expect(() => unwrap(undefined, 'error')).toThrowError('error');
  });

  it('should return the argument itself if it\'s present', () => {
    expect(unwrap('')).toEqual('');
    expect(unwrap(42)).toEqual(42);
    expect(unwrap(false)).toEqual(false);
  });
});

describe('hasProperty', () => {
  it('should check whether the object has a property with that name', () => {
    expect(hasProperty({ a: 42, b: null, c: undefined }, 'a')).toBeTruthy();
    expect(hasProperty({ a: 42, b: null, c: undefined }, 'b')).toBeTruthy();
    expect(hasProperty({ a: 42, b: null, c: undefined }, 'c')).toBeTruthy();
    expect(hasProperty({ a: 42, b: null, c: undefined }, 'd')).toBeFalsy();
  });
});
