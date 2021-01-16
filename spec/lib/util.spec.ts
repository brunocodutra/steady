import { equal, hasProperty, prefix, rescue, traverse, unwrap } from 'lib/util';

interface List {
  readonly value: number,
  readonly next?: List
}

describe('traverse', () => {
  it('should flatten a linked list into an array', () => {
    for (let length = 0; length < 10; ++length) {
      const a = Array.from({ length }, Math.random);
      const l = a.reduceRight((next: List | undefined, value) => ({ value, next }), undefined);

      expect(traverse(l).map((e) => e.value)).toEqual(a);
    }
  });
});

describe('prefix', () => {
  it('should check whether one array is a prefix of another', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, Math.random);
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
      const x = Array.from({ length }, Math.random);
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


describe('rescue', () => {
  it('should return the output of the first closure that succeeds', () => {
    const f = jest.fn().mockImplementationOnce(() => { throw new Error(); });
    const g = jest.fn().mockReturnValueOnce(42);
    const h = jest.fn();

    expect(rescue(f, g, h)).toBe(42);
    expect(f).toHaveBeenCalledTimes(1);
    expect(g).toHaveBeenCalledTimes(1);
    expect(h).toHaveBeenCalledTimes(0);
  });

  it('should throw the error of the last closure', () => {
    const a = new Error("a");
    const b = new Error("b");
    const c = new Error("c");

    const f = jest.fn().mockImplementationOnce(() => { throw a; });
    const g = jest.fn().mockImplementationOnce(() => { throw b; });
    const h = jest.fn().mockImplementationOnce(() => { throw c; });

    expect(() => rescue(f, g, h)).toThrowError(c);
    expect(f).toHaveBeenCalledTimes(1);
    expect(g).toHaveBeenCalledTimes(1);
    expect(g).toHaveBeenCalledTimes(1);
  });
});

