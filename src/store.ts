import { createStore, Store, applyMiddleware, Middleware } from 'redux';
import { Action, hydrate, Type } from 'action';
import reducer from 'reducer';
import { deserialize, serialize } from 'lib/serde';
import { rescue } from 'lib/util';
import { State } from 'state';

const middleware: Middleware<unknown, State>[] = [
  ({ getState }) => (next) => (action: Action) => {
    const result = next(action);

    if ([Type.insert, Type.remove, Type.update].includes(action.type)) {
      history.pushState(serialize(getState()), document.title, `${location.origin}${location.pathname}`);
    }

    return result;
  },
];

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  import('redux-logger').then(m => middleware.push(m.default));
}

const state = rescue(() => State.fromJSON(deserialize(location.search.slice(1))), State.init);
const store: Store<State, Action> = createStore(reducer, state, applyMiddleware(...middleware));

const undo = (e: KeyboardEvent) => {
  if (history.state !== null && (e.key === 'z' || e.key === 'Z') && e.ctrlKey && !e.shiftKey) {
    history.back();
  }
};

const redo = (e: KeyboardEvent) => {
  if (e.ctrlKey && (
    ((e.key === 'z' || e.key === 'Z') && e.shiftKey) ||
    ((e.key === 'y' || e.key === 'Y') && !e.shiftKey)
  )) {
    history.forward();
  }
};

document.addEventListener('keypress', undo);
document.addEventListener('keypress', redo);

// bottom
history.replaceState(null, document.title, `${location.origin}${location.pathname}`);

window.onpopstate = ({ state: serialized }: PopStateEvent) =>
  store.dispatch(hydrate(serialized !== null ? State.fromJSON(deserialize(serialized)) : state));

export default store;
