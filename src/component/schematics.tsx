import * as React from 'react';
import {connect} from 'react-redux';

import {Element} from 'lib/element';
import {_0} from 'lib/phasor';
import {solve} from 'lib/quadripole';
import {State} from 'reducer';

import Component from 'component/component';

type Props = {
  readonly entry: Element,
};

const mapState = ({schematics: {entry}}: State): Props => ({
  entry,
});

export default connect(mapState)(
  ({entry}: Props) => (
    <div className='board flex-grow border rounded p-3' tabIndex={-1}>
      <Component id={[0]} element={entry} vi={[_0, solve(entry.model)[1]]}/>
    </div>
  ),
);
