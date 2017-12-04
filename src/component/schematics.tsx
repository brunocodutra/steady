import * as React from 'react';
import {connect} from 'react-redux';

import {rect} from 'lib/phasor';
import {solve} from 'lib/quadripole';
import {expand, ExpandedElement} from 'model';
import {State} from 'reducer';

import Component from 'component/component';

type Props = {
  readonly entry: ExpandedElement,
};

const mapState = ({schematics: {entry}}: State): Props => ({
  entry: expand(entry),
});

export default connect(mapState)(
  ({entry}: Props) => (
    <div className='board flex-grow border rounded p-3' tabIndex={-1}>
      <Component id={[]} element={entry} vi={[rect(0), solve(entry.model)[1]]}/>
    </div>
  ),
);
