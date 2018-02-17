import {branch, connector, join, Kind, merge, pack, split, unpack, update} from 'lib/element';
import {project} from 'lib/quadripole';

import {elements, phasors} from './util';

describe('Connector', () => {
  it('should be default constructible', () => {
    expect(connector().kind).toBe(Kind.connector);
  });

  it('should have no successor', () => {
    expect(connector().next).toBeUndefined();
  });

  it('should not allow splitting off', () => {
    expect(() => split(connector())).toThrow();
  });

  it('should not allow joining in', () => {
    elements.forEach((next) => {
      expect(() => join(connector(), next)).toThrow();
    });
  });

  it('should not allow branching off', () => {
    expect(() => branch(connector())).toThrow();
  });

  it('should not allow merging in', () => {
    elements.forEach((next) => {
      expect(() => merge(connector(), next)).toThrow();
    });
  });

  it('should have no level', () => {
    expect(connector().level).toBe(0);
  });

  it('should have no value', () => {
    expect(connector().value).toBeUndefined();
  });

  it('should not allow updating', () => {
    phasors.forEach((value) => {
      expect(() => update(connector(), value)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const {model} = connector();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should be packable', () => {
    expect(unpack(pack(connector()))).toEqual(connector());
  });
});
