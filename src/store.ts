import * as Redux from 'redux';

import {Action, hydrate, Type} from 'action';
import reducer from 'reducer';
import {init, pack, State, unpack, unserialize} from 'state';

const middleware: Array<Redux.Middleware<{}, State>> = [
  ({getState}) => (next) => (action: Action) => {
    const result = next(action);

    if ([Type.insert, Type.remove, Type.update].includes(action.type)) {
      history.pushState(pack(getState()), document.title, `${location.origin}${location.pathname}`);
    }

    return result;
  },
];

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-logger').default);
}

const state = unserialize(location.search.slice(1)) || init();
const store = Redux.createStore(reducer, state, Redux.applyMiddleware(...middleware));

history.replaceState(pack(state), document.title, `${location.origin}${location.pathname}`);

window.onpopstate = ({state: packed}) => store.dispatch(hydrate(unpack(packed)));

export default store;
