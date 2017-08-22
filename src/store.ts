import * as Redux from 'redux';

import {reducer} from 'reducer';

const middleware: Redux.Middleware[] = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(require('redux-logger').default);
}

export const store = Redux.createStore(
  reducer,
  Redux.applyMiddleware(...middleware),
);
