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

const indentation = (models: Model[]): number => {
  for (const model of models) {
    if (model.kind === Models.shunt) {
      return model.indentation + indentation(model.components) + 1;
    }
  }

  return 0;
};

const indent = (model: Model, offset = 1): Model => {
  switch (model.kind) {
    case Models.series:
    case Models.shunt:
      return { ...model, indentation: model.indentation + offset };

    default:
      return model;
  }
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Actions.activate:
      return {...state, active: action.id};

    case Actions.insert:
      if ((state.schematics.kind !== Models.series) && (state.schematics.kind !== Models.shunt)) {
        throw new Error(`unexpected ${Models[state.schematics.kind]}`);
      }

      const {components} = state.schematics;
      const before = components.slice(0, state.active[0])
        .map(action.model.kind === Models.shunt ? (_: Model) => indent(_) : (_: Model) => _);

      if (state.active.length === 1) {
        const after = components.slice(state.active[0]);

        return ({
          schematics: {
            ...state.schematics,
            components: [...before, indent(action.model, indentation(after)), ...after],
          },
          active: [state.active[0] + 1],
        });
      } else {
        const nested = reducer(
          {
            schematics: components[state.active[0]],
            active: state.active.slice(1),
          },
          action,
        );

        const after = components.slice(state.active[0] + 1);

        return ({
          schematics: {
            ...state.schematics,
            components: [...before, nested.schematics, ...after],
          },
          active: [state.active[0], ...nested.active],
        });
      }

    default:
      return state;
  }
};
