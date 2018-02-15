import {Element, series} from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

export const init: State = {
  entry: series(),
  active: [2],
};
