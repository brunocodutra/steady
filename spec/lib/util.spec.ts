import { equal, hasProperty, memoize, prefix, traverse, unwrap } from 'lib/util';

const rand = (N = 10) => Math.floor(Math.random() * N) - N / 2;

interface List {
  readonly value: number,
  readonly next?: List
}

describe('traverse', () => {
  it('should flatten a linked list into an array', () => {
    for (let length = 0; length < 10; ++length) {
      const a = Array.from({ length }, rand);
      const l = a.reduceRight((next: List | undefined, value) => ({ value, next }), undefined);

      expect(traverse(l).map((e) => e.value)).toBe(a);
    }
  });
});

describe('prefix', () => {
  it('should check whether one array is a prefix of another', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        const y = x.slice(0, i);

        expect(prefix(y, x)).toBe(i !== length);
        expect(prefix(x, y)).toBe(false);
      }
    }
  });
});

describe('equal', () => {
  it('should check whether two arrays represent the same sequence', () => {
    for (let length = 0; length < 10; ++length) {
      const x = Array.from({ length }, rand);
      for (let i = x.length; i >= 0; --i) {
        expect(equal(x, x.slice(0, i))).toBe(i === length);
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
    expect(unwrap('')).toBe('');
    expect(unwrap(42)).toBe(42);
    expect(unwrap(false)).toBe(false);
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

describe('memoize', () => {
  it('should preserve all properties', () => {
    for (const configurable of [false, true]) {
      for (const enumerable of [false, true]) {
        const obj = Object.defineProperties({}, {
          readable: { configurable, enumerable, value: rand() },
          writable: { configurable, enumerable, value: rand(), writable: true },
          gettable: { configurable, enumerable, get: rand },
          settable: { configurable, enumerable, get: rand, set() { throw new Error() } },
        });

        for (const [prop, { get, set, ...expected }] of Object.entries(Object.getOwnPropertyDescriptors(obj))) {
          expect(Object.getOwnPropertyDescriptor(memoize(obj), prop)).toMatchObject(expected);
        }
      }
    }
  });

  it('should memoize configurable read-only lazy properties', () => {
    const mockReadable = jest.fn(rand);
    const mockWritable = jest.fn(rand);

    const obj = memoize({
      get readable() {
        return mockReadable();
      },

      get writable() {
        return mockWritable();
      },

      set writable(_) {
        throw new Error();
      },
    });

    const value = obj.readable;

    for (let length = 0; length < 10; ++length) {
      expect(obj.readable).toEqual(value);
      expect(obj.writable).toEqual(expect.any(Number));
    }

    expect(mockReadable).toHaveBeenCalledTimes(1);
    expect(mockWritable).toHaveBeenCalledTimes(10);
  });

  it('should store memoized value in the leaf of the prototype chain', () => {
    const obj = Object.create(memoize({
      get prop() {
        return 42;
      },
    }));

    expect(Object.getOwnPropertyDescriptors(obj)).toStrictEqual({});
    expect(obj.prop).toBe(42);
    expect(Object.getOwnPropertyDescriptors(obj)).toStrictEqual({
      prop: {
        configurable: false,
        enumerable: false,
        writable: false,
        value: 42,
      },
    });
  });
});
