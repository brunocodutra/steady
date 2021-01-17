import { Element } from 'lib/element';

import { elements, toJSON } from '../util';

describe('Element', () => {
  it('should have a kind', () => {
    elements.forEach((e) => {
      expect(e).toHaveProperty('kind');
    });
  });

  it('should be constructible by kind', () => {
    elements.forEach((e) => {
      expect(toJSON(Element.fromKind(e.kind))).toEqual(toJSON(e));
    });
  });

  it('should be serializable', () => {
    elements.forEach((e) => {
      const json = toJSON(e);
      expect(toJSON(Element.fromJSON(json))).toEqual(json)
    });

    expect(() => Element.fromJSON(undefined)).toThrow();
    expect(() => Element.fromJSON(null)).toThrow();
    expect(() => Element.fromJSON({})).toThrow();
    expect(() => Element.fromJSON({ kind: '' })).toThrow();
  });
});
