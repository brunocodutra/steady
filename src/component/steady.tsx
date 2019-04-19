import React from 'react';
import { hot } from 'react-hot-loader';

import Schematics from 'component/schematics';
import Share from 'component/share';
import Toolbar from 'component/toolbox';

export default hot(module)(() => (
  <>
    <Share />
    <Toolbar />
    <Schematics />
  </>
));
