import { Phasor, polar } from 'phasor.js';
import { hasProperty } from './util';

export * from 'phasor.js';

export const _0 = polar(0);
export const _1 = polar(1);
export const Inf = polar(Infinity);

declare module 'phasor.js' {
  export interface Phasor {
    closeTo(p: Phasor, e?: number): boolean;
  }

  namespace Phasor {
    const fromJSON: (json: unknown) => Phasor;
  }
}

Object.assign(Phasor.prototype, {
  closeTo(this: Phasor, p: Phasor, e: number = Number.EPSILON): boolean {
    return this.ulpsEq(p, e, e / Number.EPSILON) || (
      polar(this.norm()).ulpsEq(_0, e, 0) &&
      polar(p.norm()).ulpsEq(_0, e, 0)
    );
  },
});

Object.assign(Phasor, {
  fromJSON(json: unknown): Phasor {
    if (
      typeof json !== 'object' || json === null ||
      !hasProperty(json, 'mag') || typeof json.mag !== 'number' ||
      !hasProperty(json, 'tan') || typeof json.tan !== 'number'
    ) {
      throw new Error(`expected Phasor, got '${json}'`);
    }

    return new Phasor(json.mag, json.tan);
  }
});
