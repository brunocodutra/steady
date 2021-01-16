import * as Elements from 'lib/element';
import { Element, ground, series } from 'lib/element';
import { traverse } from 'lib/util';

export interface State {
  readonly entry: Element,
  readonly active: number[],
}

export const init = (next?: Element): State => ({
  entry: series(ground(next)),
  active: [traverse(next).length + 2],
});

export const pack = ({ entry, active }: State): unknown => (
  [Elements.pack(entry), active]
);

export const unpack = (packed: unknown): State => {
  if (
    !Array.isArray(packed) || packed.length !== 2 ||
    !Array.isArray(packed[1]) || !packed[1].every(Number.isInteger)
  ) {
    throw new Error(`expected '[entry, active]', got ${packed}`);
  }

  return {
    entry: Elements.unpack(packed[0]),
    active: packed[1],
  };
};

