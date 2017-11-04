import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';

import Tool from 'components/tool';
import {Models} from 'model';
import {State} from 'reducer';

type Props = {
  readonly visible: boolean,
};

const mapState = ({toolbar: {visible}}: State): Props => ({
  visible,
});

export default connect(mapState)(
  ({visible: show}: Props) => (
    <div className={classes('d-md-block collapse', {show})}>
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
  ),
);
