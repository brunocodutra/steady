import { branch, ground, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('Ground', () => {
  it('should be default constructible', () => {
    expect(ground().kind).toEqual(Kind.ground);
  });

  it('should have a successor', () => {
    elements.forEach((e) => {
      expect(next(ground(e))).toEqual(e);
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(ground(), e))).toEqual(e);
    });
  });

  it('should not have a branch', () => {
    elements.forEach((e) => {
      expect(() => branch(ground(e))).toThrow();
    });
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(ground(), e)).toThrow();
    });
  });

  it('should inherit its successor\'s subcircuits', () => {
    elements.forEach((e) => {
      expect(ground(e).subcircuits).toEqual(e.subcircuits);
    });
  });

  it('should not allow updating', () => {
    phasors.forEach((value) => {
      expect(() => update(ground(), value)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const { model } = ground();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((e) => {
      expect(JSON.parse(JSON.stringify(unpack(pack(ground(e))))))
        .toEqual(JSON.parse(JSON.stringify(ground(e))));
    });
  });
});
