import { State } from 'state';

import { elements, toJSON } from './util';

describe('State', () => {
  it('should be serializable', () => {
    elements.forEach((e) => {
      const json = toJSON(State.init(e));
      expect(toJSON(State.fromJSON(json))).toEqual(json);
    });

    expect(() => State.fromJSON(undefined)).toThrow();
    expect(() => State.fromJSON(null)).toThrow();
    expect(() => State.fromJSON({})).toThrow();
    expect(() => State.fromJSON({ entry: {} })).toThrow();
    expect(() => State.fromJSON({ active: [] })).toThrow();

    elements.forEach((e) => {
      expect(() => State.fromJSON({ entry: e, active: [] })).toThrow();
      expect(() => State.fromJSON({ entry: e, active: [Math.PI] })).toThrow();
    });
  });
});
