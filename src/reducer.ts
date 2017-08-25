import {Reducer} from 'redux';

import {Action} from 'action';
import {Model, Models} from 'model';

export type State = {
  readonly schematics: Model,
};

const init: State = {
  schematics: {kind: Models.SERIES, components: []},
};

export const reducer: Reducer<State> = (state = init, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
