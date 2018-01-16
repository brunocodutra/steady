import {Reducer} from 'redux';

import {Action, Type} from 'action';

import {prefix} from 'lib/array';
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
  const {entry, active} = state;

  switch (action.type) {
    case Type.activate:
      return {entry, active: action.id};

    case Type.insert:
      return {
        entry: patch(entry, active, (e) => make(action.kind, e)),
        active: advance(active, active.length - 1, 1),
      };

    case Type.remove:
      const lead = action.id.slice(0, -1);

      return {
        entry: patch(entry, action.id, (e) => {
          if (e.kind === Kind.connector) {
            throw new Error(`unexpected '${Kind.connector}'`);
          }

          return e.next;
        }),

        active: (prefix(lead, active) && action.id[lead.length] < active[lead.length])
          ? advance(active, lead.length, -1)
          : active
        ,
      };

    case Type.update:
      return {
        entry: patch(entry, action.id, (e) => make(e.kind, e.next, action.value)),
        active,
      };

    default:
      return state;
  }
};
