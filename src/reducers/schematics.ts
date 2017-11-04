import {Reducer} from 'redux';

import {Action, Actions} from 'action';
import {Model, ModelFactory, Models} from 'model';
import {div, neg} from 'phasor';
import {cat, quadripole} from 'quadripole';

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
          const params = components.map((m) => m.params).reduce(cat, quadripole());

          return ({
            entry: {...state.entry, components, params},
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
          const params = components.map((m) => m.params).reduce(cat, quadripole());

          return ({
            entry: {...state.entry, components, params},
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

        const branch = nested.entry;

        const i = div(branch.params.vi[1], branch.params.abcd[1][1]);
        const y = neg(div(branch.params.abcd[1][0], branch.params.abcd[1][1]));

        const params = cat(
          ModelFactory[Models.isrc](i).params,
          ModelFactory[Models.admittance](y).params,
        );

        return ({
          entry: {...state.entry, branch, params},
          active: nested.active,
        });

      } else {
        throw new Error(`unexpected ${Models[state.entry.kind]}`);
      }

    default:
      return state;
  }
};
