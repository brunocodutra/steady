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

export const reducer: Reducer<State> = (state = init, action: Action) => {
  switch (action.type) {
    case Actions.ACTIVATE:
      return {...state, active: action.id};

    default:
      return state;
  }
};
