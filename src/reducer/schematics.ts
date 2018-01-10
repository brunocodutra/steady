import {Reducer} from 'redux';

import {Action, Type} from 'action';
import {Element, Kind, make, series, shunt} from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

const init: State = {
  entry: series(),
  active: [2],
};

const advance = (id: number[], i: number, k: number) => [...id.slice(0, i), id[i] + k, ...id.slice(i + 1)];

const patch = (entry: Element, path: number[], f: (_: Element) => Element): Element => {
  if (path.length === 1 && path[0] === 0) {
    return f(entry);
  } else if (path.length > 1 && path[0] === 0) {
    if (entry.kind !== Kind.shunt) {
      throw new Error(`expected '${Kind.shunt}', got '${entry.kind}'`);
    }

    const next = patch(entry.value, path.slice(1), f);

    if (next.kind !== entry.value.kind) {
      throw new Error(`expected '${entry.value.kind}', got '${next.kind}'`);
    }

    return shunt(entry.next, next);

  } else {
    if (entry.kind === Kind.connector) {
      throw new Error(`unexpected '${Kind.connector}'`);
    }

    return make(entry.kind, patch(entry.next, advance(path, 0, -1), f), entry.value);
  }
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Type.activate:
      return {...state, active: action.id};

    case Type.insert:
      return {
        entry: patch(state.entry, state.active, (entry) => make(action.kind, entry)),
        active: advance(state.active, state.active.length - 1, 1),
      };

    case Type.remove:
      const lead = action.id.slice(0, -1);

      return {
        entry: patch(state.entry, action.id, (entry) => {
          if (entry.kind === Kind.connector) {
            throw new Error(`unexpected '${Kind.connector}'`);
          }

          return entry.next;
        }),
        active: !(
          lead.length < state.active.length
          && lead.every((x, i) => x === state.active[i])
          && action.id[lead.length] < state.active[lead.length]
        ) ? state.active : advance(state.active, lead.length, -1),
      };

    default:
      return state;
  }
};
