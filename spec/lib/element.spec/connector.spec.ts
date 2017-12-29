import {Kind, connector, make} from 'lib/element';
import {project} from 'lib/quadripole';

import {phasors} from './util';

describe('Connector', () => {
  it('should be default constructible', () => {
    expect(connector().kind).toBe(Kind.connector);
    expect(make(Kind.connector).kind).toBe(Kind.connector);;
  });

  it('should have no successor', () => {
    expect(connector().next).toBeUndefined();
  });

  it('should have no height', () => {
    expect(connector().height).toBe(0);
  });

  it('should model an ideal conductor', () => {
    phasors.forEach((v) => {
      phasors.forEach((i) => {
        const {unit, model} = connector();
        expect(project(model, [v, i])).toBeCloseTo([v, i]);
        expect(unit).toBeUndefined();
      });
    });
  });
});
