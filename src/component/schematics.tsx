import React from 'react';
import { connect } from 'react-redux';
import * as Elements from 'lib/element';
import { _0 } from 'lib/phasor';
import { solve } from 'lib/quadripole';
import { State } from 'state';
import Element from 'component/element';

interface Props {
  readonly entry: Elements.Element,
}

const mapState = ({ entry }: State): Props => ({
  entry,
});

export default connect(mapState)(
  ({ entry }: Props) => (
    <div className='schematics' tabIndex={-1}>
      <Element id={[]} element={entry} vi={[_0, solve(entry.model)[1]]} />
    </div>
  ),
);
