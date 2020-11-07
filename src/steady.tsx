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
