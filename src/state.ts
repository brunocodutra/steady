import { Element, terminal } from 'lib/element';
import { hasProperty, traverse } from 'lib/util';

export interface State {
  readonly entry: Element,
  readonly active: number[],
}

export namespace State {
  export const init = (entry: Element = terminal()): State => ({
    entry,
    active: [traverse(entry).length - 1],
  });

  export const fromJSON = (json: unknown): State => {
    if (
      typeof json !== 'object' || json === null ||
      !hasProperty(json, 'entry') || !hasProperty(json, 'active') ||
      !Array.isArray(json.active) || !json.active.every(Number.isInteger) ||
      json.active.length < 1
    ) {
      throw new Error(`expected State, got '${json}'`);
    }

    return {
      entry: Element.fromJSON(json.entry),
      active: json.active,
    };
  };
}
