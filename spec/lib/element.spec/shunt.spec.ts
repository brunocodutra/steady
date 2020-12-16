import { branch, connect, Kind, merge, pack, series, shunt, next, unpack, update } from 'lib/element';
import { rect } from 'lib/phasor';
import { project, solve } from 'lib/quadripole';

import { elements, parametric, phasors } from '../../util';

describe('Shunt', () => {
  it('should be default constructible', () => {
    expect(shunt().kind).toEqual(Kind.shunt);
  });

  it('should have a successor', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(next(shunt(x, y))).toEqual(x);
      });
    });
  });

  it('should allow connecting', () => {
    elements.forEach((e) => {
      expect(next(connect(shunt(), e))).toEqual(e);
    });
  });

  it('should have a branch', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(branch(shunt(x, y))).toEqual(y);
      });
    });
  });

  it('should allow merging in', () => {
    elements.forEach((y) => {
      if (y.kind === Kind.series) {
        expect(merge(shunt(), y).branch).toEqual(y);
      } else {
        expect(() => merge(shunt(), y)).toThrow();
      }
    });
  });

  it('should cascade its successors\' subcircuits', () => {
    elements.forEach((x) => {
      elements.map(series).forEach((y) => {
        expect(shunt(x, y).subcircuits).toEqual(x.subcircuits + y.subcircuits);
      });
    });
  });

  it('should model a shunt sub-circuit', () => {
    phasors.forEach((v) => {
      parametric.map((e) => update(e, v)).forEach((x) => {
        phasors.forEach((i) => {
          parametric.map((e) => update(e, i)).forEach((y) => {
            const { model, branch } = shunt(undefined, series(connect(x, y)));
            expect(project(model, [v, i])).toBeCloseTo([v, i.sub(solve(branch.model, [v, rect(0)])[1])]);
          });
        });
      });
    });
  });

  it('should be packable', () => {
    elements.forEach((x) => {
      elements.forEach((y) => {
        expect(JSON.parse(JSON.stringify(unpack(pack(shunt(x, series(y)))))))
          .toEqual(JSON.parse(JSON.stringify(shunt(x, series(y)))));
      });
    });
  });
});
