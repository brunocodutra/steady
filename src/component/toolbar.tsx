import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';

import Tool from 'component/tool';
import {Kind} from 'lib/element';
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
          <Tool kind={Kind.vsrc}/>
          <Tool kind={Kind.isrc}/>
          <Tool kind={Kind.impedance}/>
          <Tool kind={Kind.admittance}/>
          <Tool kind={Kind.xformer}/>
          <Tool kind={Kind.xline}/>
          <Tool kind={Kind.shunt}/>
        </div>
      </div>
    </div>
  ),
);
