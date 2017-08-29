import * as React from 'react';

import Schematics from 'components/schematics';
import Toolbar from 'components/toolbar';

export default class extends React.PureComponent< {}, {} > {
  public render() {
    return (
      <div className='steady d-flex flex-column flex-grow'>
        <Toolbar/>
        <Schematics/>
      </div>
    );
  }
}
