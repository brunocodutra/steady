import {unwrap} from 'lib/util';

describe('unwrap', () => {
  it('should throw an exception for undefined values', () => {
    expect(() => unwrap()).toThrow();
    expect(() => unwrap(null)).toThrow();
    expect(() => unwrap(undefined)).toThrow();
    expect(() => unwrap(null, 'error')).toThrowError('error');
    expect(() => unwrap(undefined, 'error')).toThrowError('error');
  });

  it('should return the argument itself if it\'s defined', () => {
    expect(unwrap('')).toBe('');
    expect(unwrap(42)).toBe(42);
    expect(unwrap(false)).toBe(false);
  });
});
