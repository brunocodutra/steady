import {Reducer} from 'redux';

import {Action, Actions} from 'action';
import {Model, ModelFactory, Models} from 'model';

export type State = {
  readonly schematics: Model,
  readonly active: number[],
};

const init: State = {
  schematics: ModelFactory[Models.series](ModelFactory[Models.ground]()),
  active: [1],
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Actions.ACTIVATE:
      return {...state, active: action.id};

    case Actions.INSERT:
      if ((state.schematics.kind !== Models.series) && (state.schematics.kind !== Models.shunt)) {
        throw new Error(`unexpected ${Models[state.schematics.kind]}`);
      }

      if (state.active.length === 1) {
        return ({
          schematics: {
            kind: state.schematics.kind,
            components: [
              ...state.schematics.components.slice(0, state.active[0]),
              action.model,
              ...state.schematics.components.slice(state.active[0]),
            ],
          },
          active: [state.active[0] + 1],
        });
      } else {
        const nested = reducer(
          {
            schematics: state.schematics.components[state.active[0]],
            active: state.active.slice(1),
          },
          action,
        );

        return ({
          schematics: {
            kind: state.schematics.kind,
            components: [
              ...state.schematics.components.slice(0, state.active[0]),
              nested.schematics,
              ...state.schematics.components.slice(state.active[0] + 1),
            ],
          },
          active: [state.active[0], ...nested.active],
        });
      }

    default:
      return state;
  }
};
