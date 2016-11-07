import {Reducer} from 'redux';

import {Action} from 'action';

export type State = {};

const init: State = {};

export const reducer: Reducer<State> = (state = init, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
