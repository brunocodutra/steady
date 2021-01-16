import { branch, terminal, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('Terminal', () => {
  it('should be default constructible', () => {
    expect(terminal().kind).toEqual(Kind.terminal);
  });

  it('should not have a successor', () => {
    expect(() => next(terminal())).toThrow();
  });

  it('should not allow connecting', () => {
    elements.forEach((e) => {
      expect(() => connect(terminal(), e)).toThrow();
    });
  });

  it('should not have a branch', () => {
    expect(() => branch(terminal())).toThrow();
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(terminal(), e)).toThrow();
    });
  });

  it('should terminate a subcircuit', () => {
    expect(terminal().subcircuits).toEqual(1);
  });

  it('should not allow updating', () => {
    phasors.forEach((p) => {
      expect(() => update(terminal(), p)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        expect(project(terminal().model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should have an equivalent model for the series subcircuit', () => {
    expect(terminal().equivalent).toBeCloseTo(terminal().model);
  });

  it('should be powerable', () => {
    expect(terminal().power()).toMatchObject(terminal());
    expect(terminal().power().vi).toBeCloseTo([_0, _0]);
  });

  it('should be packable', () => {
    expect(JSON.parse(JSON.stringify(unpack(pack(terminal())))))
      .toEqual(JSON.parse(JSON.stringify(terminal())));
  });
});
