import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import store from 'store';
import Schematics from 'component/schematics';
import Share from 'component/share';
import Toolbar from 'component/toolbox';

export default hot(module)(() => (
  <Provider store={store}>
    <Share />
    <Toolbar />
    <Schematics />
  </Provider>
));
