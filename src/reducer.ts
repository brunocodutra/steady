import { Reducer } from 'redux';

import { Action, Type } from 'action';
import { init, State } from 'state';

import schematics from 'reducer/schematics';

const reducer: Reducer<State, Action> = (state = init(), action: Action): State => {
  switch (action.type) {
    case Type.hydrate:
      return action.state;

    default:
      return schematics(state, action);
  }
};

export default reducer;
