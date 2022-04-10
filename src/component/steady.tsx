import React from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import Schematics from 'component/schematics';
import Share from 'component/share';
import Toolbar from 'component/toolbox';

export default () => (
  <Provider store={store}>
    <Share />
    <Toolbar />
    <Schematics />
  </Provider>
);
