import * as React from 'react';

import Schematics from 'components/schematics';
import Toolbar from 'components/toolbar';

export default () => (
  <div className='steady d-flex flex-column flex-grow'>
    <Toolbar/>
    <Schematics/>
  </div>
);
