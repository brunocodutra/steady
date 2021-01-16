import { serialize, deserialize } from 'lib/serde';

const Base64 = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=]+$/;

describe('serialize', () => {
  it('should return base64 encoding', () => {
    expect(serialize(Math.random())).toEqual(expect.stringMatching(Base64));
  });
});

describe('deserialize', () => {
  it('should fail if string is not encoded in base64', () => {
    expect(() => deserialize('')).toThrow();
    expect(() => deserialize('?')).toThrow();
    expect(() => deserialize('#')).toThrow();
    expect(() => deserialize('&')).toThrow();
  });

  it('should fail if serialization contains number literals', () => {
    expect(() => deserialize(btoa(JSON.stringify(Math.random())))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa(JSON.stringify([Math.random()])))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa(JSON.stringify({ _: Math.random() })))).toThrowError(SyntaxError);
  });

  it('should fail if serialization contains malformatted numbers', () => {
    expect(() => deserialize(btoa('""'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"0"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"00"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"0000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"00000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"000000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"0000000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"00000000"'))).not.toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"000000000"'))).toThrowError(SyntaxError);
    expect(() => deserialize(btoa('"0000000000"'))).toThrowError(SyntaxError);
  });
});

describe('serde', () => {
  it('should preserve null', () => {
    expect(deserialize(serialize(null))).toEqual(null);
  });

  it('should preserve numbers', () => {
    expect(deserialize(serialize(+Math.PI))).toEqual(+Math.PI);
    expect(deserialize(serialize(-Math.PI))).toEqual(-Math.PI);
    expect(deserialize(serialize(+Number.EPSILON))).toEqual(+Number.EPSILON);
    expect(deserialize(serialize(-Number.EPSILON))).toEqual(-Number.EPSILON);
    expect(deserialize(serialize(+Number.MIN_VALUE))).toEqual(+Number.MIN_VALUE);
    expect(deserialize(serialize(-Number.MIN_VALUE))).toEqual(-Number.MIN_VALUE);
    expect(deserialize(serialize(+Number.MAX_VALUE))).toEqual(+Number.MAX_VALUE);
    expect(deserialize(serialize(-Number.MAX_VALUE))).toEqual(-Number.MAX_VALUE);
    expect(deserialize(serialize(+Number.MAX_SAFE_INTEGER))).toEqual(+Number.MAX_SAFE_INTEGER);
    expect(deserialize(serialize(-Number.MAX_SAFE_INTEGER))).toEqual(-Number.MAX_SAFE_INTEGER);

    const number = Math.random();
    expect(deserialize(serialize(number))).toEqual(number);
    expect(deserialize(serialize(-number))).toEqual(-number);
    expect(deserialize(serialize(new Number(number)))).toEqual(number);
    expect(deserialize(serialize(-new Number(number)))).toEqual(-number);
  });

  it('should preserve signed zero', () => {
    expect(deserialize(serialize(+0))).toEqual(+0);
    expect(deserialize(serialize(-0))).toEqual(-0);
  });

  it('should preserve signed infinity', () => {
    expect(deserialize(serialize(+Infinity))).toEqual(+Infinity);
    expect(deserialize(serialize(-Infinity))).toEqual(-Infinity);
  });

  it('should preserve signed nan', () => {
    expect(deserialize(serialize(+NaN))).toEqual(+NaN);
    expect(deserialize(serialize(-NaN))).toEqual(-NaN);
  });

  it('should preserve byte strings', () => {
    expect(deserialize(serialize(""))).toEqual("");
    expect(deserialize(serialize("'"))).toEqual("'");
    expect(deserialize(serialize("''"))).toEqual("''");
    expect(deserialize(serialize(" '"))).toEqual(" '");

    const string = String.fromCharCode(...new Uint8Array(Float64Array.of(Math.random()).buffer));
    expect(deserialize(serialize(string))).toEqual(string);
    expect(deserialize(serialize(new String(string)))).toEqual(string);
  });

  it('should preserve arrays', () => {
    expect(deserialize(serialize([]))).toEqual([]);
    expect(deserialize(serialize([[]]))).toEqual([[]]);
    expect(deserialize(serialize([[[]]]))).toEqual([[[]]]);
  });

  it('should preserve objects', () => {
    expect(deserialize(serialize({}))).toEqual({});
    expect(deserialize(serialize({ _: {} }))).toEqual({ _: {} });
    expect(deserialize(serialize({ _: { _: {} } }))).toEqual({ _: { _: {} } });
    expect(deserialize(serialize({ _: { _: { _: {} } } }))).toEqual({ _: { _: { _: {} } } });
  });
});
