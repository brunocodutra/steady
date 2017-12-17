import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import Steady from 'component/steady';
import Toggler from 'component/toggler';
import reducer from 'reducer';
import store from 'store';

import 'style.scss';

const render = (component: JSX.Element, placeholder: HTMLElement) => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      {component}
    </Provider>
  </AppContainer>,
  placeholder,
);

const toggler = document.getElementById('toggler');
const steady = document.getElementById('steady');

if (!toggler || !steady) {
  throw new Error('placeholder not found');
}

render(<Toggler/>, toggler);
render(<Steady/>, steady);

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
    render(<Toggler/>, toggler);
    render(<Steady/>, steady);
  });
}
