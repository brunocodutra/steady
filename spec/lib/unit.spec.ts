import {Prefix, Unit} from 'lib/unit';

describe('Prefix', () => {
  it('should map to itself', () => {
    for (const prefix in Prefix) {
      expect(Prefix[prefix]).toBe(prefix);
    }
  });
});

describe('Unit', () => {
  it('should map to itself', () => {
    for (const unit in Unit) {
      expect(Unit[unit]).toBe(unit);
    }
  });
});
