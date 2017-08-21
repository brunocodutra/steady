import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import Steady from 'components/steady';
import {reducer} from 'reducer';
import {store} from 'store';

const render = (Component: typeof Steady) => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <Component/>
    </Provider>
  </AppContainer>,
  document.getElementById('content'),
);

render(Steady);

declare const module: any;

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
    render(Steady);
  });
}
