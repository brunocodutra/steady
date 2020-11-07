import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Steady from 'component/steady';

import { unwrap } from 'lib/util';
import store from 'store';

ReactDOM.render(
  (
    <Provider store={store}>
      <Steady />
    </Provider>
  ),
  unwrap(document.getElementById('steady'), '#steady not found'),
);

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./store.ts', () => {
    store.replaceReducer(require('reducer').default);
  });

  module.hot.accept('./reducer.ts', () => {
    store.replaceReducer(require('reducer').default);
  });
}

/* istanbul ignore next */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // tslint:disable:no-console
      console.log('SW registered: ', await navigator.serviceWorker.register('/steady/sw.js'));
    } catch (error) {
      // tslint:disable:no-console
      console.error('SW registration failed: ', error);
    }
  });
}
