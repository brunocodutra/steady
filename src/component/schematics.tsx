import * as React from 'react';
import {connect} from 'react-redux';

import {Element as ElementT} from 'lib/element';
import {_0} from 'lib/phasor';
import {solve} from 'lib/quadripole';
import {State} from 'reducer';

import Element from 'component/element';

type Props = {
  readonly entry: ElementT,
};

const mapState = ({schematics: {entry}}: State): Props => ({
  entry,
});

export default connect(mapState)(
  ({entry}: Props) => (
    <div className='board flex-grow border rounded p-3' tabIndex={-1}>
      <Element id={[]} element={entry} vi={[_0, solve(entry.model)[1]]}/>
    </div>
  ),
);
