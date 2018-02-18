import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import Steady from 'component/steady';

import {unwrap} from 'lib/util';
import store from 'store';

const render = (component: JSX.Element, placeholder: HTMLElement) => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      {component}
    </Provider>
  </AppContainer>,
  placeholder,
);

const steady = unwrap(document.getElementById('steady'), '#steady not found');

render(<Steady/>, steady);

/* istanbul ignore next */
if (module.hot) {
  module.hot.accept('./reducer.ts', () => {
    store.replaceReducer(require('reducer').default);
  });

  module.hot.accept('./component/steady.tsx', () => {
    render(React.createElement(require('component/steady').default), steady);
  });
}
