import * as React from 'react';

import Tool from 'components/tool';
import {Models} from 'model';

export default class extends React.Component< {}, {} > {
  public render() {
    return (
      <div className='toolbar collapse d-md-block'>
        <div className='board d-flex flex-row pb-1 mb-1'>
          <Tool kind={Models.vsrc}/>
          <Tool kind={Models.isrc}/>
          <Tool kind={Models.impedance}/>
          <Tool kind={Models.admittance}/>
        </div>
      </div>
    );
  }
}
