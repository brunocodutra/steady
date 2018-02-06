import {Reducer} from 'redux';

import {Action, Type} from 'action';

export type State = {
  readonly visible: boolean,
};

const init: State = {
  visible: true,
};

export const reducer: Reducer<State> = (state = init, action: Action): State => {
  switch (action.type) {
    case Type.toggle:
      return {...state, visible: !state.visible};

    default:
      return state;
  }
};
