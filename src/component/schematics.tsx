import React from 'react';
import { connect } from 'react-redux';
import { Powered } from 'lib/element';
import { State } from 'state';
import Element from 'component/element';

interface Props {
  readonly entry: Powered,
}

const mapState = ({ entry }: State): Props => ({
  entry: entry.power(),
});

export default connect(mapState)(
  ({ entry }: Props) => (
    <div className='schematics' tabIndex={-1}>
      <Element id={[]} element={entry} />
    </div>
  ),
);
