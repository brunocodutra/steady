import { branch, connector, connect, Kind, merge, pack, next, unpack, update } from 'lib/element';
import { project } from 'lib/quadripole';

import { elements, phasors } from '../../util';

describe('Connector', () => {
  it('should be default constructible', () => {
    expect(connector().kind).toEqual(Kind.connector);
  });

  it('should not have a successor', () => {
    expect(() => next(connector())).toThrow();
  });

  it('should not allow connecting', () => {
    elements.forEach((e) => {
      expect(() => connect(connector(), e)).toThrow();
    });
  });

  it('should not have a branch', () => {
    expect(() => branch(connector())).toThrow();
  });

  it('should not allow merging in', () => {
    elements.forEach((e) => {
      expect(() => merge(connector(), e)).toThrow();
    });
  });

  it('should terminate a subcircuit', () => {
    expect(connector().subcircuits).toEqual(1);
  });

  it('should not allow updating', () => {
    phasors.forEach((value) => {
      expect(() => update(connector(), value)).toThrow();
    });
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const { model } = connector();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
      });
    });
  });

  it('should be packable', () => {
    expect(JSON.parse(JSON.stringify(unpack(pack(connector())))))
      .toEqual(JSON.parse(JSON.stringify(connector())));
  });
});
