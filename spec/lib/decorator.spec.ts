import { json, memoized } from 'lib/decorator';

describe('memoized', () => {
  it('should fail for methods', () => {
    expect(() => {
      class Class {
        @memoized
        method() {
          return;
        }
      }

      new Class();
    }).toThrow(/method/);
  });

  it('should fail for mutable properties', () => {
    expect(() => {
      class Class {
        value = 0;

        @memoized
        get prop() {
          return this.value;
        }

        set prop(value: number) {
          this.value = value;
        }
      }

      new Class();
    }).toThrow(/prop/);
  });

  it('should memoize immutable properties', () => {
    const mock = jest.fn(Math.random);

    class Class {
      @memoized
      get prop() {
        return mock();
      }
    }

    const object = new Class();

    const value = object.prop;

    for (let length = 0; length < 10; ++length) {
      expect(object.prop).toEqual(value);
    }

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it('should associate the memoized value with the leaf of the prototype chain', () => {
    class Class {
      constructor(readonly value: string) { }

      @memoized
      get prop() {
        return this.value;
      }
    }

    const proto = new Class('proto');
    expect(proto.prop).toEqual('proto');

    const object = Object.assign(Object.create(proto), { value: 'object' });
    expect(object.prop).toEqual('object');

    expect(proto.prop).toEqual('proto');
    expect(object.prop).toEqual('object');
  });
});

describe('json', () => {
  it('should define toJSON method', () => {
    @json
    class Class { }

    expect(Object.getOwnPropertyDescriptor(Class.prototype, 'toJSON')).toMatchObject({
      configurable: true,
      enumerable: false,
      writable: true,
    });
  });

  it('should flatten the prototype chain into a json object', () => {
    @json
    class Base {
      a = 'a';
    }

    class Derived extends Base {
      b = 'b';
    }

    const proto = new Derived();
    const object = Object.create(proto, {
      c: {
        value: 'c',
        enumerable: true,
      }
    });

    expect(JSON.parse(JSON.stringify(object))).toEqual({
      a: 'a',
      b: 'b',
      c: 'c',
    });
  });
});
