import {Reducer} from 'redux';

import {Action, Actions} from 'action';
import {Element, ElementFactory, Elements} from 'lib/element';

export type State = {
  readonly entry: Element,
  readonly active: number[],
};

const init: State = {
  entry: ElementFactory[Elements.series](),
  active: [1],
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Actions.activate:
      return {...state, active: action.id};

    case Actions.insert:
      if (state.entry.kind === Elements.series) {

        const before = state.entry.elements.slice(0, state.active[0]);

        if (state.active.length === 1) {
          const after = state.entry.elements.slice(state.active[0]);
          const elements = [...before, action.element, ...after];

          return ({
            entry: {...state.entry, elements},
            active: [state.active[0] + 1],
          });
        } else {
          const nested = reducer(
            {
              entry: state.entry.elements[state.active[0]],
              active: state.active.slice(1),
            },
            action,
          );

          const after = state.entry.elements.slice(state.active[0] + 1);
          const elements = [...before, nested.entry, ...after];

          return ({
            entry: {...state.entry, elements},
            active: [state.active[0], ...nested.active],
          });
        }
      } else if (state.entry.kind === Elements.shunt) {
        const nested = reducer(
          {
            entry: state.entry.branch,
            active: state.active,
          },
          action,
        );

        return ({
          entry: {...state.entry, branch: nested.entry},
          active: nested.active,
        });

      } else {
        throw new Error(`unexpected ${Elements[state.entry.kind]}`);
      }

    default:
      return state;
  }
};
