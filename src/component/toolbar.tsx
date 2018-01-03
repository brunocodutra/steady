import * as classes from 'classnames';
import * as React from 'react';
import {connect} from 'react-redux';

import Tool from 'component/tool';
import {Kind} from 'lib/element';
import {State} from 'reducer';

import {Icon as Admittance} from 'component/element/admittance';
import {Icon as Impedance} from 'component/element/impedance';
import {Icon as ISrc} from 'component/element/isrc';
import {Icon as Line} from 'component/element/line';
import {Icon as Shunt} from 'component/element/shunt';
import {Icon as VSrc} from 'component/element/vsrc';
import {Icon as XFormer} from 'component/element/xformer';

type Props = {
  readonly visible: boolean,
};

const mapState = ({toolbar: {visible}}: State): Props => ({
  visible,
});

export default connect(mapState)(
  ({visible: show}: Props) => (
    <div className={classes('d-md-block collapse', {show})}>
      <div className='toolbar pb-1 mb-2'>
        <div className='d-flex flex-row mx-auto'>
          <Tool kind={Kind.vsrc}><VSrc/></Tool>
          <Tool kind={Kind.isrc}><ISrc/></Tool>
          <Tool kind={Kind.impedance}><Impedance/></Tool>
          <Tool kind={Kind.admittance}><Admittance/></Tool>
          <Tool kind={Kind.xformer}><XFormer/></Tool>
          <Tool kind={Kind.line}><Line/></Tool>
          <Tool kind={Kind.shunt}><Shunt/></Tool>
        </div>
      </div>
    </div>
  ),
);
