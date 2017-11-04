import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';

import Schematics from 'components/schematics';
import Toolbar from 'components/toolbar';
import {reducer} from 'reducer';
import {store} from 'store';

const render = (component: JSX.Element, placeholder: HTMLElement) => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      {component}
    </Provider>
  </AppContainer>,
  placeholder,
);

const toolbar = document.getElementById('toolbar');
const schematics = document.getElementById('schematics');

if (!toolbar || !schematics) {
  throw new Error('placeholder not found');
}

render(<Toolbar/>, toolbar);
render(<Schematics/>, schematics);

declare const module: any;

if (module.hot) {
  module.hot.accept(() => {
    store.replaceReducer(reducer);
    render(<Toolbar/>, toolbar);
    render(<Schematics/>, schematics);
  });
}
