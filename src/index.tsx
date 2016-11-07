import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Steady from 'components/steady';
import {store} from 'store';

ReactDOM.render(
  <Provider store={store}>
    <Steady/>
  </Provider>,
  document.getElementById('content'),
);
