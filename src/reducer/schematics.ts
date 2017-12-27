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

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Type.activate:
      return {...state, active: action.id};

    case Type.insert:
      if (state.active.length === 1 && state.active[0] === 0) {
        return ({
          entry: make(action.kind, state.entry),
          active: [1],
        });
      } else if (state.active.length > 1 && state.active[0] === 0) {
        if (state.entry.kind !== Kind.shunt) {
          throw new Error(`expected '${Kind.shunt}', got '${state.entry.kind}'`);
        }

        const nested = reducer(
          {
            entry: state.entry.value,
            active: state.active.slice(1),
          },
          action,
        );

        if (nested.entry.kind !== Kind.series) {
          throw new Error(`expected '${Kind.series}', got '${nested.entry.kind}'`);
        }

        return ({
          entry: shunt(state.entry.next, nested.entry),
          active: [0, ...nested.active],
        });

      } else {
        if (state.entry.kind === Kind.connector) {
          throw new Error(`unexpected '${Kind.connector}'`);
        }

        const nested = reducer(
          {
            entry: state.entry.next,
            active: [state.active[0] - 1, ...state.active.slice(1)],
          },
          action,
        );

        return ({
          entry: make(state.entry.kind, nested.entry, state.entry.value),
          active: [nested.active[0] + 1, ...nested.active.slice(1)],
        });
      }

    default:
      return state;
  }
};
