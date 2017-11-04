import {Reducer} from 'redux';

import {Action, Actions} from 'action';

export type State = {
  readonly visible: boolean,
};

const init: State = {
  visible: false,
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Actions.toggle:
      return {...state, visible: !state.visible};

    default:
      return state;
  }
};
