import { terminal, Element, Kind, update } from 'lib/element';
import { _0 } from 'lib/phasor';
import { project } from 'lib/quadripole';

import { phasors, toJSON } from '../../util';

describe('Terminal', () => {
  it('should be default constructible', () => {
    expect(terminal().kind).toEqual(Kind.terminal);
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

  it('should be serializable', () => {
    const json = toJSON(terminal());
    expect(toJSON(Element.fromJSON(json))).toEqual(json);
  });
});
