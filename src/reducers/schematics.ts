import {Reducer} from 'redux';

import {Action, Actions} from 'action';
import {Model, ModelFactory, Models} from 'model';

export type State = {
  readonly entry: Model,
  readonly active: number[],
};

const init: State = {
  entry: ModelFactory[Models.series](),
  active: [1],
};

const indentation = (models: Model[]): number => {
  for (const model of models) {
    /*  */ if (model.kind === Models.shunt) {
      return model.indentation + indentation([model.branch]) + 1;
    } else if (model.kind === Models.series) {
      return indentation(model.components);
    }
  }

  return 0;
};

const indent = (model: Model, offset = 1): Model => {
  switch (model.kind) {
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
      if (state.entry.kind === Models.series) {

        const before = state.entry.components.slice(0, state.active[0])
          .map(action.model.kind === Models.shunt ? (_: Model) => indent(_) : (_: Model) => _);

        if (state.active.length === 1) {
          const after = state.entry.components.slice(state.active[0]);
          const components = [...before, indent(action.model, indentation(after)), ...after];

          return ({
            entry: {...state.entry, components},
            active: [state.active[0] + 1],
          });
        } else {
          const nested = reducer(
            {
              entry: state.entry.components[state.active[0]],
              active: state.active.slice(1),
            },
            action,
          );

          const after = state.entry.components.slice(state.active[0] + 1);
          const components = [...before, nested.entry, ...after];

          return ({
            entry: {...state.entry, components},
            active: [state.active[0], ...nested.active],
          });
        }
      } else if (state.entry.kind === Models.shunt) {
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
        throw new Error(`unexpected ${Models[state.entry.kind]}`);
      }

    default:
      return state;
  }
};
