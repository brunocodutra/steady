import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';

import Tool from 'component/tool';
import {Elements} from 'model';
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
          <Tool kind={Elements.vsrc}/>
          <Tool kind={Elements.isrc}/>
          <Tool kind={Elements.impedance}/>
          <Tool kind={Elements.admittance}/>
          <Tool kind={Elements.xformer}/>
          <Tool kind={Elements.xline}/>
          <Tool kind={Elements.shunt}/>
        </div>
      </div>
    </div>
  ),
);
