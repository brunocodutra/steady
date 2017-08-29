import * as React from 'react';

import Tool from 'components/tool';
import {Models} from 'model';

export default class extends React.Component< {}, {} > {
  public render() {
    return (
      <div className='toolbar collapse d-md-block'>
        <div className='board d-flex pb-1 mb-2'>
          <div className='d-flex flex-row mx-auto'>
            <Tool kind={Models.vsrc}/>
            <Tool kind={Models.isrc}/>
            <Tool kind={Models.impedance}/>
            <Tool kind={Models.admittance}/>
            <Tool kind={Models.xformer}/>
            <Tool kind={Models.xline}/>
            <Tool kind={Models.shunt}/>
          </div>
        </div>
      </div>
    );
  }
}
