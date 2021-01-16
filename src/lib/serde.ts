
export const serialize = (o: unknown): string => btoa(JSON.stringify(o, (_, v) => {
  if (typeof v === 'number' || v instanceof Number) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, +v);
    return String.fromCharCode(...new Uint8Array(buffer));
  } else if (typeof v === 'string' || v instanceof String) {
    return `'${v}`;
  } else {
    return v;
  }
}));

export type Json = { [_: string]: Json } | [Json] | string | number | null;

export const deserialize = (encoded: string): Json => JSON.parse(atob(encoded), (_, v: Json) => {
  switch (typeof v) {
    case 'string':
      if (v.startsWith('\'')) {
        return v.substr(1);
      } else if (v.length === 8) {
        return new DataView(Uint8Array.from([...v].map(c => c.charCodeAt(0))).buffer).getFloat64(0);
      } else {
        throw new SyntaxError(`malformatted number: expected 8 bytes, got ${v.length}`)
      }

    case 'number':
      throw new SyntaxError('unexpected number literal');

    default:
      return v;
  }
});