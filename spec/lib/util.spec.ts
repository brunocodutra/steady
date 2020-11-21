import { hasProperty, unwrap } from 'lib/util';

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
