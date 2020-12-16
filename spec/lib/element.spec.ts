import { make } from 'lib/element';

import { elements } from '../util';

describe('Element', () => {
  it('should have a kind', () => {
    elements.forEach((e) => {
      expect(e).toHaveProperty('kind');
    });
  });

  it('should be constructible by kind', () => {
    elements.forEach((e) => {
      expect(JSON.parse(JSON.stringify(make(e.kind))))
        .toEqual(JSON.parse(JSON.stringify(e)));
    });
  });
});
